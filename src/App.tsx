import { Fragment } from 'react/jsx-runtime'
import './App.css'
import Route from './app/routes.tsx';
import { useEffect } from 'react';
import { useAppDispatch } from './app/store.ts';
import { getInfoSession } from './domains/auth/authSlice.ts';
import { Slide, ToastContainer } from 'react-toastify';

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getInfoSession())
  }, [])
  return (
    <Fragment>
      <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide} />
      <Route />
    </Fragment>
  )
}

export default App
