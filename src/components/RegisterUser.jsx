import {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ErrorBar from './ErrorBar'
import axios from 'axios'

export default function RegisterUser(props) {
    const [user, setUser] = useState({
        email: '',
        username: '',
        password: ''
    })

    const [preexistingEmail, setPreexistingEmail] = useState(false)

    const navigate = useNavigate()

    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value})
        // console.log(user)
    }

    function handleSubmit(e) {
        setPreexistingEmail(false)
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
            .catch((err) => {
                console.log(err)
            })
            
            // navigate('/')
        })
        .catch((err) => {
            if (err.response) {
                if (err.response.data.error === "SQLITE_CONSTRAINT: UNIQUE constraint failed: user.email") {
                    setPreexistingEmail(true)
                }
            }
        })
    }

    return (
        <>
        <div className='container-sm border border-primary rounded p-10 mt-4 w-25'>
            <h2>Register New User</h2>
            <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                <div className="row p-3 m-2">
                    <input required className='form-control' placeholder='Email' name='email' type="text" value={user.email} onChange={handleChange}></input>
                    <div className='mt-2'>
                        <ErrorBar message="No email set" isError={!user.email}/>
                    </div>
                </div>
                
                <div className='row p-3 m-2'>
                    <input required className='form-control' placeholder='Username' name='username' type="text" value={user.username} onChange={handleChange}></input>
                    <div className='mt-2'>
                        <ErrorBar message="No username set" isError={!user.username} />
                    </div>
                </div>
                <div className='row p-3 m-2'>
                    <input required className='form-control' placeholder='Password' name='password' type="password" value={user.password} onChange={handleChange}></input>
                    <div className='mt-2'>
                        <ErrorBar message="No password set" isError={!user.password} />
                    </div>
                </div>
                <input required className='btn btn-primary mb-3' type='submit' value="Create"></input>
            </form>
            <ErrorBar message="Email is already being used!" isError={preexistingEmail} />
        </div>
        
        </>
    )
}