import { useState } from "react";
import { Link } from "react-router-dom"
import PostList from "../components/PostList";

export default function HomePage() {
    const [page, setPage] = useState(0)
    const isLoggedIn = localStorage.getItem("auth_token")
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
                    {isLoggedIn ? <div></div> : 
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
            <PostList page={page}/>
        </>
    )
}