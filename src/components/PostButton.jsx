import {useState} from 'react'
import {Link, useParams} from 'react-router-dom'

export default function PostButton({post}) {

    const postLink = "/post/" + post.post_id

    return (
        <>
            <Link to={postLink}>
                <button className='alert alert-primary'>{post.title}</button>
            </Link>
        </>
    )
}