import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

export default function GroupButton({group}) {
    const groupLink = "/group/" + group.name
    
    return (
        <Link to={groupLink}>
            <button className='alert alert-primary'>{group.name}</button>
        </Link> 
    )
}