import React from 'react'
import PhaseThree from './PhaseThree'

class PhaseTwo extends React.Component {

// IN PROGRESS
    testFunction = () => {
        return this.props.referenceResults.length
    }

        filterSelectedBeats = () => {
            const winner = this.props.songObj.beats.filter(beat => beat.selected)
            if (winner){
                return winner[0].id
            }
        }
        
        render(){
            if (this.props.songObj.phase > 2)
                return(
                    this.props.songObj.beats.length > 0 ? <div><p>Beat ID: {this.filterSelectedBeats()}</p></div> : null
                )
            else if (this.props.songObj.phase === 2){
                return (
                    <p>Leaderboard here</p>
                )
            }
            else {
                return (
                    null
                )
            }
        }
    }


export default PhaseTwo