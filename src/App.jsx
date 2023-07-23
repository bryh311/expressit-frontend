import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'

import LoginUser from './components/LoginUser'
import RegisterUser from './components/RegisterUser'

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/register' element={< RegisterUser />} />
          <Route path='/login' element={< LoginUser />}/>
        </Routes>
      </div>
    </Router>
  )
}
