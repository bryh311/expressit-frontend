import { useState, useEffect } from "react";
import axios from 'axios'

export default function TestAuth() {

    const [success, setSuccess] = useState(false)
    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("auth_token")}`

        if (localStorage.getItem("auth_token")) {
            const axiosParams = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("auth_token")
                }
            }
            axios.get('http://localhost:8080/api/users/authtest')
            .then(res => {
                setSuccess(true)
            })
            .catch(err => {
                setSuccess(false)
            })
        }
    }, [])

    if (success) {
        return (<h1>Success!</h1>)
    }
    else {
        return (<h1>FAIL!</h1>)
    }
    
    
}