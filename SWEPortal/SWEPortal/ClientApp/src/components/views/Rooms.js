import { useState, useEffect } from 'react'
import './base.css'
import { EntryTable, FormHeader } from './Shared.js'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import apiBuilder from '../../api/rooms'

const api = apiBuilder("rooms")

const Rooms = () => {
    const [rooms, setRooms] = useState([])
    const [roomName, setRoomName] = useState("")
    const [roomCapacity, setRoomCapacity] = useState("")

    const fetchRooms = () => {
        api.getAll()
            .then(response => setRooms(response.data))
    }

    const submitRoom = (room) => {
        api.create(room).then(response => {
            fetchRooms()
            setRoomName("")
            setRoomCapacity("")
        })
    }

    const editRoom = (room) => {
        api.update(room).then(response => {
            fetchRooms()
        })
    }

    const removeRoom = (id) => {
        api.delete(id).then(response => fetchRooms)
    }

    useEffect(() => {
        fetchRooms()
    })

    return (
        <div className="container">
            <FormHeader name="Rooms"/>
            <RoomForm 
                submit={(data) => submitRoom(data)}
                roomCapacity={roomCapacity}
                roomName={roomName}
                setRoomCapacity={setRoomCapacity}
                setRoomName={setRoomName}
            />
            <RoomEntryTable
                headers={["Room name", "Capacity"]}
                rows={rooms}
                fetchResource={fetchRooms}
                deleteResource={removeRoom}
                submitCallback={editRoom}
            />
        </div>
    );
}

const RoomForm = ({ submit, setRoomCapacity, setRoomName, roomCapacity, roomName }) => {

    return (
        <div>
          <form>
            <input 
                type="text" 
                value={roomName} 
                placeholder="Room name"
                onInput={inputEvent => setRoomName(inputEvent.target.value)}
            />
            <input
                type="text" 
                value={roomCapacity} 
                placeholder="Capacity"
                onInput={inputEvent => setRoomCapacity(inputEvent.target.value)}
            />
          </form>
          <div className="button-container">
                <button onClick={() => submit({ name: roomName, capacity: roomCapacity })}>
             Submit
            </button>
            <button>Add another</button>
          </div>
        </div>
    )
}

const RoomEntryTable = ({ headers, rows, fetchResource, submitCallback, deleteResource }) => {

    

    return (
        <table>
            <tr>
                <th className="initial-spacing"></th>
                {headers.map(headerName => <th className="row" key={headerName}>{headerName}</th>)}
                <th></th>
                <th className="action">Edit</th>
                <th className="action">Delete</th>
            </tr>
            {rows.map(row => <RoomEntryTableRow key={row.id} id={row.id} rowData={row} removeCallback={deleteResource} submitCallback={submitCallback} />)}
        </table>
     )
    
}

const RoomEntryTableRow = ({ id, rowData, removeCallback, submitCallback }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState(rowData.name)
    const [capacity, setCapacity] = useState(rowData.capacity)

    return isEditing ? 
        (<tr>
            <td></td>
            <td><input type="text" value={name} onInput={inputEvent => setName(inputEvent.target.value)} /></td>
            <td><input type="text" value={capacity} onInput={inputEvent => setCapacity(inputEvent.target.value)} /></td>
            <td>
                <button onClick={() => {
                    submitCallback({id: id, name: name, capacity: capacity})
                    setIsEditing(false) 
                    }}
                >Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
            </td>
            <td className="action"><AiFillEdit /></td>
            <td className="action"><AiFillDelete onClick={() => removeCallback(id)}/></td>
          </tr>
        ) :
        (<tr>
            <td></td>
            <td>{name}</td>
            <td>{capacity}</td>
            <td></td>
            <td className="action"><AiFillEdit onClick={() => setIsEditing(true)}/></td>
            <td className="action"><AiFillDelete onClick={() => removeCallback(id)}/></td>
        </tr>)
}

export default Rooms;
