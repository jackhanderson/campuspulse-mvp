import Markdown from 'react-markdown';
import useAutoScroll from '../hooks/useAutoScroll';
import Spinner from './Spinner';
import userIcon from '../assets/user.svg'
import errorIcon from '../assets/error.svg';

function ChatMessages({ messages, isLoading }) {
  const scrollContentRef = useAutoScroll(true);
  
  return (
    <div ref={scrollContentRef} className='grow space-y-4'>
      {messages.map(({ role, content, loading, error }, idx) => (
        <div key={idx} className={`flex items-start gap-4 py-4 px-3 rounded-xl ${role === 'assistant' ? 'bg-primary-blue/10' : ''}`}>
          {role === 'assistant' }
          <div>
            <div className='markdown-container break-word'>
              {(loading && !content) ? <Spinner />
                : (role === 'user')
                  ? <Markdown>{content}</Markdown>
                  : <div className='whitespace-pre-line'>{content}</div>
              }
            </div>
            {error && (
              <div className={`flex items-center gap-1 text-sm text-error-red ${content && 'mt-2'}`}>
                <img className='h-5 w-5' src={errorIcon} alt='error' />
                <span>Error generating the response</span>
              </div>
            )}
          </div>
        </div>
      ))}

    </div>
  );
}

export default ChatMessages;