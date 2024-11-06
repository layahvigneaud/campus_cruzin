import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import Auth from './components/Auth'
import Review from './components/Review'
import Club from './components/Club'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* protected routes */}
        <Route path='/homepage' element={<Home />}></Route>
        <Route path='/review' element={<Review/>}></Route>
        <Route path='/club' element={<Club />}></Route>
        <Route path='/' element={<Auth/>}></Route>

        {/* unprotected routes */}
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/forgotpassword' element={<ForgotPassword />}></Route>
        <Route path='/resetpassword/:token' element={<ResetPassword />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
