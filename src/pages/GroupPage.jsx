import {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import PostList from '../components/post/PostList'

export default function GroupPage() {
    const [group, setGroup] = useState({})
    const [postArray, setPostArray] = useState([])
    const [page, setPage] = useState(0)
    const [subscribe, setSubscribe] = useState("Subscribe")
    const [isSubscribed, setIsSubscribed] = useState(true)

    const {group_name} = useParams()
    const isLoggedIn = localStorage.getItem("auth_token")

    const navigate = useNavigate()

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
        if (isLoggedIn) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("auth_token")}`
            axios.get(`http://localhost:8080/api/subgroups/issubscribed/${group_name}`)
            .then((res) => {
                setIsSubscribed(res.data.subscribed)
                console.log(isSubscribed)
                if (isSubscribed) {
                    setSubscribe("Unsubscribe")
                    //window.location.reload()
                }
                else {
                    setSubscribe("Subscribe")
                }
            })
            .catch((err) => {
                console.log(err)
                if (err.response.data === "Forbidden") {
                    localStorage.removeItem("auth_token")
                    localStorage.removeItem("email")
                    navigate('../login')
                }
            })
        }
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

    function handleSubscribe(e) {
        e.preventDefault()
        const endpoint = isSubscribed ?
        `http://localhost:8080/api/subgroups/unsubscribe/${group_name}` :
        `http://localhost:8080/api/subgroups/subscribe/${group_name}`
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("auth_token")}`
        axios.post(endpoint)
        .then((res) => {
            if (isSubscribed) {
                setIsSubscribed(false)
                setSubscribe("Subscribe")
                // window.location.reload(true)
            }
            else {
                setIsSubscribed(true)
                setSubscribe("Unsubscribe")
            }
        })
        .catch((err) => {
            console.log(err)
            
        })
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
                    <button className='btn btn-warning' onClick={handleSubscribe}>{subscribe}</button>
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