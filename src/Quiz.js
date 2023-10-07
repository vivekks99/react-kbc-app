import React from 'react'
import { useQuiz } from './QuizContext'
import StartScreen from './components/StartScreen';
import ExitScreen from './components/ExitScreen';
import Loader from './components/Loader';
import CurrentQuestion from './components/CurrentQuestion';

function Quiz() {
  const {questionNumber, moneyPyramid, showStartScreen, showExitScreen, isLoading} = useQuiz();
  
  return (
    <div className='app'>
      {showStartScreen ? <StartScreen /> : showExitScreen ? <ExitScreen /> :
        <>
          {isLoading ? <Loader /> : 
          <>
            <div className="main">
              <div className="bottom">
                <CurrentQuestion />
              </div>
            </div>
            <div className="pyramid">
              <ul className="moneyList">
                {moneyPyramid.map((m) => (
                  <li key={m.id} className={questionNumber === m.id ? "moneyListItem active" : "moneyListItem"}>
                    <span className="moneyListItemNumber">{m.id + 1}.</span>
                    <span className="moneyListItemAmount">{m.amount}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>}
        </>}
    </div>
  )
}

export default Quiz