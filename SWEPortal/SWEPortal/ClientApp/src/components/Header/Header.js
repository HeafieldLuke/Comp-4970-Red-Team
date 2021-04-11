import './header.css'
import { Link } from 'react-router-dom'
const Header = () => {

    return (
        <ul>
            <li><Link to="/rooms">Rooms</Link></li>
            <li><Link to="/speakers">Speakers</Link></li>
            <li><Link to="/time-slots">Time Slots</Link></li>
            <li><Link to="/sessions">Sessions</Link></li>
            <li><Link to="/counts">Counts</Link></li>
        </ul>
    );
}

export default Header;