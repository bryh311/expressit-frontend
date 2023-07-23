import {useState} from 'react'
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
        console.log(user)
    }

    function handleSubmit(e) {
        e.preventDefault()
        axios.post('http://localhost:8080/api/users/', user)
        .then((res) => {
            setUser({
                email: '',
                username: '',
                password: ''
            })
            navigate('/')
        })
        .catch((err) => {
            console.log('Error in RegisterUser!')
        })
    }

    return (
        <>
        <h2>Register New User</h2>
        <div className='form-group'>
        <form noValidate onSubmit={handleSubmit} className='form-row'>
            <input placeholder='Email' name='email' type="text" value={user.email} onChange={handleChange}></input><br></br>
            <input placeholder='Username' name='username' type="text" value={user.username} onChange={handleChange}></input><br></br>
            <input placeholder='Password' name='password' type="password" value={user.password} onChange={handleChange}></input><br></br>
            <input type='submit'></input>
        </form>
        </div>
        </>
    )
}