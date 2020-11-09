import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone'
import ReactAudioPlayer from 'react-audio-player';
 
class Upload extends React.Component {
    render () {
      console.log(this.props.upload.url)
      if (this.props.upload !== undefined){
      return (
        <ReactAudioPlayer
          src={`http://localhost:3000/${this.props.upload.url}`}
          autoPlay
          controls
        />
      )
      }
      else {
        return(null)
      }
    }
  }

export default Upload;