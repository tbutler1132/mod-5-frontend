import React from 'react'
import PhaseFour from './PhaseFour'

class PhaseThree extends React.Component {

    // state = {
    //     vocals: []
    // }
    
    // componentDidMount = () => {
    //     fetch(`http://localhost:3000/beats/${this.props.beatId}`)
    //     .then(r => r.json())
    //     .then(beatObj => this.setState({vocals: beatObj.vocals}))
    // }

    filterVocals = () => {
        if (this.props.songObj.vocals.length > 0){
            const winner = this.props.songObj.vocals.filter(vocal => vocal.selected === true)
            return winner[0].id
        } 
    }

    render(){
        return(
            <div>
                {this.props.songObj.vocals.length > 0 ? <p>Vocal ID: {this.filterVocals()} </p> : null}
            </div>
        )
    }
}

export default PhaseThree