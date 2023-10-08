import React from 'react'
import { useQuiz } from '../QuizContext';

function ErrorScreen() {
  const {error} = useQuiz();
  return (
    <div className="error">
      <h1><span>⛔️</span>Oops!</h1>
      <div>{error}</div>
    </div>
  );
}

export default ErrorScreen