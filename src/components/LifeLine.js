import React, { useState } from 'react'
import { useQuiz } from '../QuizContext'

function LifeLine({correct, wrong}) {
  const {dispatch, showCorrectAnswer} = useQuiz();

  const [fiftyfifty, setFiftyFifty] = useState(false);
  const [doubleDip, setDoubleDip] = useState(false);
  const [expertAdvice, setExpertAdvice] = useState(false);

  function handleFiftyFifty(){
    if(fiftyfifty) return;
    setFiftyFifty(true);
    wrong.pop();
    wrong.pop();
    let arr = [correct, ...wrong];
    arr = arr.sort((a, b) => 0.5 - Math.random());
    dispatch({type: "setOptions", payload: arr});
  }
  function handleDoubleDip(){
    if(doubleDip) return;
    setDoubleDip(true);
    dispatch({type: "setDoubleAttempt"});
  }
  function handleExpertAdvice(){
    if(expertAdvice) return;
    setExpertAdvice(true);
    dispatch({type: "setShowCorrectAnswer", payload: true});
  }

  return (
    <>
        <div className="life-line">
            <img src="/Classic5050.png" alt="" className={`life-line-icon ${fiftyfifty && 'life-line-inactive'}`} onClick={handleFiftyFifty} />
            <img src="/DoubleDip.png" alt="" className={`life-line-icon ${doubleDip && 'life-line-inactive'}`} onClick={handleDoubleDip} />
            <img src="/ExpertAdvice.png" alt="" className={`life-line-icon ${expertAdvice && 'life-line-inactive'}`} onClick={handleExpertAdvice} />
        </div>
        {showCorrectAnswer &&
        <div className='correct-answer'>
            <p>The Correct Answer is: {correct}</p>
        </div>}
    </>
  )
}

export default LifeLine