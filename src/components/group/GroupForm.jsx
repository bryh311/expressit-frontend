import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import ErrorBar from "../ErrorBar";

export default function GroupForm() {

    const [subgroup, setSubgroup] = useState({
        name: ''
    })
    const [alreadyExists, setAlreadyExists] = useState(false)
    const isLoggedIn = localStorage.getItem('auth_token')

    function handleSubmit(e) {
        e.preventDefault()
        setAlreadyExists(false)
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("auth_token")}`
        axios.post('http://localhost:8080/api/subgroups/', subgroup)
        .then((res) => {
            // temporary, will navigate to subgroup page
            console.log(res)
        })
        .catch((err) => {
            if (err.response.data.error) {
                if (err.response.data.error === "SQLITE_CONSTRAINT: UNIQUE constraint failed: subgroup.name") {
                    setAlreadyExists(true)
                }
            }
        })
    }

    function handleChange(e) {
        setSubgroup({...subgroup, [e.target.name]: e.target.value})
    }

    return (
        <>
        <div className='container-sm border border-primary rounded p-10 mt-4 w-25'>
            <h2>Subgroup</h2>
            { isLoggedIn ? 
            <form noValidate onSubmit={handleSubmit}>
                <div className="row p-3 m-2">
                    <input required className='form-control' placeholder='Name' name='name' type='text' value={subgroup.name} onChange={handleChange}></input>
                </div>
                <div className='mt-2'>
                    <ErrorBar message='No name set' isError={!subgroup.name}/>
                </div>
                <div>
                    <input className='btn btn-primary mb-3' type='submit' value='Create'></input>
                </div>
                <ErrorBar message='A group with that name already exists' isError={alreadyExists} />
            </form>
            : 
            <ErrorBar message='You must be logged in to create a group' isError={true} />
            }
            
        </div>
        </>
    )
}