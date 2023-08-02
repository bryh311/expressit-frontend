import {useState, useEffect} from 'react'
import GroupList from './GroupList'
import axios from 'axios'

export default function GroupSearch() {
    const [groupQuery, setGroupQuery] = useState({
        query: ''
    })
    const [groups, setGroups] = useState([])

    function update(e) {
        setGroupQuery({...groupQuery, [e.target.name]: e.target.value})
        console.log(groupQuery.query)
    }

    function submitQuery(e) {
        e.preventDefault()
        axios.post(`http://localhost:8080/api/subgroups/search`, groupQuery)
        .then((res) => {
            setGroups(res.data.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
        <form noValidate className='form' onSubmit={submitQuery}>
            <input required className='form-control mb-1' name='query' placeholder='Group Name' type='text' value={groupQuery.query} onChange={update} ></input>
            <input required className='btn btn-primary' type='submit' value='Search'/>
        </form>
        <div className='p-2 m-2'>
            { groups.length > 0 ? 
            <GroupList groupArray={groups} /> :
            <div></div>
            }
        </div>
        
        </>
    )
}