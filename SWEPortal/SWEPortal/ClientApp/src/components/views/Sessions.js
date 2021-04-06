import { useState, useEffect } from 'react'
import './base.css'
import { EntryTable, FormHeader } from './Shared.js'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import apiBuilder from '../../api/rooms'

const api = apiBuilder("sessions")
const roomApi = apiBuilder("rooms")
const speakerApi = apiBuilder("speakers")
const timeSlotApi = apiBuilder("timeslots")

const format = {
    hour: 'numeric',
    minute: 'numeric',
}

const toTime = (time) => {
    let d = new Date(time)
    d.setHours(d.getHours() - 4)

    return d.toLocaleTimeString('en-US',format)
}

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
        
        const roomPromise = roomApi.getAll()
        const speakerPromise = speakerApi.getAll()
        const timeSlotPromise = timeSlotApi.getAll()
        const sessionPromise = api.getAll()

        Promise.all([roomPromise, speakerPromise, timeSlotPromise, sessionPromise]).then(response => {
            setRooms(response[0].data)
            setSpeakers(response[1].data)
            setTimeSlots(response[2].data)
            setSessions(response[3].data)
        })
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
    }, [])

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
                rooms={rooms}
                timeSlots={timeSlots}
                speakers={speakers}
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
                value={sessionName} 
                placeholder="Session"
                onInput={inputEvent => setSessionName(inputEvent.target.value)}
            />
            <select
                value={sessionRoom} 
                onChange={inputEvent => setSessionRoom(inputEvent.target.value)}
            >
                <option value="">Select a Room</option>
                {rooms.map(room => <option value={room.id}>{room.name}</option>)}
            </select>

            <select
                value={sessionSpeaker} 
                onChange={inputEvent => setSessionSpeaker(inputEvent.target.value)}
            >   
                <option value="">Select a Speaker</option>
                {speakers.map(speaker => <option value={speaker.id}>{speaker.name}</option>)}
            </select> 

            <select
                value={sessionTimeSlot.id} 
                onChange={inputEvent => setSessionTimeSlot(inputEvent.target.value)}
            >
                <option value="">Select a Time Slot</option>
                {timeSlots.map(timeSlot => <option value={timeSlot.id}>{`${toTime(timeSlot.startTime)}-${toTime(timeSlot.endTime)}`}</option>)}
            </select>

          </form>
          <div className="button-container">
                <button onClick={() => submit({ name: sessionName, timeSlotId: sessionTimeSlot, roomId: sessionRoom, speakerId: sessionSpeaker })}>
             Submit
            </button>
            <button>Add another</button>
          </div>
        </div>
    )
}

const SessionEntryTable = ({ headers, rows, fetchResource, submitCallback, deleteResource, rooms, speakers, timeSlots }) => {

    return (
        <table>
            <tr>
                <th className="initial-spacing"></th>
                {headers.map(headerName => <th className="row">{headerName}</th>)}
                <th></th>
                <th className="action">Edit</th>
                <th className="action">Delete</th>
            </tr>
            {rows.map(row => (<SessionEntryTableRow 
                                key={row.id} 
                                id={row.id} 
                                rowData={row} 
                                removeCallback={deleteResource} 
                                submitCallback={submitCallback}
                                rooms={rooms}
                                speakers={speakers}
                                timeSlots={timeSlots}
            />
            ))}
        </table>
     )
    
}

const SessionEntryTableRow = ({ id, rowData, removeCallback, submitCallback, rooms, speakers, timeSlots }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState(rowData.name)
    const [room, setRoom] = useState(rooms && rooms.find(r => r.id == rowData.roomId) || {})
    const [speaker, setSpeaker] = useState(speakers && speakers.find(s => s.id == rowData.speakerId) || {})
    const [timeSlot, setTimeSlot] = useState(timeSlots && timeSlots.find(t => t.id == rowData.timeSlotId) || {})

    return isEditing ? 
        (<tr>
            <td></td>
            <td><input type="text" value={name} onInput={inputEvent => setName(inputEvent.target.value)} /></td>
            <td>
                <select
                    value={room.id} 
                    onChange={inputEvent => setRoom(rooms.find(r => r.id == inputEvent.target.value))}
                >
                    <option value="">Select a Room</option>
                    {rooms.map(room => <option value={room.id}>{room.name}</option>)}
                </select>
            </td>
            <td>
                <select
                    value={speaker.id} 
                    onChange={inputEvent => setSpeaker(speakers.find(r => r.id == inputEvent.target.value))}
                >   
                    <option value="">Select a Speaker</option>
                    {speakers.map(speaker => <option value={speaker.id}>{speaker.name}</option>)}
                </select> 
            </td>
            <td>
                <select
                    value={timeSlot.id} 
                    onChange={inputEvent => setTimeSlot(timeSlots.find(ts => ts.id === inputEvent.target.value))}
                >
                    <option value="">Select a Time Slot</option>
                    {timeSlots.map(timeSlot => <option value={timeSlot.id}>{`${toTime(timeSlot.startTime)}-${toTime(timeSlot.endTime)}`}</option>)}
                </select>
            </td>
            <td>
                <button onClick={() => {
                    submitCallback({ id: id, name: name, timeSlotId: timeSlot.id, roomId: room.id, speakerId: speaker.id })
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
            <td>{room.name}</td>
            <td>{speaker.name}</td>
            <td>{`${toTime(timeSlot.startTime)}-${toTime(timeSlot.endTime)}`}</td>
            <td></td>
            <td className="action"><AiFillEdit onClick={() => setIsEditing(true)}/></td>
            <td className="action"><AiFillDelete onClick={() => removeCallback(id)}/></td>
        </tr>)
}

export default Sessions 
