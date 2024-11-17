import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import Auth from './components/Auth';
import Review from './components/Review';
import Club from './components/Club';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Test from './components/test';
import './styles/global.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SavedClubs from './components/SavedClubs';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* special protected route (protected when logged in) */}
        <Route path='/' element={<Auth/>}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/forgotpassword' element={<ForgotPassword />}></Route>
        <Route path='/resetpassword/:token' element={<ResetPassword />}></Route>

        {/* protected routes (not logged in)*/}
        <Route path='/homepage' element={<Home />}></Route>
        <Route path='/review' element={<Review/>}></Route>
        <Route path='/club' element={<Club />}></Route>
        <Route path='/savedclubs' element={<SavedClubs />}></Route>

        {/* unprotected routes */}
        <Route path='/test' element={<Test />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
