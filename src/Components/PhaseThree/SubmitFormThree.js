import React from 'react'
import { DirectUpload } from 'activestorage';
import {Button} from 'react-bootstrap'

class SubmitFormThree extends React.Component{

    state = {
        
        vocalUrl: "",

        vocal: {},

        clicked: false,

        vocalsArray: this.props.vocalsArray

    }

    submitFormFourClickHandler = () => {
        this.state.clicked === false ? this.setState({clicked: true}) : this.setState({clicked: false})
    }


    changeHandler = (e) => {
        if (e.target.name === 'vocal'){
            this.setState({ [e.target.name]: e.target.files[0] })  
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }

    phaseThreeSubmitHandler = (e) => {
        e.preventDefault()
        const newVocal = {
            selected: false,
            user_id: 202,
            song_id: this.props.selectedBeat.id
        }
        const options = {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "accept": "application/json"
            },
            body: JSON.stringify( newVocal )
          }
        fetch("http://localhost:3000/vocals", options)
        .then(r => r.json())
        .then(vocalObj => {
            this.uploadFile(this.state.vocal, vocalObj)
            // let newArray = [...this.props.vocalsArray, vocalObj]
            // this.props.vocalsArrayDataFlow(newArray)
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
                .then(vocalObj => {
           
                })

            
            }
        
        })
    } 

    render(){
        return(
            <>
                <h5 onClick={this.submitFormFourClickHandler}>Submit a Vocal</h5>
                            {this.state.clicked === true ?
                <form onSubmit={this.phasethreeSubmitHandler}>
                    {/* <input type="text" name="vocalUrl" value={this.state.vocalUrl} placeholder="URL" onChange={this.changeHandler} /> */}
                    <input type="file" name="vocal" onChange={this.changeHandler} /><br></br>
                    <Button variant="dark">Upload vocal</Button>
                </form>
                                            :
                                            null
                                            }
            </>
        )
    }
}

export default SubmitFormThree