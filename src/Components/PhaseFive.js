import React from 'react'

class PhaseFive extends React.Component {

    filterMasters = () => {
        if (this.props.songObj.masters.length > 0){
            const winner = this.props.songObj.masters.filter(master => master.selected === true)
            return winner[0].id
        } 
    }

    render(){
        return(
            <div>
                { this.props.songObj.masters.length  > 0 ? <p>Master Id: {this.filterMasters()}</p> : null}
            </div>
        )
    }
}

export default PhaseFive