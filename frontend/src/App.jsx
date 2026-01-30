import './App.css'
import { Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import MainLayout from './layouts/MainLayout'
import Login from './components/Login'
import Register from './components/Register'
import SpecialtyPage from './pages/SpecialtyPage'
import DoctorsPage from './pages/DoctorsPage'
import Doctordashboard from './pages/Doctordashboard'
import Impressum from './pages/Impressum'
import Privacy from './pages/Privacy'
import Cookies from './pages/Cookies'
import PatientReviews from './pages/PatientReviews'
import DoctorReviews from './pages/DoctorReviews'


function App() {

  return (
    <>
      <Routes>
        <Route element = { <MainLayout/> }>
          <Route path='/' element = { <Home/> } />
          <Route path='/login' element = { <Login/> } />
          <Route path='/register' element = { <Register/> } />
          <Route path="/specialty/:slug" element = {<SpecialtyPage/> } />
          <Route path='/doctors' element = { <DoctorsPage/> } />
          <Route path='/my-services' element = { <Doctordashboard/> } />

          <Route path='/my-reviews' element={<PatientReviews/>}/>

          <Route path="/impressum" element={<Impressum />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/patient-reviews" element={<PatientReviews/>}/>
         <Route path="/doctor/:doctorId/reviews" element={<DoctorReviews/>} />
         </Route>
      </Routes>
    </>
  )
}

export default App
