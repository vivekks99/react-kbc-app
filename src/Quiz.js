import React from 'react'
import { useQuiz } from './QuizContext'
import StartScreen from './components/StartScreen';
import ExitScreen from './components/ExitScreen';
import Loader from './components/Loader';
import CurrentQuestion from './components/CurrentQuestion';
import QuitScreen from './components/QuitScreen';
import ErrorScreen from './components/ErrorScreen';

function Quiz() {
  const {questionNumber, moneyPyramid, showStartScreen, showExitScreen, isLoading, showQuitScreen, error, dispatch} = useQuiz();
  
  return (
    <div className='app'>
      {showStartScreen ? <StartScreen /> : showExitScreen ? <ExitScreen /> :
        <>
          {isLoading ? <Loader /> : 
          <>
            {error ? <ErrorScreen /> :
            <>
              <div className="main">
                <div className="bottom">
                  <CurrentQuestion />
                  {showQuitScreen && <QuitScreen />}
                </div>
              </div>
              <div className="pyramid">
                <ul className={`moneyList`}>
                  {moneyPyramid.map((m) => (
                    <li key={m.id} className={`moneyListItem ${(m.id === 4 || m.id === 9) && "level"} ${questionNumber === m.id && "active"} ${(m.id === 4 || m.id === 9) && (questionNumber === m.id) && "current-level"}`}>
                      <span className="moneyListItemNumber">{m.id + 1}.</span>
                      <span className="moneyListItemAmount">{m.amount}</span>
                    </li>
                  ))}
                </ul>
                <button className="btn-quit" onClick={() => dispatch({type: "setShowQuitScreen", payload: true})}>Quit Game</button>
              </div>
            </>
            }
          </>
          }
        </>}
    </div>
  )
}

export default Quiz