import GroupButton from "./GroupButton"


export default function GroupList({groupArray}) {
    const groupDataArray = groupArray.map(group => {
        return <div key={group.group_id}><GroupButton group={group} /></div>
    })

    return (
        <ul>{groupDataArray}</ul>
    )
}