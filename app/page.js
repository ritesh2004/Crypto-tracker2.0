"use client"
import Navbar from './components/Navbar'
import Cards from './components/Cards'
import Coinpage from './components/Coinpage'
import Footer from './components/Footer'
import { ContextProvider } from './Context/Appcontext'
import App from './App'

export default function Home() {
  return (
    <ContextProvider>
      <App/>
    </ContextProvider>
  )
}
