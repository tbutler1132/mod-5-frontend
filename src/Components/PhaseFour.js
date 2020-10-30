import React from 'react'


class PhaseFour extends React.Component {

    state = {
        mixes: []
    }

    filterMixes = () => {
        if (this.props.songObj.mixes.length > 0){
            const winner = this.props.songObj.mixes.filter(mix => mix.selected === true)
            return winner[0].id
        } 
    }
    
    render(){
        // console.log(this.props.songObj)
        return(
            <div>
                {this.props.songObj.mixes.length > 0 ? <p>Mix ID: {this.filterMixes()} </p> : null}
            </div>
        )
    }
}

export default PhaseFour