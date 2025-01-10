import { useState, useEffect } from 'react';
import Survey from './components/Survey';
import Login from './components/Login';
import ErrorPage from './components/ErrorPage';
import './index.css';

import Spinner from './components/Spinner';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import ThankYouPage from './components/ThankYouPage';



function App() {
  const navigate = useNavigate();
  const [isFinished, setIsFinished] = useState(false);
  const uuid = null;

  function finishSurvey(){
    navigate('/thankyou');
  }

  function startSurvey(uuid){
    navigate(`/interview/${uuid}`)
  }

  function setFinish(val){
    setIsFinished(val);
  }

  function foundError(){
    navigate('/error')
  }





  return (

      <Routes>
        <Route path = '/' element={<Login startSurvey = {startSurvey} />}></Route>
        <Route path='/interview/:chatId' element={<Survey isFinished = {isFinished} finishSurvey = {finishSurvey} setFinish = {setFinish} foundError = {foundError}/>} />
        <Route path='/thankyou' element = {<ThankYouPage />} />
        <Route path='/error' element = {<ErrorPage /> } />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
 
  );
}



export default App;
