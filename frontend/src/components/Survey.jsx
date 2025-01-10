import { useState, useEffect } from 'react';
import Chatbot from './Chatbot';
import logo from '../assets/logo.svg';
//import './index.css';

import Spinner from './Spinner';

import {
  BrowserRouter as Router,
  useParams
} from "react-router-dom";



function Survey({isFinished, setFinish, finishSurvey, foundError}) {

  const [isInitializing, setIsInitializing] = useState(true);
  const params = useParams();
  const uuid = params.chatId

  function isValidUUID(uuid) {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return regex.test(uuid);
  }

  if (!isValidUUID(uuid)){
    foundError();
  }



  function setInitialize(val){
    setIsInitializing(val);
  }

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ''; // Required for Chrome
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);


  return (


      <div className='flex flex-col min-h-full w-full max-w-3xl mx-auto px-4'>
        {(isInitializing || isFinished) && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <Spinner />
          </div>
        )}
        <div className={`flex flex-col grow gap-6 pt-6 ${(isInitializing || isFinished) ? 'blur-sm' : ''} transition-all`}>
          <header className='sticky top-0 shrink-0 z-20 bg-white'>
            <div className='flex flex-col h-full w-full gap-1 pt-4 pb-2'>
                <div className='flex items-center'>
                    {/* <img src={logo} className = 'w-10'/> */}
                    <h1 className="text-3xl font-bold text-gray-900 inline-block pb-1 border-b-4 border-blue-600">
                      CampusPulse
                    </h1>
              </div>
              <h1 className='font-urbanist text-[1.65rem] font-semibold'>Career Insights Interview</h1>
            </div>
          </header>
          <Chatbot isInitializing = {isInitializing} setInitialize = {setInitialize} setFinish = {setFinish} finishSurvey = {finishSurvey} uuid = { uuid }/>
        </div>
      </div>

  );
}



export default Survey;
