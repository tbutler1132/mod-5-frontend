import React from 'react'

class SubmitFormThree extends React.Component{

    state = {
        
        vocalUrl: "",

        vocalsArray: this.props.vocalsArray

    }


    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    phaseThreeSubmitHandler = (e) => {
        e.preventDefault()
        const newVocal = {
            selected: false,
            user_id: 130,
            song_id: this.props.selectedBeat.id
        }
        const options = {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "accept": "application/json"
            },
            body: JSON.stringify({ vocal: newVocal })
          }
        fetch("http://localhost:3000/vocals", options)
        .then(r => r.json())
        .then(vocalObj => {
            console.log(vocalObj)
            let newArray = [...this.props.vocalsArray, vocalObj]
            this.props.vocalsArrayDataFlow(newArray)
        })
    }

    render(){
        return(
            <>
                <h5>Submit a Vocal</h5>
                <form onSubmit={this.phasethreeSubmitHandler}>
                    <input type="text" name="vocalUrl" value={this.state.vocalUrl} placeholder="URL" onChange={this.changeHandler} />
                    {/* <input type="text" name="beatUrl" value={this.state.beatUrl} onChange={this.changeHandler} /> */}
                    <button>Submit vocal</button>
                </form>
            </>
        )
    }
}

export default SubmitFormThree