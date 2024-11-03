import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import SearchPage from './components/SearchPage'
import Review from './components/Review'
import Club from './components/Club'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/' element={<Home />}></Route>
        <Route path='/searchclubs' element={<SearchPage />}></Route>
        <Route path='/review' element={<Review />}></Route>
        <Route path='/club' element={<Club />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
