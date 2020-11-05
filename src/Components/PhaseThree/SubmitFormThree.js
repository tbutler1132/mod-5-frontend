import React from 'react'

class SubmitFormThree extends React.Component{

    state = {
        
        vocalUrl: ""

    }

    phaseThreeSubmitHandler = (e) => {
        e.preventDefault()
        const newVocal = {
            selected: false,
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
        .then(vocalObj => console.log(vocalObj))
    }

    render(){
        return(
            <form onSubmit={this.phasethreeSubmitHandler}>
                <input type="text" name="vocalUrl" value={this.state.vocalUrl} placeholder="URL" onChange={this.changeHandler} />
                {/* <input type="text" name="beatUrl" value={this.state.beatUrl} onChange={this.changeHandler} /> */}
                <button>Submit vocal</button>
            </form>
        )
    }
}

export default SubmitFormThree