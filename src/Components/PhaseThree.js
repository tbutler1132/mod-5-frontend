import React from 'react'
import PhaseFour from './PhaseFour'

class PhaseThree extends React.Component {

    state = {
        vocals: []
    }
    
    componentDidMount = () => {
        fetch(`http://localhost:3000/beats/${this.props.beatId}`)
        .then(r => r.json())
        .then(beatObj => this.setState({vocals: beatObj.vocals}))
    }

    filterVocals = () => {
        if (this.state.vocals.length > 0){
            const winner = this.state.vocals.filter(vocal => vocal.selected === true)
            return winner[0].id
        } 
    }

    render(){
        console.log(this.props)
        return(
            <div>
                <p>Vocal ID: {this.filterVocals()} </p>
                <PhaseFour songObj={this.props.songObj}/>
            </div>
        )
    }
}

export default PhaseThree