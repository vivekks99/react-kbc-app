import React from 'react'
import { useQuiz } from '../QuizContext'

function StartScreen() {
  const {closeStartScreen, userName, dispatch} = useQuiz();

  function handleFormSubmit(e){
    e.preventDefault();
    if(userName.trim() === '') return;
    closeStartScreen();
  }
  
  return (
    <div className="start-screen kbc-bg">
      <h1>Welcome To KBC</h1>
      <div className='content'>
        <div className="kbc-rules">
          <h2>Rules:</h2>
          <p>1. You will have to answer correctly before the timer runs out. Maximum Prize is Rs. 10 Crores.</p>
          <p>2. There are 2 Thresholds which you will have to pass. If you cross the threshold, you will be guaranteed that amount of cash winnings. First Threshold is at Question-5 and Second Threshold is at Question-10.</p>
          <p>3. There will be Timer of 30 seconds till First Threshold and of 60 seconds till Second Threshold. After that, the questions are not timed.</p>
          <p>4. If you give the Wrong answer or the Timer Runs Out, you will only win the amount till last cleared Threshold. Getting a question wrong before the Threshold is reached would result in zero winnings.</p>
          <p>5. However, you have the option to Quit the Game. You will win the complete amount till the number of questions you have answered correctly.</p>
        </div>
        <div className='kbc-img'>
          <div className='life-line-content'>
            <img src="/Classic5050.png" alt="" className='life-line-icon' />
            <p>This Life-Line will erase two wrong options thereby giving you a 50% probability chance.</p>
          </div>
          <div className='life-line-content'>
            <img src="/DoubleDip.png" alt="" className='life-line-icon' />
            <p>This Life-Line will give you one two chances to make your guess.</p>
          </div>
          <div className='life-line-content'>
            <img src="/ExpertAdvice.png" alt="" className='life-line-icon' />
            <p>You will get Expert level advice from our Guest who has in depth knowledge.</p>
          </div>
        </div>
      </div>
      <form className='kbc-form' onSubmit={handleFormSubmit}>
        <input type="input" className="form__field" placeholder="Enter Your Name" onChange={(e) => dispatch({type: "setUserName", payload: e.target.value})} value={userName} required />
        <button className="btn-m">Lets Rock!</button>
      </form>
    </div>
  )
}

export default StartScreen