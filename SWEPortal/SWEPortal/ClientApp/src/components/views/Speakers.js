import { useState, useEffect } from 'react'
import './base.css'
import { EntryTable, FormHeader } from './Shared.js'

const Speakers = () => {
    const [speakers, setSpeakers] = useState([
        { name: "Arnold Schwarzenegger", number: "202-555-0125", email: "theterminator47@gmail.com" },
        { name: "Sylvester Stalone", number: "202-565-0124", email: "rambo4life@outlook.com" },
        { name: "Bruce Willis", number: "202-582-0144", email: "diehardisachristmasmovie@aol.com" },
        { name: "Steve McQueen", number: "202-673-0234", email: "thegreatescape@yahoo.com" }
    ])


    return (
        <div className="container">
            <FormHeader name="Speakers" />
            <SpeakerForm />
            <EntryTable
                headers={["Speaker Name", "Contact Number", "Email Address"]}
                rows={speakers}

            />

        </div>

    );


}

const SpeakerForm = () => {


    const [speakerName, setSpeakerName] = useState("")
    const [speakerEmail, setSpeakerEmail] = useState("")
    const [speakerNum, setSpeakerNum] = useState("")


    return (
        <div>
            <form>
                <input
                    type="text"
                    value={speakerName}
                    placeholder="Speaker Name"
                    onInput={inputEvent => setSpeakerName(inputEvent.target.value)}
                />
                <input
                    type="text"
                    value={speakerNum}
                    placeholder="Contact Number"
                    onInput={inputEvent => setSpeakerNum(inputEvent.target.value)}
                />
                <input
                    type="text"
                    value={speakerEmail}
                    placeholder="Email Address"
                    onInput={inputEvent => setSpeakerEmail(inputEvent.target.value)}
                />
            </form><div className="button-container">
                <button>Submit</button>
                <button>Add another</button>
            </div>


        </div>
         
        )

}


export default Speakers
