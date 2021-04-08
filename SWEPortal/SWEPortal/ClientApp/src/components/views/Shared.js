import './base.css'
import { useState } from 'react'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import api from '../../api/api'

const FormHeader = ({ name }) => (
    <div>
        <h2>{name}</h2>
        <hr />
    </div>
)

const EntryTable = ({ headers, rows, fetchResource, submitResource, deleteResource }) => {

    

    return (
        <table>
            <tr>
                <th className="initial-spacing"></th>
                {headers.map(headerName => <th className="row">{headerName}</th>)}
                <th></th>
                <th className="action">Edit</th>
                <th className="action">Delete</th>
            </tr>
            {rows.map(row => <EntryTableRow key={row.id} id={row.id} rowData={Object.values(row)} removeCallback={deleteResource} />)}
        </table>
     )
    
}

const EntryTableRow = ({ id, rowData, removeCallback, submitResource }) => {
    const [isEditing, setIsEditing] = useState(true)

    return isEditing ? 
        (<tr>
            <td></td>
            {rowData.map(value => <td><input type="text" value={value} /></td>)}
            <td></td>
            <td className="action"><AiFillEdit /></td>
            <td className="action"><AiFillDelete onClick={() => removeCallback(id)}/></td>
          </tr>
        ) :
        (<tr>
            <td></td>
            {rowData.map(value => <td>{value}</td>)}
            <td></td>
            <td className="action"><AiFillEdit /></td>
            <td className="action"><AiFillDelete onClick={() => removeCallback(id)}/></td>
        </tr>)

        
    
}

export { EntryTable, FormHeader };
