import 'base.css'

const FormHeader = ({ name }) => (
    <div>
        <h2>{name}</h2>
        <hr />
    </div>
)

const EntryTable = ({ headers, rows }) => (
    <table>
        <tr>
            <th className="initial-spacing"></th>
            {headers.map(headerName => <th className="row">{headerName}</th>)}
            <th></th>
            <th className="action">Edit</th>
            <th className="action">Delete</th>
        </tr>
        {rows.map(row => <EntryTableRow rowData={Object.values(row)} />)}
    </table>
)

const EntryTableRow = ({ rowData }) => (
    <tr>
        <td></td>
        {rowData.map(value => <td>{value}</td>)}
        <td></td>
        <td className="action"><AiFillEdit /></td>
        <td className="action"><AiFillDelete /></td>
    </tr>
)

export { EntryTable, FormHeader };
