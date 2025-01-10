import { Router } from 'express';
var router = Router();
import { v4 as uuidv4 } from 'uuid';
import { db } from '../app.js'
import { InterviewDocument } from '../mongo_client.js';
import { INTERVIEW_V6 } from '../prompts/interview_v6.js';
import { openai } from '../app.js';
import { processCompletedInterview } from '../mongo_client.js';


const init_prompt = INTERVIEW_V6;



async function handleNewChat(chatId, name, email) {
  const interview = new InterviewDocument(chatId);
  interview.document.first_name = name;
  interview.document.email = email;
  await db.collection('live').insertOne(interview.document);
  return interview;
}


router.post('/', async (req, res) => {
  const chatId = uuidv4();
  await handleNewChat(chatId, req.body.name, req.body.email)
  res.json({ chatId });
});

router.post('/:chatId', async (req, res) => {
  const chatId = req.params.chatId;
  const message = req.body.message;

  try {
    const call = await db.collection('live').findOne({ _id: chatId });

    if (!call || !call.transcript) {
      return res.status(404).json({ error: 'Chat session not found' });
    }

    const { transcript, interviewMetadata } = call;
    let { tokens, cacheTokens } = interviewMetadata;

    // Prepare messages for the OpenAI API
    const currentMessages = [
      { role: "system", content: init_prompt },
      ...transcript,
      { role: "user", content: message }
    ];

    if (transcript.length === 0) {
      // For the first message, omit the user input from the transcript
      currentMessages.pop();
    }

    // Generate a response from OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: false,
      messages: currentMessages
    });

    const botResponse = completion.choices[0].message.content;
    tokens += completion.usage.total_tokens;

    // Update cacheTokens if new cached tokens exceed previous
    cacheTokens = Math.max(cacheTokens, completion.usage.prompt_tokens_details.cached_tokens);

    // Update the database with the conversation and metadata
    const updateData = {
      $set: {
        "timestamp.lastUpdated": new Date(),
        "interviewMetadata.tokens": tokens,
        "interviewMetadata.cacheTokens": cacheTokens,
      }
    };

    if (transcript.length === 0) {
      // First message: only store assistant's response
      updateData.$push = { transcript: { role: "assistant", content: botResponse } };
    } else {
      // Subsequent messages: store both user and assistant messages
      updateData.$push = {
        transcript: {
          $each: [
            { role: "user", content: message },
            { role: "assistant", content: botResponse }
          ]
        }
      };
    }

    await db.collection('live').updateOne({ _id: chatId }, updateData);

    res.json({ chatId, message: botResponse });

  } catch (error) {
    console.error('Error:', error.message || error);
    res.status(500).json({ error: 'Failed to process the request. Please try again later.' });
  }
});




router.post('/finish/:chatId', async (req, res) => {
  const chatId = req.params.chatId;
  processCompletedInterview(chatId)

  res.json({'allgood': 'peeks'})
});



export default router;