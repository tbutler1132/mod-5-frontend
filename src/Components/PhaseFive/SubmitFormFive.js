import React from 'react'
import { DirectUpload } from 'activestorage';
import {Button} from 'react-bootstrap'


class SubmitFormFive extends React.Component{

    state = {
        
        masterUrl: "",

        master: {},

        clicked: false,

        mastersArray: this.props.mastersArray

    }

    submitFormFourClickHandler = () => {
        this.state.clicked === false ? this.setState({clicked: true}) : this.setState({clicked: false})
    }

    changeHandler = (e) => {
        if (e.target.name === 'beat'){
            this.setState({ [e.target.name]: e.target.files[0] })  
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }
    
    phaseFiveSubmitHandler = (e) => {
        e.preventDefault()
        const newMaster = {
            selected: false,
            user_id: 202,
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
            this.uploadFile(this.state.master, masterObj)
            // console.log(masterObj)
            // let newArray = [...this.props.mastersArray, masterObj]
            // this.props.mastersArrayDataFlow(newArray)
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
                .then(data => console.log(data))

            
            }
        
        })
    } 

    render(){
        return(
            <>
            <h5 onClick={this.submitFormFourClickHandler}>Submit a Master</h5>
            {this.state.clicked === true ?
            <form onSubmit={this.phaseFiveSubmitHandler}>
                <input type="file" name="vocal" onChange={this.changeHandler} /><br></br>
                {/* <input type="text" name="masterUrl" value={this.state.masterUrl} placeholder="URL" onChange={this.changeHandler} /> */}
                {/* <input type="text" name="beatUrl" value={this.state.beatUrl} onChange={this.changeHandler} /> */}
                <Button>Upload master</Button>
            </form>
                        :
                        null
                        }
        </>
        )
    }
}

export default SubmitFormFive