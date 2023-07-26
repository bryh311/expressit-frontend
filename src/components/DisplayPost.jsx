import {useState, useEffect} from 'react'

export default function DisplayPost({post_id}) {
    [postData, setPostData] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8080/posts/post/${post_id}`)
        .then((res) => {
            setPostData(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])
}