import { useState, useEffect } from 'react'
import './base.css'
import { ErrorMessages, FormHeader } from './Shared.js'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import apiBuilder from '../../api/api'
import Modal from '../Modal/Modal'

const api = apiBuilder('speakers')

const isValidPhoneNumber = (phoneNumber) => /^\d{10}$/.test(phoneNumber)

const isValidEmail = (email) => /^\S+@\S+$/.test(email)

const validateSpeaker = (speaker) => {
    let errors = []

    if (speaker.name === "") {
        errors.push({ message: "Name cannot be blank" })
    }

    if (!isValidPhoneNumber(speaker.phoneNumber)) {
        errors.push({ message: "Phone number is invalid"})
    }

    if (!isValidEmail(speaker.email)) {
        errors.push({ message: "Email is invalid"})
    }

    return errors

}

const Speakers = () => {
    const [speakers, setSpeakers] = useState([])
    const [speakerName, setSpeakerName] = useState("")
    const [speakerPhoneNumber, setSpeakerPhoneNumber] = useState("")
    const [speakerEmail, setSpeakerEmail] = useState("")
    const [errors, setErrors] = useState([])

    const fetchSpeakers = () => {
        api.getAll()
            .then(response => setSpeakers(response.data))
    }

    const submitSpeakers = (speaker) => {
        const messages = validateSpeaker(speaker)
        setErrors(messages)
        if (messages.length === 0) {
            api.create(speaker).then(response => {
                fetchSpeakers()
                setSpeakerName("")
                setSpeakerPhoneNumber("")
                setSpeakerEmail("")
            })
        }
    }

    const editSpeaker = (speaker) => {
        const messages = validateSpeaker(speaker)
        setErrors(messages)

        if (messages.length === 0) {
            api.update(speaker).then(response => {
                fetchSpeakers()
            })
            return true
        }

        return false
    }

    const removeSpeaker = (id) => {
        api.delete(id).then(response => fetchSpeakers)
    }

    useEffect(() => {
        fetchSpeakers()
    })

    return (
        <div className="container">
            <ErrorMessages errors={errors} />
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
    const [isModalVisible, setIsModalVisible] = useState(false)

    if (isEditing) {
        return <>
            <Modal isVisible={isModalVisible} setVisible={() => setIsModalVisible(false)} deleteCallback={() => removeCallback(id)} />
            <tr>
            <td></td>
            <td><input type="text" value={name} onInput={inputEvent => setName(inputEvent.target.value)} /></td>
            <td><input type="text" value={phoneNumber} onInput={inputEvent => setPhoneNumber(inputEvent.target.value)} /></td>
            <td><input type="text" value={email} onInput={inputEvent => setEmail(inputEvent.target.value)} /></td>
            <td>
                <button onClick={() => {
                    const success = submitCallback({id: id, name: name, phoneNumber: phoneNumber, email: email})
                    if (success) {
                        setIsEditing(false) 
                    }
                    }}
                >Save</button>
                <button onClick={() => {
                    setName(rowData.name)
                    setPhoneNumber(rowData.phoneNumber)
                    setEmail(rowData.email)
                    setIsEditing(false)}
                }>Cancel</button>
            </td>
            <td className="action"><AiFillEdit /></td>
            <td className="action"><AiFillDelete onClick={() => setIsModalVisible(true)}/></td>
          </tr>
        </>
    }

    return (
        <>
        <Modal isVisible={isModalVisible} setVisible={() => setIsModalVisible(false)} deleteCallback={() => removeCallback(id)} />  
        <tr>
            <td></td>
            <td>{name}</td>
            <td>{phoneNumber}</td>
            <td>{email}</td>
            <td></td>
            <td className="action"><AiFillEdit onClick={() => setIsEditing(true)}/></td>
            <td className="action"><AiFillDelete onClick={() => setIsModalVisible(true)}/></td>
        </tr>
        </>)
}


export default Speakers
