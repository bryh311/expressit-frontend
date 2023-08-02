import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import ErrorBar from "../ErrorBar"
import axios from 'axios'


export default function PostForm() {
    const [post, setPost] = useState({
        title: '',
        content: ''
    })
    const navigate = useNavigate()
    const {group_name} = useParams()
    const isLoggedIn = localStorage.getItem('auth_token')

    function handleSubmit(e) {
        e.preventDefault()
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("auth_token")}`
        axios.post(`http://localhost:8080/api/posts/group/${group_name}`, post)
        .then((res) => {
            navigate(`../post/${res.data.id}`)
        })
        .catch((err) => {
            console.log(err)
            if (err.repsonse === "Forbidden") {
                localStorage.removeItem("auth_token")
                localStorage.removeItem("email")
                navigate("../login")
            }
        })
    }

    function handleChange(e) {
        setPost({...post, [e.target.name]: e.target.value})
    }

    return (
        <>
        <div className='container-sm border border-primary rounded p-10 mt-4 w-25'>
            <h2>Post</h2>
            { isLoggedIn ? 
            <form noValidate onSubmit={handleSubmit}>
                <div className="row p-3 m-2">
                    <input required className='form-control' placeholder='Title' name='title' type='text' value={post.title} onChange={handleChange}></input>
                </div>
                <div className='mt-2'>
                    <ErrorBar message='No title set' isError={!post.title}/>
                </div>
                <div className="row p-3 m-2">
                    <input required className='form-control' placeholder='Content' name='content' type='text' value={post.content} onChange={handleChange}></input>
                </div>
                <div className='mt-2'>
                    <ErrorBar message='No content set' isError={!post.content}/>
                </div>
                <div>
                    <input className='btn btn-primary mb-3' type='submit' value='Create'></input>
                </div>
            </form>
            : 
            <ErrorBar message='You must be logged in to create a group' isError={true} />
            }
        </div>
        </>
    )
}