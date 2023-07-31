import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ErrorBar from './ErrorBar'

export default function LoginUser() {
    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const navigate = useNavigate()

    const [loginFailed, setLoginFailed] = useState(false)

    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        setLoginFailed(false)
        e.preventDefault()
        axios.post('http://localhost:8080/api/users/login', user)
        .then((res) => {
            if (res.data.access_token) {
                localStorage.removeItem("auth_token")
                localStorage.setItem("auth_token", res.data.access_token)
                localStorage.setItem("email", user.email)
            }
            navigate('/')
            
        })
        .catch((err) => {
            if (err.response) {
                if (err.response.data.error === "incorrect password") {
                    setLoginFailed(true)
                }
                if (err.response.data.error === "user does not exist!") {
                    setLoginFailed(true)
                }
            }
        })
    }

    return (
        <>
        <div className='container-sm border border-primary rounded p-10 mt-4 w-25'>
            <h2>Login</h2>
            <form noValidate onSubmit={handleSubmit}>
                <div className="row p-3 m-2">
                    <input required className='form-control' placeholder='Email' name='email' type="text" value={user.email} onChange={handleChange}></input>
                    <div className='mt-3'>
                        <ErrorBar message='No email' isError={!user.email}/>
                    </div>
                </div>
                <div className='row p-3 m-2'>
                    <input required className='form-control' placeholder='Password' name='password' type="password" value={user.password} onChange={handleChange}></input>
                    <div className='mt-3'>
                        <ErrorBar message='No password' isError={!user.password}/>
                    </div>
                </div>
                <div>
                    <input className='btn btn-primary mb-3' type='submit' value="Login"></input>
                </div>
            </form>
            <ErrorBar message='Login failed! Incorrect username or password' isError={loginFailed} />
        </div>
        </>
    )
}