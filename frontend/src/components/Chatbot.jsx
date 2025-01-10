import { useState, useEffect, useRef } from 'react';
import { useImmer } from 'use-immer';
import api from '../api';
import { parseSSEStream } from '../utils';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import Spinner from './Spinner';

function Chatbot({isInitializing, setInitialize, setFinish, finishSurvey, uuid}) {
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useImmer([]);
  const [newMessage, setNewMessage] = useState('');
  const isLoading = messages.length && messages[messages.length - 1].loading;
  const hasInitialized = useRef(false);
  const endmessage = "closing the interview"

  async function initializeChat() {
    if (hasInitialized.current) return;
    hasInitialized.current = true;
    setInitialize(true);

    try {
      const id = uuid;
      setChatId(id);

      const stream = await api.sendChatMessage(id, '');

      

      setMessages(draft => [
        ...draft,
        { role: 'assistant', content: '', sources: [], loading: true }
      ]);

      for await (const textChunk of parseSSEStream(stream)) {
        const message = JSON.parse(textChunk).message;
        setMessages(draft => {
          draft[draft.length - 1].content += message;
        });
      }
      setMessages(draft => {
        draft[draft.length - 1].loading = false;
      });
    } catch (err) {

      console.error('Error finding chat:', err);
      setMessages(draft => {
        if (draft.length) {
          draft[draft.length - 1].loading = false;
          draft[draft.length - 1].error = true;
        }
      });

    } finally {
      setInitialize(false);
    }
  }



  async function submitNewMessage() {
    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage || isLoading) return;

    setMessages(draft => [
      ...draft,
      { role: 'user', content: trimmedMessage },
      { role: 'assistant', content: '', sources: [], loading: true }
    ]);
    setNewMessage('');

    try {
      let chatIdOrNew = chatId;

      if (!chatId) {
        const id = await api.createChat();
        setChatId(id);
        chatIdOrNew = id;
      }

      const stream = await api.sendChatMessage(chatIdOrNew, trimmedMessage);

      for await (const textChunk of parseSSEStream(stream)) {
        const message = JSON.parse(textChunk).message;
        if (message.toLowerCase().includes(endmessage.toLowerCase())){

          api.finishSurvey(chatId);

          setTimeout(() => {
            setFinish(true);
          }, 5000);

          setTimeout(() => {
            finishSurvey();
          }, 8000);
        }
        setMessages(draft => {
          draft[draft.length - 1].content += message;
        });
      }
      setMessages(draft => {
        draft[draft.length - 1].loading = false;
      });
    } catch (err) {
      console.log(err);
      setMessages(draft => {
        draft[draft.length - 1].loading = false;
        draft[draft.length - 1].error = true;
      });
    }
  }


  useEffect(() => {
    initializeChat();
  }, []);

  return (
    <div className='relative grow flex flex-col gap-6 pt-6'>
      {isInitializing && (
        <div className='grow space-y-4'>
          <div  className='flex items-start gap-4 py-4 px-3 rounded-xl bg-primary-blue/10'>
            Thank you for participating in this CampusPulse Career Insights Interview. Before we begin, I want to note that your responses will be anonymized and used to generate aggregate insights about career trends. You can skip any questions you're not comfortable answering. Do you consent to proceed?
          </div>
        </div>
      )}
        {/* Chat Messages */}
        <ChatMessages messages={messages} isLoading={isLoading} />
  
        {/* Chat Input */}
        <div className="sticky bottom-0 bg-white">
          <ChatInput
            newMessage={newMessage}
            isLoading={isLoading}
            setNewMessage={setNewMessage}
            submitNewMessage={submitNewMessage}
          />
        
      </div>
    </div>
  );
  
  
}

export default Chatbot;
