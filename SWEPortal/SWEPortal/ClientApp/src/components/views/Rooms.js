import { useState, useEffect } from 'react'
import './base.css'
import { EntryTable, FormHeader } from './Shared.js'

const Rooms = () => {        
    const [rooms, setRooms] = useState([
        {name: "A Room", capacity: 100, id: 1}, 
        {name: "A New Room", capacity: 100, id: 1},
        {name: "A different Room", capacity: 100, id: 2},
        {name: "A Very Cool Room", capacity: 100, id: 3}
    ])

    return (
        <div className="container">
            <FormHeader name="Rooms"/>
            <RoomForm />
            <EntryTable
                headers={["Room name", "Capacity", "Capacity"]}
                rows={rooms}
            />
        </div>
    );
}

const RoomForm = () => {

    const [roomName, setRoomName] = useState("")
    const [roomCapacity, setRoomCapacity] = useState("")

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
            <button>Submit</button>
            <button>Add another</button>
          </div>
            
        </div>
    )
}

export default Rooms;
