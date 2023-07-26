import {useState} from 'react'

export default function ErrorBar({message, isError}) {
    if (isError) {
        return (
            <>
            <div className="alert alert-danger" role="alert">
                {message}
            </div>
            </>
        )
    }
    else {
        return
    }
    
}