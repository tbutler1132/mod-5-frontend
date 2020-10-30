import React from 'react'
import PhaseThree from './PhaseThree'

    class PhaseTwo extends React.Component {

        filterSelectedBeats = () => {
            const winner = this.props.songObj.beats.filter(beat => beat.selected)
            if (winner){
                return winner[0].id
            }
        }
        
        render(){
            return(
                this.props.songObj.beats.length > 0 ? <div><p>Beat ID: {this.filterSelectedBeats()}</p></div> : null
            )
        }
    }


export default PhaseTwo