import { useState, useEffect } from 'react'
import './base.css'
import { EntryTable, ErrorMessages, FormHeader } from './Shared.js'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import apiBuilder from '../../api/api'

const api = apiBuilder("sessioncount")
const sessionsApi = apiBuilder("sessions")

const format = {
    hour: 'numeric',
    minute: 'numeric',
}

const validateCount = ({ count }) => {
    const messages = []

    const isInt = /^\+?\d+$/.test(count);
    if (!isInt) {
        messages.push({ message: "Count must be a positive integer" })
    }

    return messages
}

const indexToCount = [
    "Start Count",
    "Middle Count",
    "End Count"
]

const Counts = () => {
    const [sessions, setSessions] = useState([])
    const [counts, setCounts] = useState([])

    const [count, setCount] = useState("")

    const [selectedSession, setSelectedSession] = useState("")

    const [errors, setErrors] = useState([])

    const fetchInitialData = () => {
        sessionsApi.getAll().then(response => {
            setSessions(response.data)
        })
    }

    const fetchCountsForSession = (id) => {
        api.get(id)
            .then(response => setCounts(response.data))
    }

    const submitCountsForSession = (session) => {
        const messages = validateCount(session)

        setErrors(messages)
        console.log(session)
        if (messages.length === 0) {
            api.create(session).then(response => {
                fetchCountsForSession(selectedSession)
                setCount("")
            })
        }
    }

    const editCountsForSession = (count) => {
        api.update(count).then(response => {
            fetchCountsForSession(selectedSession)
        })
    }

    useEffect(() => {
        fetchInitialData()
    }, [])

    return (
        <div className="container">
            <FormHeader name="Counts" />
            <select 
                className="count-select" 
                value={selectedSession.id}
                onChange={e => {
                    setSelectedSession(e.target.value)
                    fetchCountsForSession(e.target.value)
                }}
            >
                <option value="">Select Session</option>
                {sessions.map(s => <option value={s.id}>{s.name}</option>)}
            </select>

            {counts.length < 3 && selectedSession != "" ?
            (<div>
                <form className="counts">
                    <input 
                        type="text" 
                        placeholder={`${indexToCount[counts.length]}`}
                        value={count}
                        onInput={e => setCount(e.target.value)}
                    />
                </form>

                <button
                    onClick={() => submitCountsForSession({ type: counts.length, sessionId: selectedSession, count: count})}
                >
                Submit
                </button></div>)
            : null}


            {counts.length > 0 ?
                <CountEntryTable
                    headers={["Counted At", "Count"]}
                    rows={counts}
                    submitCallback={editCountsForSession}
                /> : null
            }
            
        </div>
    )
}

const CountEntryTable = ({ headers, rows, submitCallback }) => {

    return (
        <table>
            <tr>
                <th className="initial-spacing"></th>
                {headers.map(headerName => <th className="row" key={headerName}>{headerName}</th>)}
                <th></th>
                <th className="action">Edit</th>
            </tr>
            {rows.map((row, index) => <CountEntryTableRow key={row.id} id={row.id} rowData={row} index={index} submitCallback={submitCallback} />)}
        </table>
     )
}
    
const CountEntryTableRow = ({ id, rowData, index, submitCallback }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [count, setCount] = useState(rowData.count)

    return isEditing ? 
        (<tr>
            <td></td>
            <td>{indexToCount[index]}</td>
            <td><input type="text" value={count} onInput={inputEvent => setCount(inputEvent.target.value)} /></td>
            <td>
                <button onClick={() => {
                    submitCallback({id: id, type: rowData.type, count: count, sessionId: rowData.sessionId })
                    setIsEditing(false) 
                    }}
                >Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
            </td>
            <td className="action"><AiFillEdit /></td>
          </tr>
        ) :
        (<tr>
            <td></td>
            <td>{indexToCount[index]}</td>
            <td>{count}</td>
            <td></td>
            <td className="action"><AiFillEdit onClick={() => setIsEditing(true)}/></td>
        </tr>)
    
}

export default Counts