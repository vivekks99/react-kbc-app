import React from 'react'
import { QuizProvider } from './QuizContext'
import Quiz from './Quiz'

function App() {
  return (
    <QuizProvider>
      <Quiz />
    </QuizProvider>
  )
}

export default App
