import React from 'react'
import { DirectUpload } from 'activestorage';
import {Button} from 'react-bootstrap'

class SubmitFormFour extends React.Component{

    state = {
        
        mixUrl: "",

        mix: {},

        clicked: false,

        mixesArray: this.props.mixesArray

    }

    submitFormFourClickHandler = () => {
        this.state.clicked === false ? this.setState({clicked: true}) : this.setState({clicked: false})
    }

    changeHandler = (e) => {
        if (e.target.name === 'mix'){
            this.setState({ [e.target.name]: e.target.files[0] })  
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }
    
    phaseFourSubmitHandler = (e) => {
        e.preventDefault()
        const newMix = {
            selected: false,
            user_id: 202,
            vocal_id: this.props.selectedVocal.id
        }
        const options = {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "accept": "application/json"
            },
            body: JSON.stringify( newMix )
          }
        fetch("http://localhost:3000/mixes", options)
        .then(r => r.json())
        .then(mixObj => {
        this.uploadFile(this.state.mix, mixObj)
            // console.log(mixObj)
            // let newArray = [...this.props.mixesArray, mixObj]
            // this.props.mixesArrayDataFlow(newArray)
        })
    }

    uploadFile = (file, beat) => {
        console.log(beat)
        const upload = new DirectUpload(file, 'http://localhost:3000/rails/active_storage/direct_uploads')
        upload.create((error, blob) => {
            if (error) {
                console.log(error)
            } else {

                fetch(`http://localhost:3000/beats/${beat.id}`, {
                method: 'PUT',
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                  },
                body: JSON.stringify({audio_data: blob.signed_id})
                })
                .then(r => r.json())
                .then(data => {
       
                })

            
            }
        
        })
    } 


    render(){
        return(
            <>
            <h5 className="submit" onClick={this.submitFormFourClickHandler}> Click to submit a Mix</h5>
            {this.state.clicked === true ?
            <form onSubmit={this.phaseFourSubmitHandler}>
                <input type="file" name="vocal" onChange={this.changeHandler} /><br></br>
                {/* <input type="text" name="mixUrl" value={this.state.mixUrl} placeholder="URL" onChange={this.changeHandler} /> */}
                {/* <input type="text" name="beatUrl" value={this.state.beatUrl} onChange={this.changeHandler} /> */}
                <Button variant="dark" onClick={this.submitFormFourClickHandler}>Submit</Button>
            </form>
            :
            null
            }
        </>
        )
    }
}

export default SubmitFormFour