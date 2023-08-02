import {useState, useEffect} from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

import PostButton from './PostButton'

export default function PostList({postArray}) {
    const postDataArray = postArray.map(post => {
        return <div key={post.post_id}><PostButton post={post}/></div>
    })

    return (
        <ul>{postDataArray}</ul>
    )
}