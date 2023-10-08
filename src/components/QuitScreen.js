import React from 'react'
import { useQuiz } from '../QuizContext';

function QuitScreen() {
  const {dispatch, earned, openExitScreen} = useQuiz();
  return (
    <div className="overlay">
        <div className="overlay__background" />
        <div className="overlay__container d-center">
            <div className="overlay__controls">
                <p>Are you sure you want to Quit?</p>
                <p>You Will Take Home {earned} as Prize</p>
                <div>
                    <button className="btn-quit yes-btn" onClick={() => openExitScreen()}>Yes</button>
                    <button className="btn-quit" onClick={() => dispatch({type: "setShowQuitScreen", payload: false})}>No</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default QuitScreen