import React from 'react'
import { useQuiz } from '../QuizContext'

function ExitScreen() {
  const {earned, userName, openStartScreen} = useQuiz();
  
  return (
    <div className="kbc-bg d-center">
      <div className="earned">
        {earned === "₹ 0" && <p>Oops! {userName}, you couldn't clear the minimum Threshold. Sadly you won {earned}.</p>}
        {earned === "₹ 10,00,00,000" && <p>Congratulations {userName}, you won this game and became Crorepati!</p>}
        {(earned !== "₹ 0" && earned !== "₹ 10,00,00,000") && <p>Hi {userName}, you won {earned}. Try your best next time!</p>}
      </div>
      <button className="btn-m" onClick={() => openStartScreen()}>Start Again</button>
    </div>
  )
}

export default ExitScreen