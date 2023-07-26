import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom'
import './App.css'

import LoginUser from './components/LoginUser'
import RegisterUser from './components/RegisterUser'
import HomePage from './pages/HomePage'
import DisplayPost from './components/DisplayPost'

export default function App() {
  let { post_id } = useParams()

  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={< HomePage />} />
          <Route path='/register' element={< RegisterUser />} />
          <Route path='/login' element={< LoginUser />}/>
          <Route path='/post/:post_id' element={< DisplayPost id={post_id} />} />
        </Routes>
      </div>
    </Router>
  )
}
