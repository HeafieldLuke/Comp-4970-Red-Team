import { useState, useEffect } from 'react'
import './base.css'
import { EntryTable, ErrorMessages, FormHeader } from './Shared.js'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import apiBuilder from '../../api/api'
import Modal from '../Modal/Modal'

const api = apiBuilder("timeslots")

const toJsonString = (d) => new Date(d).toJSON()

const format = {
    hour: 'numeric',
    minute: 'numeric',
}

const validateTimeSlots = (timeSlot) => {
    const { startTime, endTime } = timeSlot

    let errors = []
    if (Object.keys(startTime).length === 0) {
        errors.push({ message: "Start time cannot be empty"})
    }

    if (Object.keys(endTime).length === 0) {
        errors.push({ message: "End time cannot be empty"})
    }
    
    if (errors.length > 0) return errors

    const start = getMinutes(startTime)
    const end = getMinutes(endTime)

    if (start === end) {
        errors.push({ message: "Start and end cannot be the same" })
    }

    if (start > end) {
        errors.push({ message: "Start time must be before end time" })
    }

    return errors
}

const toTime = (time) => {
    let d = new Date(time)
    d.setHours(d.getHours() - (d.getTimezoneOffset() / 60))
    return (d.toLocaleTimeString('en', format))
}

const getMinutes = (time) => {
    let d = new Date(time)
    return d.getMinutes() + (d.getHours() * 60)
}

const getTimeRange = (interval) => {
        const ranges = [];
        const date = new Date();
    
        for (let minutes = 0; minutes < 24 * 60; minutes = minutes + interval) {
            date.setHours(0);
            date.setMinutes(minutes);
            ranges.push({ label: date.toLocaleTimeString('en', format), value: new Date(date)});
        }
    
        return ranges;
}

const TimeSlots = () => {
    const [timeSlots, setTimeSlots] = useState([])
    const [startTime, setStartTime] = useState({})
    const [endTime, setEndTime] = useState({})
    const [errors, setErrors] = useState([])

    const fetchTimeSlots = () => {
        api.getAll()
            .then(response => setTimeSlots(response.data))
    }

    const submitTimeSlot = (timeSlot) => {
        const messages = validateTimeSlots(timeSlot)
        setErrors(messages)
        if (messages.length === 0) {
            const stringTimes = { startTime: toJsonString(timeSlot.startTime), endTime: toJsonString(timeSlot.endTime)}
            api.create(stringTimes).then(response => {
                fetchTimeSlots()
                setStartTime({})
                setEndTime({})
            })
        }
    }

    const editTimeSlot = (timeSlot) => {
        const messages = validateTimeSlots(timeSlot)

        setErrors(messages)
        if (messages.length === 0) {
            api.update(timeSlot).then(response => {
                fetchTimeSlots()
            })
            return true
        }
        return false

        
    }

    const removeTimeSlot = (id) => {
        api.delete(id).then(response => fetchTimeSlots())
    }

    useEffect(() => {
        fetchTimeSlots()
    }, [ setTimeSlots ])

    return (
        <div className="container">
            <ErrorMessages errors={errors} />
            <FormHeader name="Time Slots"/>
            <TimeSlotForm 
                submit={(data) => submitTimeSlot(data)}
                startTime={startTime}
                endTime={endTime}
                setStartTime={setStartTime}
                setEndTime={setEndTime}
            />
            <TimeSlotEntryTable
                headers={["Start Time", "End Time"]}
                rows={timeSlots}
                fetchResource={fetchTimeSlots}
                deleteResource={removeTimeSlot}
                submitCallback={editTimeSlot}
            />
        </div>
    );
}

const TimeSlotForm = ({ submit, setStartTime, setEndTime, startTime, endTime }) => {

    return (
        <div>
          <form> 
            <select
                value={Object.keys(startTime).length !== 0 ? startTime.value : ""} 
                onChange={event => setStartTime(event.target.value)}
            >
                <option value="">Start Time</option>
                {getTimeRange(30).map(time => <option key={time.label} value={time.value}>{time.label}</option>)}
            </select>
            <select
                value={Object.keys(endTime).length !== 0 ? endTime.value : ""} 
                onChange={inputEvent => setEndTime(inputEvent.target.value)}
            >
                <option value="">End Time</option>
                {getTimeRange(30).map(time => <option key={time.label} value={time.value}>{time.label}</option>)}
            </select>
          </form>
          <div className="button-container">
                <button onClick={() => submit({ startTime: startTime, endTime: endTime })}>
             Submit
            </button>
          </div>
        </div>
    )
}

const TimeSlotEntryTable = ({ headers, rows, fetchResource, submitCallback, deleteResource }) => {
    return (
        <table>
            <tr>
                <th className="initial-spacing"></th>
                {headers.map(headerName => <th className="row">{headerName}</th>)}
                <th></th>
                <th className="action">Edit</th>
                <th className="action">Delete</th>
            </tr>
            {rows.map(row => <TimeSlotEntryTableRow key={row.id} id={row.id} rowData={row} removeCallback={deleteResource} submitCallback={submitCallback} />)}
        </table>
     )
    
}

const TimeSlotEntryTableRow = ({ id, rowData, removeCallback, submitCallback }) => {
    const range = getTimeRange(30)

    const [isEditing, setIsEditing] = useState(false)
    const [start, setStart] = useState(range.find(r => r.label === toTime(rowData.startTime)))
    const [end, setEnd] = useState(range.find(r => r.label == toTime(rowData.endTime)))
    const [isModalVisible, setIsModalVisible] = useState(false)
    
    if (isEditing) {
        return (<>
            <Modal isVisible={isModalVisible} setVisible={() => setIsModalVisible(false)} deleteCallback={() => removeCallback(id)} />
            <tr>
            <td></td>
            <td>
                <select
                    value={start.label} 
                    onChange={inputEvent => setStart(range.find(r => r.label == inputEvent.target.value))}
                >
                    {range.map(time => <option key={time.label} value={time.label}>{time.label}</option>)}
                </select>
            </td>
            <td>
                <select
                    value={end.label} 
                    onChange={inputEvent => setEnd(range.find(r => r.label == inputEvent.target.value))}
                >
                    {range.map(time => <option key={time.label} value={time.label}>{time.label}</option>)}
                </select>
            </td>
            <td>
                <button onClick={() => {
                    const success = submitCallback({id: id, startTime: toJsonString(start.value), endTime: toJsonString(end.value)})
                    if (success) {
                        setIsEditing(false) 
                    }
                    }}
                >Save</button>
                <button onClick={() => {
                    setStart(range.find(r => r.label === toTime(rowData.startTime)))
                    setEnd(range.find(r => r.label == toTime(rowData.endTime)))
                    setIsEditing(false)}
                }>Cancel</button>
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
            <td>{start.label}</td>
            <td>{end.label}</td>
            <td></td>
            <td className="action"><AiFillEdit onClick={() => setIsEditing(true)}/></td>
            <td className="action"><AiFillDelete onClick={() => setIsModalVisible(true)}/></td>
        </tr>
        </>)
}

export default TimeSlots
