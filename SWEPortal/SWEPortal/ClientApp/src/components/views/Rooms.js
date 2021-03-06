import { useState, useEffect } from 'react'
import './base.css'
import { ErrorMessages, FormHeader } from './Shared.js'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import Modal from '../Modal/Modal'
import apiBuilder from '../../api/api'

const api = apiBuilder("rooms")

const validateRoom = (room) => {
    const { name, capacity } = room
    let errors = []

    if (name === "" || name === null) {
        errors.push({ message: "Name cannot be null" })
    }

    const isInt = /^\+?\d+$/.test(capacity);
    if (!isInt) {
        errors.push({ message: "Capacity must be a positive integer" })
    }

    return errors 
}

const Rooms = () => {
    const [rooms, setRooms] = useState([])
    const [errors, setErrors] = useState([])
    const [roomName, setRoomName] = useState("")
    const [roomCapacity, setRoomCapacity] = useState("")

    const fetchRooms = () => {
        api.getAll()
            .then(response => setRooms(response.data))
    }

    const submitRoom = (room) => {
        const result = validateRoom(room)
        setErrors(result)
        if (result.length == 0) {
            api.create(room).then(response => {
                fetchRooms()
                setRoomName("")
                setRoomCapacity("")
            })
        }
    }

    const editRoom = (room) => {
        const messages = validateRoom(room)

        setErrors(messages)
        if (messages.length === 0) {
            api.update(room).then(response => {
                fetchRooms()
            })
            return true;
        }

        return false;
        
    }

    const removeRoom = (id) => {
        api.delete(id).then(response => fetchRooms())
    }

    useEffect(() => {
        fetchRooms()
    })

    return (
        <>
        <div className="container">
            <ErrorMessages errors={errors} />
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
        </>
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
          </div>
        </div>
    )
}

const RoomEntryTable = ({ headers, rows, submitCallback, deleteResource }) => {

    

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
    const [isModalVisible, setIsModalVisible] = useState(false)

    if (isEditing) {
        return (
            <>
            <Modal isVisible={isModalVisible} setVisible={setIsModalVisible} deleteCallback={() => removeCallback(id)} />
            <tr>
            <td></td>
            <td><input type="text" value={name} onInput={inputEvent => setName(inputEvent.target.value)} /></td>
            <td><input type="text" value={capacity} onInput={inputEvent => setCapacity(inputEvent.target.value)} /></td>
            <td>
                <button onClick={() => {
                    const success = submitCallback({id: id, name: name, capacity: capacity})
                    if (success) {
                        setIsEditing(false) 
                    }
                    }}
                >Save</button>
                <button onClick={() => {setName(rowData.name); setCapacity(rowData.capacity); setIsEditing(false)}}>Cancel</button>
            </td>
            <td className="action"><AiFillEdit /></td>
            <td className="action"><AiFillDelete onClick={() => setIsModalVisible(true)}/></td>
          </tr>
          </>)
    }

    return (
        <>
            <Modal isVisible={isModalVisible} setVisible={() => setIsModalVisible(false)} deleteCallback={() => removeCallback(id)} />
            <tr>
            <td></td>
            <td>{name}</td>
            <td>{capacity}</td>
            <td></td>
            <td className="action"><AiFillEdit onClick={() => setIsEditing(true)}/></td>
            <td className="action"><AiFillDelete onClick={() => setIsModalVisible(true)}/></td>
        </tr>
        </>)
}

export default Rooms;