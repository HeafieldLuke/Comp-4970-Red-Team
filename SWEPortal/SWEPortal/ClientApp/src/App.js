import Header from './components/Header/Header'
import Rooms from './components/views/Rooms'
import Speakers from './components/views/Speakers'
import TimeSlots from './components/views/TimeSlots'
import Sessions from './components/views/Sessions'
import Counts from './components/views/Counts'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      
      <Switch>
        <Route path="/rooms">
          <Rooms />
        </Route>
        <Route path="/speakers">
          <Speakers />
        </Route>
        <Route path="/time-slots">
          <TimeSlots />
        </Route>
        <Router path="/sessions">
          <Sessions />
        </Router>
        <Router path="/counts">
          <Counts />
        </Router>
      </Switch>
    </Router>
  );
}

export default App;
