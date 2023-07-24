import {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function RegisterUser(props) {
    const [user, setUser] = useState({
        email: '',
        username: '',
        password: ''
    })

    const navigate = useNavigate()

    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value})
        // console.log(user)
    }

    function handleSubmit(e) {
        e.preventDefault()
        axios.post('http://localhost:8080/api/users/', user)
        .then((res) => {
            axios.post('http://localhost:8080/api/users/login', user)
            .then((res) => {
                const token = res.data.access_token
                localStorage.setItem("auth_token", token)
            })
            setUser({
                email: '',
                username: '',
                password: ''
            })
            // navigate('/')
        })
        .catch((err) => {
            console.log('Error in RegisterUser!')
        })
    }

    return (
        <>
        <div className='container-sm border border-primary rounded p-10 mt-4'>
            <h2>Register New User</h2>
            <form noValidate onSubmit={handleSubmit}>
                <input className='form-control' placeholder='Email' name='email' type="text" value={user.email} onChange={handleChange}></input><br></br>
                <input className='form-control' placeholder='Username' name='username' type="text" value={user.username} onChange={handleChange}></input><br></br>
                <input className='form-control' placeholder='Password' name='password' type="password" value={user.password} onChange={handleChange}></input><br></br>
                <input className='btn btn-primary mb-3' type='submit' value="Create"></input>
            </form>
        </div>
        </>
    )
}