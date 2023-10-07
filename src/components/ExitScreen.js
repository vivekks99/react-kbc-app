import React from 'react'
import { useQuiz } from '../QuizContext'

function ExitScreen() {
  const {earned, openStartScreen} = useQuiz();
  
  return (
    <div className="kbc-bg d-center">
      <div className="earned">You earned {earned}</div>
      <button className="btn-m" onClick={() => openStartScreen()}>Start Again</button>
    </div>
  )
}

export default ExitScreen