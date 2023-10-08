import { useEffect, useState } from 'react'
import { useQuiz } from '../QuizContext';

function Timer() {
    const {questionNumber, freezeTime, dispatch} = useQuiz();
    const [timer, setTimer] = useState(10);

    useEffect(() => {
      if (timer === -1) return dispatch({type: "setTimeOver", payload: true});
      const interval = setInterval(() => {
        if(freezeTime) setTimer((prev) => prev);
        else setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }, [timer, freezeTime, dispatch]);
  
    useEffect(() => {
      setTimer(questionNumber <= 4 ? 10 : 20);
    }, [questionNumber]);
    return timer;
}

export default Timer