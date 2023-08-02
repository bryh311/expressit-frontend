import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import VoteButton from './VoteButtons'
import axios from 'axios'

function DisplayComment({comment}) {
    const [author, setAuthor] = useState("")
    const [vote, setVote] = useState(0)
    const isLoggedIn = localStorage.getItem("auth_token")

    useEffect(() => {
        axios.get(`http://localhost:8080/api/users/${comment.creator_id}`)
        .then((res) => {
            setAuthor(res.data.data.username)
        })
        .catch((err) => {
            console.log(err)
        })
        
        axios.get(`http://localhost:8080/api/votes/comment/${comment.comment_id}`)
        .then((res) => {
            setVote(res.data.count)
            // console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
        console.log(comment.date)

    }, [comment.creator_id])


    return (
        <>
        <div className="container-sm border border-primary rounded p-10 mt-4">
            <div className='row'>
                <div className='col-sm'>
                    {isLoggedIn ? <VoteButton isComment={true} id={comment.comment_id} />
                    : <div></div>}
                </div>
                <div className='col-sm'>
                    <p>Author: {author} Votes: {vote}</p>
                    
                </div>
                <p>{comment.content}</p>
            </div>
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
            window.location.reload(true)
        })
        .catch((err) => {
            //console.log(err)
        })
    }

    if (isLoggedIn) {
        return (
            <>
            <form noValidate onSubmit={handleSubmit} >
                <input className='form-control' required placeholder='message' name='content' type='text' onChange={handleChange}></input>
                <input className='btn btn-primary' type='submit' value='create' ></input>
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
    const [vote, setVote] = useState(0)
    const isLoggedIn = localStorage.getItem("auth_token")

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

        axios.get(`http://localhost:8080/api/votes/post/${post_id}`)
        .then((res) => {
            setVote(res.data.count)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [post_id])

    return (
        <>
        <div className='container-sm border border-primary rounded p-10 mt-4 w-50'>
            {postData ? 
            <div className='row'>
                <div className='col'>
                    {isLoggedIn ? <VoteButton isComment={false} id={postData.post_id} />
                    : <div></div>}
                </div>
                <div className='col'>
                    <h2>{postData.title}</h2>
                    <p>{postData.content}</p>
                </div>

                <p>Votes: {vote} Author: {author} </p>
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