import logo from './logo.svg';
import './App.css';
import Album from './Containers/Album'
import { Route, Switch } from 'react-router-dom'
// import Track from './Components/Track'
import Profile from './Components/Profile'
import Login from './Components/Login'
import React from 'react'
import NavBar from "./Components/NavBar";


class App extends React.Component{

  state = {
    track: { track: {} },
    usersArray: []
  }

  




    appClickHandler = (trackObj) => {
      this.setState({track: trackObj})
    }

    render(){
      console.log(this.state.usersArray)
      return (
        <div>
          <NavBar />
          <Route path="/user/43" render={() => <Profile  usersArray={this.state.usersArray}/> } />
          <Route path="/album/1" component={Album} />
          <Route path="/login" component={Login} />  
          <Route path="/tracks" render={() => <Album appClickHandler={this.appClickHandler} /> } />
        </div>
      )
    }
}


export default App;
