import { useState, useEffect } from 'react'
import './base.css'
import { EntryTable, ErrorMessages, FormHeader } from './Shared.js'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import apiBuilder from '../../api/api'
import Modal from '../Modal/Modal'


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
    const [sessionTimeSlot, setSessionTimeSlot] = useState("")
    const [sessionSpeaker, setSessionSpeaker] = useState([])

    const [errors, setErrors] = useState([])

    const validateSession = (session) => {
        const messages = []

        if (session.name === "") {
            messages.push({ message: "Name cannot be empty" })
        }

        const roomConflicts = sessions.filter(s => s.id !== session.id && s.timeSlotId === session.timeSlotId && s.roomId === session.roomId)

        if (roomConflicts.length != 0) {
            messages.push({ message: `Conflicting room, already booked for the selected time in session:  ${roomConflicts[0].name}`})
        }

        const speakerConflict = sessions.filter(s => s.id !== session.id && s.timeSlotId === session.timeSlotId && s.speakerId === session.speakerId)

        if (speakerConflict.length != 0) {
            messages.push({ message: `Conflicting speaker, already booked for the selected time in session : ${roomConflicts[0].name}`})
        }
        console.log(messages)
        return messages
    }

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

    const submitSession = (session) => {
        const messages = validateSession(session)

        setErrors(messages)
        if (messages.length === 0) {
            api.create(session).then(response => {
                fetchSessions()
                setSessionName("")
                setSessionRoom({})
                setSessionTimeSlot("")
                setSessionSpeaker({})
            })
        }
        
    }

    const editSession = (session) => {
        const messages = validateSession(session)

        setErrors(messages)

        if (messages.length === 0) {
            api.update(session).then(response => {
                fetchSessions()
            })
            return true;
        }

        return false
        
    }

    const removeSession = (id) => {
        api.delete(id).then(response => fetchSessions())
    }

    useEffect(() => {
        fetchInitialData()
    }, [])

    return (
        <div className="container">
            <ErrorMessages errors={errors} />
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
                value={sessionTimeSlot.id ? sessionTimeSlot.id : ""} 
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
    const [isModalVisible, setIsModalVisible] = useState(false)


    if (isEditing) {
        return (<>
            <Modal isVisible={isModalVisible} setVisible={() => setIsModalVisible(false)} deleteCallback={() => removeCallback(id)} />
            <tr>
            <td></td>
            <td><input type="text" value={name} onInput={inputEvent => setName(inputEvent.target.value)} /></td>
            <td>
                <select
                    value={room.id} 
                    onChange={inputEvent => setRoom(rooms.find(r => r.id == inputEvent.target.value))}
                >
                    {rooms.map(room => <option value={room.id}>{room.name}</option>)}
                </select>
            </td>
            <td>
                <select
                    value={speaker.id} 
                    onChange={inputEvent => setSpeaker(speakers.find(r => r.id == inputEvent.target.value))}
                >   
                    {speakers.map(speaker => <option value={speaker.id}>{speaker.name}</option>)}
                </select> 
            </td>
            <td>
                <select
                    value={timeSlot.id} 
                    onChange={inputEvent => setTimeSlot(timeSlots.find(ts => ts.id === inputEvent.target.value))}
                >
                    {timeSlots.map(timeSlot => <option value={timeSlot.id}>{`${toTime(timeSlot.startTime)}-${toTime(timeSlot.endTime)}`}</option>)}
                </select>
            </td>
            <td>
                <button onClick={() => {
                    const success = submitCallback({ id: id, name: name, timeSlotId: timeSlot.id, roomId: room.id, speakerId: speaker.id })
                    if (success) {
                        setIsEditing(false) 
                    }
                    }}
                >Save</button>
                <button onClick={() => {
                    setName(rowData.name)
                    setRoom(rooms && rooms.find(r => r.id == rowData.roomId) || {})
                    setSpeaker(speakers && speakers.find(s => s.id == rowData.speakerId) || {})
                    setTimeSlot(timeSlots && timeSlots.find(t => t.id == rowData.timeSlotId) || {})
                    setIsEditing(false)
                }}>Cancel</button>
            </td>
            <td className="action"><AiFillEdit /></td>
            <td className="action"><AiFillDelete onClick={() => setIsModalVisible(true)}/></td>
          </tr>
        </>)
    }
        
     return (<>
        <Modal isVisible={isModalVisible} setVisible={() => setIsModalVisible(false)} deleteCallback={() => removeCallback(id)} />
        <tr>
            <td></td>
            <td>{name}</td>
            <td>{room.name}</td>
            <td>{speaker.name}</td>
            <td>{`${toTime(timeSlot.startTime)}-${toTime(timeSlot.endTime)}`}</td>
            <td></td>
            <td className="action"><AiFillEdit onClick={() => setIsEditing(true)}/></td>
            <td className="action"><AiFillDelete onClick={() => setIsModalVisible(true)}/></td>
        </tr>
    </>)
}

export default Sessions 
