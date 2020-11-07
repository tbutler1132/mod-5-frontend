import React from 'react'

class SubmitFormFour extends React.Component{

    state = {
        
        mixUrl: "",

        mixesArray: this.props.mixesArray

    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    
    phaseFourSubmitHandler = (e) => {
        e.preventDefault()
        const newMix = {
            selected: false,
            user_id: 121,
            vocal_id: this.props.selectedVocal.id
        }
        const options = {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "accept": "application/json"
            },
            body: JSON.stringify({ mix: newMix })
          }
        fetch("http://localhost:3000/mixes", options)
        .then(r => r.json())
        .then(mixObj => {
            console.log(mixObj)
            let newArray = [...this.props.mixesArray, mixObj]
            this.props.mixesArrayDataFlow(newArray)
        })
    }


    render(){
        return(
            <>
            <h5>Submit a Mix</h5>
            <form onSubmit={this.phaseFourSubmitHandler}>
                <input type="text" name="mixUrl" value={this.state.mixUrl} placeholder="URL" onChange={this.changeHandler} />
                {/* <input type="text" name="beatUrl" value={this.state.beatUrl} onChange={this.changeHandler} /> */}
                <button>Submit mix</button>
            </form>
        </>
        )
    }
}

export default SubmitFormFour