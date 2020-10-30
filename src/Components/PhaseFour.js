import React from 'react'
import PhaseFive from './PhaseFive'

class PhaseFour extends React.Component {

    state = {
        mixes: []
    }

    // componentDidMount = () => {
    //     fetch(`http://localhost:3000/vocals/${this.props.vocalId}`)
    //     .then(r => r.json())
    //     .then(vocalObj => this.setState({mixes: vocalObj.mixes}))
    // }

    // filterMixes = () => {
    //     if (this.state.mixes.length > 0){
    //         const winner = this.state.mixes.filter(mix => mix.selected === true)
    //         return winner[0].id
    //     } 
    // }
    
    render(){
        // console.log(this.props)
        return(
            <div>
                <p>Mix ID: {this.props.songObj.mixes[1].id} </p>
                <PhaseFive songOBj={this.props.songObj}/>
            </div>
        )
    }
}

export default PhaseFour