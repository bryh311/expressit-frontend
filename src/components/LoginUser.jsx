import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function LoginUser() {
    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()
        axios.post('https://localhost:8080/api/user/login', user)
        .then((res) => {
            if (res.data.access_token) {
                localStorage.removeItem("auth_token")
                localStorage.setItem("auth_token", res.access_token)
            }
            
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
        <div className='container-sm border border-primary rounded p-10 mt-4'>
            <h2>Login</h2>
            <form noValidate onSubmit={handleSubmit}>
                <input className='form-control' placeholder='Email' name='email' type="text" value={user.email} onChange={handleChange}></input><br></br>
                <input className='form-control' placeholder='Password' name='password' type="password" value={user.password} onChange={handleChange}></input><br></br>
                <input className='btn btn-primary mb-3' type='submit' value="Login"></input>
            </form>
        </div>
        </>
    )
}