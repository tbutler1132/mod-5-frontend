import logo from './logo.svg';
import './App.css';
import Album from './Containers/Album'
import { Route, Switch } from 'react-router-dom'
import Track from './Components/Track'
import Profile from './Components/Profile'
import Login from './Components/Login'

function App() {
  return (
    <div>
      {/* <h1>Hip-hop</h1> */}
      <Route path="/user/43" component={Profile} />
      <Route path="/album/1" component={Album} />
      <Route path="/login" component={Login} />  
    </div>
  );
}

export default App;
