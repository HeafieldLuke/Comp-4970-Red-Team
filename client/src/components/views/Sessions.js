import { useState, useEffect } from 'react'
import './base.css'
import { EntryTable, FormHeader } from './Shared.js'

const Sessions = () => {
    const [session,setSession] = useState([
        {session:"1",room: "cool" , speaker: "Rod",time: " 11:00 - 12:00"}, 
        {session:"2",room: "cooler" , speaker: "Luke",time: " 1:00 - 2:00"}, 
        {session:"3",room: "very cool" , speaker: "Dylan",time: " 3:00 - 4:00"}, 
        {session:"4",room: "coolest" , speaker: "Corbin",time: " 7:00 - 8:00"}
       
       
    ])

    return (
        <div className="container">
            <FormHeader name="Sessions"/>
            <SessionForm />
            <EntryTable
                headers={["Session", "Room Name","Speaker","Timeslot"]}
                rows={session}
            />
        </div>
    )
}

const SessionForm = () => {

    const [Session, setSession] = useState("")
    const [RoomName, setRoomName] = useState("")
    const [Speaker, setSpeaker] = useState("")
    const [Time, setTime] = useState("")

    return (
        <div>
          <form>
            <input 
                type="text" 
                value={Session} 
                placeholder="Session"
                onInput={inputEvent => setSession(inputEvent.target.value)}
            />
            <input
                type="text" 
                value={RoomName} 
                placeholder="Room Name"
                onInput={inputEvent => setRoomName(inputEvent.target.value)}
            />
             <input
                type="text" 
                value={Speaker} 
                placeholder="Speaker Name"
                onInput={inputEvent => setSpeaker(inputEvent.target.value)}
            />
             <input
                type="text" 
                value={Time} 
                placeholder="Time"
                onInput={inputEvent => setTime(inputEvent.target.value)}
            />
          </form>
          <div className="button-container">
            <button>Submit</button>
            <button>Add another</button>
          </div>

        </div>
    )
}



export default Sessions 
