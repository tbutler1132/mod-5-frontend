import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone'
import ReactAudioPlayer from 'react-audio-player';
import {Container, Row, Col} from 'react-bootstrap'

 
class Upload extends React.Component {
    render () {
      console.log(this.props.selectedVocal)
      if (this.props.selectedBeat !== undefined || this.props.selectedVocal !== undefined || this.props.selectedMix !== undefined || this.props.selectedMaster !== undefined){
      return (
        <>
        {this.props.phase > 2 ?
        <>
        <Container >
          <div className="phasebox">
          <Row>
          <Col>
          <h2 className="header">{this.props.songObj.title}'s Beat</h2>
          </Col>
          <Col xs={10}>
          <h4 className="header">Winning beat by {this.props.selectedBeat.user.name}</h4>
            <ReactAudioPlayer
              src={`http://localhost:3000/${this.props.selectedBeat.audio_data.url}`}
              controls
              className="audioplayer"
            />
            </Col>
          </Row>
          </div>
        </Container>
        <hr></hr>
        </>
        :
        null}
        {this.props.phase > 3 ?
        <>
        <Container>
        <div className="phasebox">
        <Row>
          <Col>
        <h2 className="header">{this.props.songObj.title}'s vocal performance</h2>
        </Col>
        <Col xs={10}>
          <h4 className="header">Winning vocal by {this.props.selectedVocal.user.name}</h4>
            <ReactAudioPlayer
              src={`http://localhost:3000/${this.props.selectedVocal.audio_data.url}`}
              controls
              className="audioplayer"
            />
            </Col>
        </Row>
        </div>
        </Container>
        <hr></hr>
        </>
        :
        null  
      }
        {this.props.phase > 4 ?
        <>
        <Container>
        <div className="phasebox">
        <Row>
        <Col>
        <h2 className="header">{this.props.songObj.title}'s Mix</h2>
        </Col>
        <Col xs={10}>
          <h4 className="header">Winning mix by {this.props.selectedMix.user.name}</h4>
            <ReactAudioPlayer
              src={`http://localhost:3000/${this.props.selectedMix.audio_data.url}`}
              controls
              className="audioplayer"
            />
          </Col>
        </Row>
          </div>
            </Container>
            <hr></hr>
        </>
        :
        null  
      }
        {this.props.phase > 5 ?
        <>
        <Container>
        <div className="phasebox">
        <Row>
          <Col>
        <h2 className="header">{this.props.songObj.title}'s Final Master</h2>
        </Col>
        <Col xs={10}>
          <h4 className="header">Winning master by {this.props.selectedMaster.user.name}</h4>
            <ReactAudioPlayer
              src={`http://localhost:3000/${this.props.selectedMaster.audio_data.url}`}
              controls
              className="audioplayer"
            />
            </Col>
        </Row>
        </div>
        </Container>
        <hr></hr>
        </>
        :
        null  
      }
        </>
      )
      }
      else {
        return(null)
      }
    }
  }

export default Upload;