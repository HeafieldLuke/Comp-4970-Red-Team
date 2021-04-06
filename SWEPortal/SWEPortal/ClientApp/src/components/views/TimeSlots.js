import { useState, useEffect } from 'react'
import './base.css'
import { EntryTable, FormHeader } from './Shared.js'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import apiBuilder from '../../api/rooms'

const api = apiBuilder("timeslots")

const toJsonString = (d) => new Date(d).toJSON()

const format = {
    hour: 'numeric',
    minute: 'numeric',
}


const toTime = (time) => {
    let d = new Date(time)
    d.setHours(d.getHours() - 4)
    return (d.toLocaleTimeString('en', format))
}

const toDisplayTime = (time) => {
    let d = new Date(time)
    return ({ label: d.toLocaleTimeString('en', format), value: new Date(d)})
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

    const fetchTimeSlots = () => {
        api.getAll()
            .then(response => setTimeSlots(response.data))
    }

    const submitTimeSlot = (timeSlot) => {
        console.log(timeSlot)
        api.create(timeSlot).then(response => {
            fetchTimeSlots()
            setStartTime("")
            setEndTime("")
        })
    }

    const editTimeSlot = (timeSlots) => {
        api.update(timeSlots).then(response => {
            fetchTimeSlots()
        })
    }

    const removeTimeSlot = (id) => {
        api.delete(id).then(response => fetchTimeSlots())
    }

    useEffect(() => {
        fetchTimeSlots()
    }, [ setTimeSlots ])

    return (
        <div className="container">
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
                value={startTime.value} 
                onChange={event => setStartTime(event.target.value)}
            >
                <option value="">Start Time</option>
                {getTimeRange(30).map(time => <option key={time.label} value={time.value}>{time.label}</option>)}
            </select>
            <select
                value={endTime.value} 
                onChange={inputEvent => setEndTime(inputEvent.target.value)}
            >
                <option value="">End Time</option>
                {getTimeRange(30).map(time => <option key={time.label} value={time.value}>{time.label}</option>)}
            </select>
          </form>
          <div className="button-container">
                <button onClick={() => submit({ startTime: toJsonString(startTime), endTime: toJsonString(endTime) })}>
             Submit
            </button>
            <button>Add another</button>
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
    
    return isEditing ? 
        (<tr>
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
                    submitCallback({id: id, startTime: toJsonString(start.value), endTime: toJsonString(end.value)})
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
            <td>{start.label}</td>
            <td>{end.label}</td>
            <td></td>
            <td className="action"><AiFillEdit onClick={() => setIsEditing(true)}/></td>
            <td className="action"><AiFillDelete onClick={() => removeCallback(id)}/></td>
        </tr>)
}

export default TimeSlots
