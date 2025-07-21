import React from 'react'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import  router from './Router'
import {  router} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
export default function App() {
  return (
    <>
    <RouterProvider router={router} /> 
       <Toaster />
    </>
  )
}
