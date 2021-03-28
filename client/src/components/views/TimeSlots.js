import { useState, useEffect } from 'react'
import './base.css'
import { EntryTable, FormHeader } from './Shared.js'

const TimeSlots = () => {
    const [times, setTimes] = useState([
        {start: "9:30 AM", end: "10:00 AM", duration:"30 Minutes" }, 
        {start: "10:00 AM", end: "11:00 AM", duration:"60 Minutes" }, 
        {start: "11:00 AM", end: "12:00 PM", duration:"60 Minutes" },  
        {start: "12:00 PM", end: "12:30 PM", duration:"30 Minutes" }
    ])
    
    return (
        <div className="container">
            <FormHeader name="Time Slots"/>
            <TimeSlotsForm />
            <EntryTable
                headers={["Start Time", "End Time", "Duration"]}
                rows={times}
            />
        </div>
    )
}

const TimeSlotsForm = () => {

    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")

    return (
        <div>
          <form>
            <input 
                type="text" 
                value={startTime} 
                placeholder="Start Time"
                onInput={inputEvent => setStartTime(inputEvent.target.value)}
            />
            <input
                type="text" 
                value={endTime} 
                placeholder="End Time"
                onInput={inputEvent => setEndTime(inputEvent.target.value)}
            />
          </form>
          <div className="button-container">
            <button>Submit</button>
            <button>Add another</button>
          </div>
            
        </div>
    )
}


export default TimeSlots