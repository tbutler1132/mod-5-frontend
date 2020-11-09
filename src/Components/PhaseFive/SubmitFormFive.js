import React from 'react'

class SubmitFormFive extends React.Component{

    state = {
        
        masterUrl: "",

        mastersArray: this.props.mastersArray

    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    
    phaseFiveSubmitHandler = (e) => {
        e.preventDefault()
        const newMaster = {
            selected: false,
            user_id: 130,
            mix_id: this.props.selectedMix.id
        }
        const options = {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "accept": "application/json"
            },
            body: JSON.stringify({ master: newMaster })
          }
        fetch("http://localhost:3000/masters", options)
        .then(r => r.json())
        .then(masterObj => {
            console.log(masterObj)
            let newArray = [...this.props.mastersArray, masterObj]
            this.props.mastersArrayDataFlow(newArray)
        })
    }

    render(){
        return(
            <>
            <h5>Submit a Master</h5>
            <form onSubmit={this.phaseFiveSubmitHandler}>
                <input type="text" name="masterUrl" value={this.state.masterUrl} placeholder="URL" onChange={this.changeHandler} />
                {/* <input type="text" name="beatUrl" value={this.state.beatUrl} onChange={this.changeHandler} /> */}
                <button>Submit master</button>
            </form>
        </>
        )
    }
}

export default SubmitFormFive