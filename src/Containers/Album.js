import React from 'react'
import Track from '../Components/Track'
import {Route, Switch} from 'react-router-dom'
import Upload from '../Components/Upload'

class Album extends React.Component {

    state = {
        trackArray: [],
        pollResults: []
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/songs")
        .then(r => r.json())
        .then(songs => this.setState({trackArray: songs}))

        // fetch("http://localhost:3000/results")
        // .then(r => r.json())
        // .then(results => this.setState({pollResults: results}))
    }


    renderTracks = () => {
        return this.state.trackArray.map(songObj => <Track key={songObj.id} songObj={songObj} pollResults={this.state.pollResults}/>)
    }

    render(){
        return(
            <div>
            {this.state.trackArray.length === 0 ?  <h1>Loading</h1> :
                
        
                
                    <Switch>
                        <Route path="/tracks/:id" render={({match}) => {
    
                            let id = parseInt(match.params.id)
                            let foundTrack = this.state.trackArray.find((track) => track.id === id)
                            return <Track track={foundTrack} appClickHandler={this.props.appClickHandler} songObj={foundTrack} pollResults={this.state.pollResults}/>
    
    
                        }}/>
                        
                        
                        
                        <Route path="/tracks" render={() => {
                            return( 
                                <div>
                                    <h1>Here are the songs you and your collaboraters are working on!</h1>
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