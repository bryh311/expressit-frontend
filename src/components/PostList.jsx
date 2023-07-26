import {useState, useEffect} from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

import PostButton from './PostButton'

export default function PostList({page}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [postList, setPostList] = useState([])
    
    // if (localStorage.getItem("auth_token")) {
    //    setIsLoggedIn(true)
    // }
    useEffect(() => {
        if (isLoggedIn) {
            const axiosParams = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("auth_token")
                }
            }
            axios.get(`http://localhost:8080/api/posts/home/${page}`, axiosParams)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        }
        else {
            axios.get(`http://localhost:8080/api/posts/${page}`)
            .then((res) => {
                if (res.data.data) {
                    const postData = res.data.data
                    console.log(postData)
                    setPostList(postData)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }, [isLoggedIn, page])
    
    console.log(postList)
    const postDataArray = postList.map(post => {
        return <div key={post.post_id}><PostButton post={post}/></div>
    })
    console.log(postDataArray)

    return (
        <ul>{postDataArray}</ul>
    )
}