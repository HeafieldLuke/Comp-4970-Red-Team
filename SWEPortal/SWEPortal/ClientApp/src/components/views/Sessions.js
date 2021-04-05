import { useState, useEffect } from 'react'
import './base.css'
import { EntryTable, FormHeader } from './Shared.js'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import apiBuilder from '../../api/rooms'

const api = apiBuilder("sessions")
const roomApi = apiBuilder("rooms")
const speakerApi = apiBuilder("speakers")
const timeSlotApi = apiBuilder("timeslots")

const Sessions = () => {
    const [sessions, setSessions] = useState([])
    const [rooms, setRooms] = useState([])
    const [timeSlots, setTimeSlots] = useState([])
    const [speakers, setSpeakers] = useState([])

    const [sessionName, setSessionName] = useState([])
    const [sessionRoom, setSessionRoom] = useState([])
    const [sessionTimeSlot, setSessionTimeSlot] = useState([])
    const [sessionSpeaker, setSessionSpeaker] = useState([])

    const fetchInitialData = () => {
        roomApi.getAll().then(response => setRooms(response.data))
        speakerApi.getAll().then(response => setSpeakers(response.data))
        timeSlotApi.getAll().then(response => setTimeSlots(response.data))
        api.getAll().then(response => setSessions(response.data))
    }

    const fetchSessions = () => {
        api.getAll()
            .then(response => setSessions(response.data))
    }

    const submitSession = (room) => {
        api.create(room).then(response => {
            fetchSessions()
            setSessionName("")
            setSessionRoom({})
            setSessionTimeSlot({})
            setSessionSpeaker({})
        })
    }

    const editSession = (room) => {
        api.update(room).then(response => {
            fetchSessions()
        })
    }

    const removeSession = (id) => {
        api.delete(id).then(response => fetchSessions)
    }

    useEffect(() => {
        fetchInitialData()
    }, setSessions, setRooms, setSpeakers, setTimeSlots)

    return (
        <div className="container">
            <FormHeader name="Session"/>
            <SessionForm 
                submit={(data) => submitSession(data)}
                sessionName={sessionName}
                sessionRoom={sessionRoom}
                sessionSpeaker={sessionSpeaker}
                sessionTimeSlot={sessionTimeSlot}
                setSessionName={setSessionName}
                setSessionRoom={setSessionRoom}
                setSessionSpeaker={setSessionSpeaker}
                setSessionTimeSlot={setSessionTimeSlot}
                rooms={rooms}
                timeSlots={timeSlots}
                speakers={speakers}
                
            />
            <SessionEntryTable
                headers={["Session", "Room Name","Speaker","Timeslot"]}
                rows={sessions}
                fetchResource={fetchSessions}
                deleteResource={removeSession}
                submitCallback={editSession}
            />
        </div>
    );
}

const SessionForm = ({ submit, sessionName, sessionRoom, sessionSpeaker, sessionTimeSlot, setSessionName, setSessionRoom, setSessionSpeaker, setSessionTimeSlot, rooms, timeSlots, speakers }) => {

    return (
        <div>
          <form>
          <input 
                type="text" 
                value={sessionName.name} 
                placeholder="Session"
                onInput={inputEvent => setSessionName(inputEvent.target.value)}
            />
            <select
                value={sessionRoom.name} 
                onChange={inputEvent => setSessionRoom(inputEvent.target.value)}
            >
                <option value="">Select a Room</option>
                {rooms.map(room => <option value={room}>{room.name}</option>)}
            </select>

            <select
                value={sessionSpeaker} 
                onChange={inputEvent => setSessionSpeaker(inputEvent.target.value)}
            >   
                <option value="">Select a Speaker</option>
                {speakers.map(speaker => <option value={speaker}>{speaker.name}</option>)}
            </select> 

            <select
                value={sessionTimeSlot.name} 
                onChange={inputEvent => setSessionTimeSlot(inputEvent.target.value)}
            >
                <option value="">Select a Time Slot</option>
                {timeSlots.map(speaker => <option value={speaker}>{speaker.name}</option>)}
            </select>

          </form>
          <div className="button-container">
                <button onClick={() => submit({ name: sessionName, timeSlotId: sessionTimeSlot.id, roomId: sessionRoom.id, speakerId: sessionSpeaker.id })}>
             Submit
            </button>
            <button>Add another</button>
          </div>
        </div>
    )
}

const SessionEntryTable = ({ headers, rows, fetchResource, submitCallback, deleteResource, rooms, speakers, sessions }) => {

    return (
        <table>
            <tr>
                <th className="initial-spacing"></th>
                {headers.map(headerName => <th className="row">{headerName}</th>)}
                <th></th>
                <th className="action">Edit</th>
                <th className="action">Delete</th>
            </tr>
            {rows.map(row => <SessionEntryTableRow key={row.id} id={row.id} rowData={row} removeCallback={deleteResource} submitCallback={submitCallback} />)}
        </table>
     )
    
}

const SessionEntryTableRow = ({ id, rowData, removeCallback, submitCallback, rooms, speakers, sessions }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState(rowData.name)
    const [room, setRoom] = useState(rowData.roomId)
    const [speaker, setSpeaker] = useState(rowData.speakerId)
    const [timeSlot, setTimeSlot] = useState(rowData.timeSlotId)

    return isEditing ? 
        (<tr>
            <td></td>
            <td><input type="text" value={name} onInput={inputEvent => setName(inputEvent.target.value)} /></td>
            <td><input type="text" value={room} onInput={inputEvent => setRoom(inputEvent.target.value)} /></td>
            <td><input type="text" value={speaker} onInput={inputEvent => setSpeaker(inputEvent.target.value)} /></td>
            <td><input type="text" value={timeSlot} onInput={inputEvent => setTimeSlot(inputEvent.target.value)} /></td>
            <td>
                <button onClick={() => {
                    submitCallback({id: id, name: name})
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
            <td>{room}</td>
            <td></td>
            <td className="action"><AiFillEdit onClick={() => setIsEditing(true)}/></td>
            <td className="action"><AiFillDelete onClick={() => removeCallback(id)}/></td>
        </tr>)
}

export default Sessions 
