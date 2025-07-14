import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import route from './Router'
import {  router} from 'react-router-dom'
export default function App() {
  return (
    <>
     <BrowserRouter route={route}/>
       
    </>
  )
}
