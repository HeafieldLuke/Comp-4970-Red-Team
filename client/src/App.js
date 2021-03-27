import Header from './components/Header/Header'
import Rooms from './components/Views/Rooms'
import Speakers from './components/Views/Speakers'
import TimeSlots from './components/Views/TimeSlots'
import Sessions from './components/Views/Sessions'
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
        <Router>
          <Sessions path="/sessions" />
        </Router>
      </Switch>
    </Router>
  );
}

export default App;
