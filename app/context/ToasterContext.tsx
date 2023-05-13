'use client'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';


type Props = {}

const ToasterContext = (props: Props) => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      transition={Slide}
      theme="colored"
    />
  )
}

export default ToasterContext
