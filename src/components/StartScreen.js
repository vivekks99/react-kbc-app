import React from 'react'
import { useQuiz } from '../QuizContext'

function StartScreen() {
  const {closeStartScreen} = useQuiz();
  
  return (
    <div className="kbc-bg d-center">
      <h1>Welcome To KBC</h1>
      <button className="btn-m" onClick={() => closeStartScreen()}>Lets Rock!</button>
    </div>
  )
}

export default StartScreen