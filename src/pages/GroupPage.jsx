import {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import PostList from '../components/post/PostList'

export default function GroupPage() {
    const [group, setGroup] = useState({})
    const [postArray, setPostArray] = useState([])
    const [page, setPage] = useState(0)
    const [subscribe, setSubscribe] = useState("Subscribe")

    const {group_name} = useParams()
    const isLoggedIn = localStorage.getItem("auth_token")

    useEffect(() => {
        axios.get(`http://localhost:8080/api/subgroups/group/${group_name}`)
        .then((res) => {
            setGroup(res.data.data)
        })
        .catch((err) => {
            console.log(err)
        })
        axios.get(`http://localhost:8080/api/posts/group/${group_name}/${page}`)
        .then((res) => {
            console.log(res)
            setPostArray(res.data.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [group_name, page])


    function pageBackward(e) {
        e.preventDefault()
        if (page > 0) {
            setPage(page - 1)
        }
    }

    function pageForward(e) {
        e.preventDefault()
        setPage(page + 1)
    }

    return (
        <>
        <div>
            <div className='container row'>
                <div className='container col-sm'>
                    <h1>{group.name}</h1>
                </div>
                <div className='container col-sm'>
                    {isLoggedIn ? 
                    <Link to={`../create-post/${group_name}`}>
                        <button className='btn btn-primary'>Create Post</button>
                    </Link>
                    :
                    <div></div>
                    }
                </div>
                <div className='container col-sm'>
                    {isLoggedIn ?
                    <button className='btn btn-warning'>{subscribe}</button>
                    :
                    <div></div>
                    }
                </div>
            </div>
            
            <PostList postArray={postArray} />
            <div className="navbar fixed-bottom w-25">
                <button onClick={pageBackward} className="btn btn-primary"> {"<"} </button>
                <p>Page: {page} </p>
                <button onClick={pageForward} className="btn btn-primary"> {">"} </button>
            </div>
        </div>
        </>
    )
}