import React, { useEffect, useState } from 'react'
import { useQuiz } from '../QuizContext'
import LifeLine from './LifeLine';

function CurrentQuestion() {
  const {questions, questionNumber, selectedAnswer, options, doubleAttempt, dispatch, openExitScreen} = useQuiz();
  const [className, setClassName] = useState('answer');

  const question = questions[questionNumber].question;
  const correct = questions[questionNumber].correct_answer;
  const wrong = questions[questionNumber].incorrect_answers;

  function delay(duration, callback){
    setTimeout(() => {
        callback();
    }, duration);
  }

  function handleSelectedAnswer(a){
    dispatch({type: "setSelectedAnswer", payload: a});
    setClassName('answer active');
    setClassName(a === correct ? 'answer correct' : 'answer wrong');
    delay(1000, () => {
        if(doubleAttempt){
            if(a === correct){
                dispatch({type: "incrementQuestion"});
            }
            dispatch({type: "setDoubleAttempt"});
        }
        else{
            if(a === correct){
                dispatch({type: "incrementQuestion"});
            }
            else{
                openExitScreen();
            }
        }
        dispatch({type: "setShowCorrectAnswer", payload: false});
    })
  }

  useEffect(function(){
    const arr = [correct, ...wrong];
    const shuffledOptions = arr.sort((a, b) => 0.5 - Math.random());
    dispatch({type: "setOptions", payload: shuffledOptions});
  }, [correct, wrong, dispatch]);

  return (
    <>
    <div className="trivia">
      <div className="question">{question}</div>
      <LifeLine correct={correct} wrong={wrong} />
      <div className="answers">
        {options.map((i) => (
            <button key={i} className={selectedAnswer === i ? className : 'answer'} onClick={() => handleSelectedAnswer(i)} value={i}>{i}</button>
        ))}
      </div>
    </div>
    </>
  )
}

export default CurrentQuestion