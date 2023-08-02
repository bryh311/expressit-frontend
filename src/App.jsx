import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom'
import './App.css'

import LoginUser from './components/user/LoginUser'
import RegisterUser from './components/user/RegisterUser'
import HomePage from './pages/HomePage'
import GroupPage from './pages/GroupPage'
import DisplayPost from './components/post/DisplayPost'
import TestAuth from './components/TestAuth'
import GroupForm from './components/group/GroupForm'
import PostForm from './components/post/PostForm'

export default function App() {
  let { post_id } = useParams()
  let { group_name } = useParams()

  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={< HomePage />} />
          <Route path='/register' element={< RegisterUser />} />
          <Route path='/login' element={< LoginUser />} />
          <Route path='/post/:post_id' element={< DisplayPost />} />
          <Route path='/authtest' element={<TestAuth/>} />
          <Route path='/create-group' element={<GroupForm />} />
          <Route path='/group/:group_name' element={<GroupPage />} />
          <Route path='/create-post/:group_name' element={<PostForm/>} />
        </Routes>
      </div>
    </Router>
  )
}
