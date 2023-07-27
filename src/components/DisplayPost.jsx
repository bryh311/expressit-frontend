import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'

function DisplayComment({comment}) {
    const [author, setAuthor] = useState("")

    useEffect(() => {
        axios.get(`http://localhost:8080/api/users/${comment.creator_id}`)
        .then((res) => {
            setAuthor(res.data.data.username)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [comment.creator_id])


    return (
        <>
        <div className="container-sm border border-primary rounded p-10 mt-4 w-50">
            <p>Author: {author} Votes: {comment.vote}</p>
            <p>{comment.content}</p>
        </div>
        </>
    )
}

function CommentForm({postId}) {
    const [comment, setComment] = useState({
        content: ''
    })

    const isLoggedIn = localStorage.getItem("auth_token")

    function handleChange(e) {
        setComment({...comment, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("auth_token")}`
        axios.post(`http://localhost:8080/api/comments/post/${postId}`, comment)
        .then((res) => {
            //console.log(res)
        })
        .catch((err) => {
            //console.log(err)
        })
    }

    if (isLoggedIn) {
        return (
            <>
            <form noValidate onSubmit={handleSubmit} >
                <input required placeholder='message' name='content' type='text' onChange={handleChange}></input>
                <input type='submit' value='create' ></input>
            </form>
            </>
        )
    }
    else {
        return
    }
    
}

export default function DisplayPost() {
    const {post_id} = useParams()
    const [postData, setPostData] = useState({})
    const [author, setAuthor] = useState("")
    const [commentList, setCommentList] = useState([])

    useEffect(() => {
        console.log(post_id)
        axios.get(`http://localhost:8080/api/posts/post/${post_id}`)
        .then((res) => {
            setPostData(res.data.data)
            // console.log(res.data)
            axios.get(`http://localhost:8080/api/users/${res.data.data.creator_id}`)
            .then((res) => {
                setAuthor(res.data.data.username)
            })
            .catch((err) => {
                console.log(err)
            })
        })
        .catch((err) => {
            console.log(err)
        })

        axios.get(`http://localhost:8080/api/comments/post/${post_id}`)
        .then((res) => {
            setCommentList(res.data.data.map(commentData => {
                return <div key={commentData.comment_id}><DisplayComment comment={commentData} /></div>
            }))
        })
        .catch((err) => {
            console.log(err)
        })
    }, [post_id])

    return (
        <>
        <div className='container-sm border border-primary rounded p-10 mt-4 w-50'>
            {postData ? 
            <div>
                <h2>{postData.title}</h2>
                <p>{postData.content}</p>
                <p>votes: {postData.votes} creator: {author} </p>
                <CommentForm postId={postData.post_id} />
                <div>
                    <ul>{commentList}</ul>
                </div>
            </div>
            :
            <div></div>
            }
        </div>
        </>
    )
}