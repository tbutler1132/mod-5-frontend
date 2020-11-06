import logo from './logo.svg';
import './App.css';
import Album from './Containers/Album'
import { Route, Switch } from 'react-router-dom'
// import Track from './Components/Track'
import Profile from './Components/Profile'
import Login from './Components/Login'
import React from 'react'


class App extends React.Component{

  state = {
    track: { track: {} }
  }

    appClickHandler = (trackObj) => {
      this.setState({track: trackObj})
    }

    render(){
      return (
        <div>
          <Route path="/user/43" component={Profile} />
          <Route path="/album/1" component={Album} />
          <Route path="/login" component={Login} />  
          <Route path="/tracks" render={() => <Album appClickHandler={this.appClickHandler} /> } />
        </div>
      )
    }
}

export default App;
