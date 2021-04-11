import { useState, useEffect } from 'react'
import './base.css'
import { EntryTable, ErrorMessages, FormHeader } from './Shared.js'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import apiBuilder from '../../api/api'

const api = apiBuilder("counts")
const sessionsApi = apiBuilder("sessions")
const roomApi = apiBuilder("rooms")
const speakerApi = apiBuilder("speakers")
const timeSlotApi = apiBuilder("timeslots")

const format = {
    hour: 'numeric',
    minute: 'numeric',
}

const validateCount = (count) => {
    const messages = []

    return messages
}

const toTime = (time) => {
    let d = new Date(time)
    d.setHours(d.getHours() - 4)

    return d.toLocaleTimeString('en-US',format)
}

const Counts = () => {
    const [sessions, setSessions] = useState([])
    const [rooms, setRooms] = useState([])
    const [timeSlots, setTimeSlots] = useState([])
    const [speakers, setSpeakers] = useState([])

    const [errors, setErrors] = useState([])

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

    const fetchCountsForSession = () => {
        api.getAll()
            .then(response => setSessions(response.data))
    }

    const submitCountsForSession = (session) => {
        const messages = validateCount(session)

        setErrors(messages)
        if (messages.length === 0) {
            api.create(session).then(response => {
                fetchCountsForSession()
            })
        }
        
    }

    const editCountsForSession = (room) => {
        api.update(room).then(response => {
            fetchCountsForSession()
        })
    }

    useEffect(() => {
        fetchInitialData()
    }, [])

    return (
        <div className="container">

        </div>
    )
}

export default Counts