import React from 'react'
import Track from '../Components/Track'
import {Route, Switch} from 'react-router-dom'

class Album extends React.Component {

    state = {
        trackArray: []
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/songs")
        .then(r => r.json())
        .then(songs => this.setState({trackArray: songs}))
    }


    renderTracks = () => {
        return this.state.trackArray.map(songObj => <Track key={songObj.id} songObj={songObj} ear="ear"/>)
    }

    render(){
        return(
            <div>
            {this.state.trackArray.length === 0 ?  <h1>Loading</h1> :
                
        
                
                    <Switch>
                        <Route path="/tracks/:id" render={({match}) => {
    
                            let id = parseInt(match.params.id)
                            let foundTrack = this.state.trackArray.find((track) => track.id === id)
                            return <Track track={foundTrack} appClickHandler={this.props.appClickHandler} songObj={foundTrack}/>
    
    
                        }}/>
                        
                        
                        
                        <Route path="/tracks" render={() => {
                            return( 
                                <div>
                                    {this.renderTracks()} 
                                </div>
                            )
                            }} />
                    </Switch> 
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                }
                </div>
        )
        
    }

}

export default Album