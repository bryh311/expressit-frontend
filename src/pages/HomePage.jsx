import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import PostList from "../components/post/PostList";
import axios from 'axios'

export default function HomePage() {
    const [page, setPage] = useState(0)
    const [subscriptionToggle, setSubscriptionToggle] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("auth_token"))
    const [postArray, setPostArray] = useState([])

    useEffect(() => {
        if (!subscriptionToggle) {
            axios.get(`http://localhost:8080/api/posts/${page}`)
            .then((res) => {
                setPostArray(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }
        else {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("auth_token")}`
            axios.get(`http://localhost:8080/api/posts/home/${page}`)
            .then((res) => {
                setPostArray(res.data.data)
            })
            .catch((err) => {
                console.log(err)
                if (err.response.data) {
                    if (err.response.data === "Forbidden") {
                        setIsLoggedIn(0)
                        setSubscriptionToggle(false)
                    }
                }
            })
        }

        
    }, [page, subscriptionToggle, isLoggedIn])

    function logOut(e) {
        setIsLoggedIn(0)
        localStorage.removeItem("auth_token")
    }

    function getSubscriptions(e) {
        e.preventDefault()
        setSubscriptionToggle(true)
    }

    function getHomepage(e) {
        e.preventDefault()
        setSubscriptionToggle(false)
    }

    function pageForward(e) {
        e.preventDefault()
        setPage(page + 1)
    }

    function pageBackward(e) {
        e.preventDefault()
        if (page > 0) {
            setPage(page - 1)
        }
    }

    return (
        <>
            <div className="p-1 container row w-50">
                <h1 className="col-sm"> Expressit </h1>
                <div className="col-sm">
                    {isLoggedIn ? <div></div> :
                    <Link to="./register">
                        <button className="btn btn-primary">Register</button>
                    </Link>
                    }
                    
                </div>
                <div className="col-sm">
                    {isLoggedIn ? 
                    <div>
                        <button className="btn btn-primary" onClick={logOut}>Log out</button>
                    </div> : 
                    <Link to="./login">
                        <button className="btn btn-primary">Log in</button>
                    </Link>
                    }
                </div>
                <div className="col-sm">
                    {isLoggedIn ?
                        <Link to="./create_group">
                            <button className="btn btn-primary">Create Subgroup</button>
                        </Link>
                    : <div></div>}
                </div>
            </div>
            {isLoggedIn ? 
            <div className='p-1 container row w-50'>
                <div className='col-sm'>
                    <button onClick={getSubscriptions} className="btn btn-primary">My Subscriptions</button>
                </div>
                <div className='col-sm'>
                    <button onClick={getHomepage} className="btn btn-primary">Homepage</button>
                </div>
            </div>
            :
            <div></div>
            }
            <PostList postArray={postArray}/>
            <div className="navbar fixed-bottom w-25">
                <button onClick={pageBackward} className="btn btn-primary"> {"<"} </button>
                <p>Page: {page} </p>
                <button onClick={pageForward} className="btn btn-primary"> {">"} </button>
            </div>
        </>
    )
}