// Interview Template Class 
export class InterviewDocument {
  constructor(chatId) {
    this.document = {
      _id: chatId,
      status: "live",  // Can be: live, completed, analyzed, archived
      first_name: null,
      email: null,
      timestamp: {
        started: new Date(),
        lastUpdated: new Date(),
        completed: null
      },
      
      // Demographics will be populated during interview
      demographics: {
        university: null,
        graduationYear: null,
        major: null,
        gender: null,
        internshipExperience: null,
        targetIndustries: []
      },
      
      // Interview metadata gets updated as the interview progresses
      interviewMetadata: {
        duration: 0,
        questionCount: 0,
        tokens: 0,
        cacheTokens: 0
      },
      
      // The actual conversation - grows as interview progresses
      transcript: [],
      
      // Fields for post-interview analysis
      analysis: {
        overallSentiment: null,
        primaryConcerns: [],
        careerReadiness: null,
        keyInsights: [],
        dominantEmotions: [],
        topicDistribution: []
      },
      
      // System fields
      systemMetadata: {
        version: "1.0",
        processingStage: "live",
        processingAttempts: 0,
        errors: []
      }
    };
  }

  // Helper method to update transcript
  // addMessage(role, content) {
  //   const message = {
  //     role,
  //     content,
  //     timestamp: new Date(),
  //     messageIndex: this.document.transcript.length
  //   };
    
  //   this.document.transcript.push(message);
  //   this.document.timestamp.lastUpdated = new Date();
  //   this.document.interviewMetadata.questionCount = this.document.transcript.length;
    
  //   return message;
  // }

  // // Mark interview as complete
  // completeInterview() {
  //   this.document.status = "completed";
  //   this.document.timestamp.completed = new Date();
  //   this.document.interviewMetadata.completionStatus = "completed";
  //   this.document.interviewMetadata.duration = 
  //     (this.document.timestamp.completed - this.document.timestamp.started) / 1000;
  // }
}

// Database initialization function
export async function initializeDatabases(mongoClient) {
  // Create collections with validation
  await mongoClient.db('interviews').createCollection('live', {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["_id", "status", "timestamp", "transcript"],
        properties: {
          status: {
            enum: ["live", "completed", "analyzed", "archived"]
          }
          // Add other validation rules as needed
        }
      }
    }
  });

  await mongoClient.db('interviews').createCollection('processed', {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["_id", "status", "timestamp", "transcript", "analysis"],
        properties: {
          status: {
            enum: ["completed", "analyzed", "archived"]
          }
          // Add other validation rules as needed
        }
      }
    }
  });

  // Create indexes
  // await mongoClient.db('interviews').collection('live').createIndex(
  //   { "timestamp.lastUpdated": 1 },
  //   { expireAfterSeconds: 24 * 60 * 60 } // Auto-delete after 24 hours
  // );

  // await mongoClient.db('interviews').collection('processed').createIndex(
  //   { "demographics.university": 1 }
  // );
  // await mongoClient.db('interviews').collection('processed').createIndex(
  //   { "demographics.graduationYear": 1 }
  // );


}

// Usage example in your chat router

import { PRESTORAGE_V1 } from "./prompts/prestorage_v1.js";
import { openai } from "./app.js";
import { db } from "./app.js";

// Example processing pipeline
export async function processCompletedInterview(chatId) {
  
  try {
    // 1. Get the interview from live collection
    const interview = await db.collection('live').findOne({ _id: chatId });

    
    // 2. Run pre-storage analysis
    const analyzedInterview = await performPreStorageAnalysis(interview, chatId);


    // 3. Move to processed collection
    await db.collection('processed').insertOne(analyzedInterview);
    
    // 4. Remove from live collection
    await db.collection('live').deleteOne({ _id: chatId });
    
    return analyzedInterview;
  } catch (error) {
    console.error('Error processing interview:', error);
    // Add error handling logic
  }
}



async function performPreStorageAnalysis(interview, chatId) {


  const content = PRESTORAGE_V1.concat(JSON.stringify(interview.transcript))

  const duration = interview.timestamp.lastUpdated - interview.timestamp.started


  try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        store: false,
        messages: [{ role: 'system', content: content }]
      });

  const res = JSON.parse(completion.choices[0].message.content)


  await db.collection('live').updateOne(
    { _id: chatId },
    { 
      $set: {
        "demographics": res[0].demographics,
        "analysis": res[0].analysis,
        "timestamp.completed": true,
        "status": 'completed',
        "interviewMetadata.duration": duration,
        "interviewMetadata.questionCount": Object.keys(interview.transcript).length,
      }
    }
  );

  const analyzedInterview = await db.collection('live').findOne({ _id: chatId });


  return analyzedInterview



} catch (error){
  console.error('Error:', error.message || error);
  res.status(500).json({ error: 'Failed to generate response. Please try again later.' });
}
}