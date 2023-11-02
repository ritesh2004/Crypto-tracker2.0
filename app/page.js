"use client"
import React, { useContext } from 'react'
import App from './App'
import { ContextProvider } from './Context/Appcontext'

function Home() {
  return (
    <ContextProvider>
      <App />
    </ContextProvider>
  )
}

export default Home