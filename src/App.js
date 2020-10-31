import logo from './logo.svg';
import './App.css';
import Album from './Containers/Album'
import { Route, Switch } from 'react-router-dom'
import Track from './Components/Track'

function App() {
  return (
    <div>
      <h1>Album 1</h1>
      <Route path="/album/1" component={Album} /> 
    </div>
  );
}

export default App;
