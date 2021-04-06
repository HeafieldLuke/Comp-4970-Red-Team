import { useState, useEffect } from 'react'
import './base.css'
import { EntryTable, FormHeader } from './Shared.js'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import apiBuilder from '../../api/rooms'

const api = apiBuilder('speakers')

const Speakers = () => {
    const [speakers, setSpeakers] = useState([])
    const [speakerName, setSpeakerName] = useState("")
    const [speakerPhoneNumber, setSpeakerPhoneNumber] = useState("")
    const [speakerEmail, setSpeakerEmail] = useState("")

    const fetchSpeakers = () => {
        api.getAll()
            .then(response => setSpeakers(response.data))
    }

    const submitSpeakers = (room) => {
        api.create(room).then(response => {
            fetchSpeakers()
            setSpeakerName("")
            setSpeakerPhoneNumber("")
            setSpeakerEmail("")
        })
    }

    const editSpeaker = (room) => {
        api.update(room).then(response => {
            fetchSpeakers()
        })
    }

    const removeSpeaker = (id) => {
        api.delete(id).then(response => fetchSpeakers)
    }

    useEffect(() => {
        fetchSpeakers()
    })

    return (
        <div className="container">
            <FormHeader name="Speakers"/>
            <SpeakerForm 
                submit={(data) => submitSpeakers(data)}
                speakerPhoneNumber={speakerPhoneNumber}
                speakerName={speakerName}
                speakerEmail={speakerEmail}
                setSpeakerPhoneNumber={setSpeakerPhoneNumber}
                setSpeakerName={setSpeakerName}
                setSpeakerEmail={setSpeakerEmail}
            />
            <SpeakerEntryTable
                headers={["Speaker Name", "Contact Number", "Email Address"]}
                rows={speakers}
                fetchResource={fetchSpeakers}
                deleteResource={removeSpeaker}
                submitCallback={editSpeaker}
            />
        </div>
    );
}

const SpeakerForm = ({ submit, setSpeakerPhoneNumber, setSpeakerName, setSpeakerEmail, speakerName, speakerPhoneNumber, speakerEmail }) => {

    return (
        <div>
          <form>
            <input 
                type="text" 
                value={speakerName} 
                placeholder="Speaker name"
                onInput={inputEvent => setSpeakerName(inputEvent.target.value)}
            />
            <input
                type="text" 
                value={speakerPhoneNumber} 
                placeholder="Contact Number"
                onInput={inputEvent => setSpeakerPhoneNumber(inputEvent.target.value)}
            />
            <input
                type="text" 
                value={speakerEmail} 
                placeholder="Email Address"
                onInput={inputEvent => setSpeakerEmail(inputEvent.target.value)}
            />
          </form>
          <div className="button-container">
                <button onClick={() => submit({ name: speakerName, phoneNumber: speakerPhoneNumber, email: speakerEmail })}>
             Submit
            </button>
            <button>Add another</button>
          </div>
        </div>
    )
}

const SpeakerEntryTable = ({ headers, rows, fetchResource, submitCallback, deleteResource }) => {

    

    return (
        <table>
            <tr>
                <th className="initial-spacing"></th>
                {headers.map(headerName => <th className="row">{headerName}</th>)}
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
    const [phoneNumber, setPhoneNumber] = useState(rowData.phoneNumber)
    const [email, setEmail] = useState(rowData.email)

    return isEditing ? 
        (<tr>
            <td></td>
            <td><input type="text" value={name} onInput={inputEvent => setName(inputEvent.target.value)} /></td>
            <td><input type="text" value={phoneNumber} onInput={inputEvent => setPhoneNumber(inputEvent.target.value)} /></td>
            <td><input type="text" value={email} onInput={inputEvent => setEmail(inputEvent.target.value)} /></td>
            <td>
                <button onClick={() => {
                    submitCallback({id: id, name: name, phoneNumber: phoneNumber, email: email})
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
            <td>{phoneNumber}</td>
            <td>{email}</td>
            <td></td>
            <td className="action"><AiFillEdit onClick={() => setIsEditing(true)}/></td>
            <td className="action"><AiFillDelete onClick={() => removeCallback(id)}/></td>
        </tr>)
}


export default Speakers
