import { useState } from "react";
import { Link } from "react-router-dom"
import PostList from "../components/PostList";

export default function HomePage() {
    const [page, setPage] = useState(0)

    return (
        <>
            <div className="p-1 container row w-50">
                <h1 className="col-sm"> Expressit </h1>
                <div className="col-sm">
                    <Link to="./register">
                        <button className="btn btn-primary">Register</button>
                    </Link>
                </div>
                <div className="col-sm">
                    <Link to="./login">
                        <button className="btn btn-primary">Log in</button>
                    </Link>
                </div>
            </div>
            <PostList page={page}/>
        </>
    )
}