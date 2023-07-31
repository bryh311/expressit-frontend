import {useState, useEffect} from 'react'
import axios from 'axios'

export default function VoteButton({isComment, id}) {
    const [voteValue, setVoteValue] = useState(0)
    

    useEffect(() => {
        // assumes you are logged in
        // please be logged in!
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("auth_token")}`
        const request = isComment ? `http://localhost:8080/api/votes/user/comment/${id}`
        : `http://localhost:8080/api/votes/user/post/${id}`
        axios.get(request)
        .then((res) => {
            setVoteValue(res.data.count)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [id, isComment])

    function upvote(e) {
        e.preventDefault()
        const change = voteValue !== 1 ? {value: 1} : {value: "0"} // this is the most ridiculous kludge in the world
        setVoteValue(change.value)
        console.log(voteValue)
        const url = isComment ? `http://localhost:8080/api/votes/comment/${id}`
        : `http://localhost:8080/api/votes/post/${id}`
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("auth_token")}`
        axios.post(url, change)
        .then((res) => {
            window.location.reload(true)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    function downvote(e) {
        e.preventDefault()
        const change = voteValue !== -1 ? {value: -1} : {value: "0"}
        setVoteValue(change.value)
        const url = isComment ? `http://localhost:8080/api/votes/comment/${id}`
        : `http://localhost:8080/api/votes/post/${id}`
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("auth_token")}`
        axios.post(url, change)
        .then((res) => {
            window.location.reload(true)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
        <div>
            <button onClick={upvote} className='btn btn-primary'>+</button>
            <button onClick={downvote} className='btn btn-danger'>-</button>
        </div>
        </>
    )
}