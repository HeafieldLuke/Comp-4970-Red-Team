import './rooms.css'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

const Rooms = () => {

    return (
        <div className="container">
            <FormHeader name="Rooms"/>
            <RoomForm />
            <RoomTable />
        </div>
    );
}

const FormHeader = ({ name }) => (
    <div>
        <h2>{name}</h2>
        <hr />
    </div>
    
)

const RoomForm = () => {

    return (
        <div>
          <form>
            <input type="text"></input>
            <input type="text"></input>
          </form>
          <div className="button-container">
            <button>Submit</button>
            <button>Add another</button>
          </div>
            
        </div>
    )
}

const RoomTable = () => {

    return (
        <table>
            <tr>
                <th className="initial-spacing"></th>
                <th className="row">Room name</th>
                <th className="row">Capacity</th>
                <th></th>
                <th className="action"></th>
            </tr>
            

            <tr>
                <td></td>
                <td>A Room</td>
                <td>100</td>
                <td></td>
                <td className="icons">
                    <AiFillEdit />
                    <AiFillDelete />
                </td>
            </tr>
            <tr>
                <td></td>
                <td>A New Room</td>
                <td>100</td>
                <td></td>
                <td className="icons">
                    <AiFillEdit />
                    <AiFillDelete />
                </td>
            </tr>
            <tr>
                <td></td>
                <td>A Different Room</td>
                <td>100</td>
                <td></td>
                <td className="icons">
                    <AiFillEdit />
                    <AiFillDelete />
                </td>
            </tr>
            <tr>
                <td></td>
                <td>A Very Cool Room</td>
                <td>100</td>
                <td></td>
                <td className="icons">
                    <AiFillEdit />
                    <AiFillDelete />
                </td>
            </tr>
        </table>
    )
}

export default Rooms;