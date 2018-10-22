import React from 'react'
import ReactDOM from 'react-dom'
import ReactCrop, { makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import cssModules from "react-css-modules"
import style from "./style.css"
import { connect } from "react-redux"
import Actions from "../../redux/actions"
import Dropzone from 'react-dropzone'
import 'react-image-crop/dist/ReactCrop.css';
import {image64toCanvasRef, extractImageFileExtensionFromBase64} from '../../../src/ReusableUtils.js'
import { default as Header } from "../Header"
import classNames from 'classnames';
import { Redirect } from 'react-router-dom'

const imageMaxSize = 10000000

export class NewSubmission extends React.Component {
  constructor(props){
    super(props)
    this.imagePreviewCanvasRef = React.createRef()
    this.state = {
      src: null,
      completedSrc: null,
      crop: {
        aspect: 1
      },
      photoStart: true,
      photoCrop: false,
      photoDone: false,
      redirect: false
    }
    this.submit = this.submit.bind(this)
    // this.handleCompleteClick = this.submit.bind(this)
  }

  submit() {
    const submission = {
      description: document.getElementById("submission-description").value,
      manufacturing: document.getElementById("submission-manufacturing").value,
      cad_url: document.getElementById("submission-cad").value,
      user_id: this.props.user.id
    }
    const image = this.state.completedSrc.split(',')[1]
    this.props.dispatch(Actions.submissionNew(submission, image))
    //this.setState({redirect: true})
  }

  handleOnDrop = (files, rejectedFiles) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      const currentRejectFile = rejectedFiles[0]
      const currentRejectFileType = currentRejectFile.type
      const currentRejectFileSize = currentRejectFile.size
      if(currentRejectFileSize > imageMaxSize) {
        alert("this file is too big")
      }
    }

    if (files && files.length > 0) {
      const currentFile = files[0]
      const currentFileType = currentFile.type
      const currentFileSize = currentFile.size
      if(currentFileSize > imageMaxSize) {
        alert("this file is too big")
      }
    }

    const reader = new FileReader()
    reader.addEventListener(
      'load',
      () =>
        this.setState({
          src: reader.result,
        }),
      false
    )
    reader.readAsDataURL(files[0])

    this.setState({
      photoStart: false,
      photoCrop: true,
      photoDone: false
    })
  }

  onImageLoaded = image => {

  }

  onCropComplete = (crop, pixelCrop) => {

    const canvasRef = this.imagePreviewCanvasRef.current
    const {src} = this.state
    image64toCanvasRef(canvasRef, src, pixelCrop)
  }

  handleCompleteClick = (event) => {
    event.preventDefault()
    const canvasRef = this.imagePreviewCanvasRef.current
    const {src} = this.state
    const fileExtension = extractImageFileExtensionFromBase64(src)
    const imageData64 = canvasRef.toDataURL('image/' + fileExtension)

    this.setState({
      completedSrc: imageData64,
      photoStart: false,
      photoCrop: false,
      photoDone: true
    })
  }

  onCropChange = crop => {
    this.setState({ crop })
  }

  render() {
    var startClasses = classNames(
      {'phase_one': this.state.photoStart},
      {'phase_two': this.state.photoCrop},
      {'phase_three': this.state.photoDone}
    )

    const { redirect } = this.state;


     if(this.props.submission.description) {
       return <Redirect to='/submissions'/>;
     }

    return (
      <div className="submissions">
        <Header />
        <div className="body-container">
          <div className="submission-form-container">
            <h2>New Submission</h2>
            <Dropzone className={startClasses} id="dropzone" onDrop={this.handleOnDrop} maxSize={imageMaxSize} multiple={false}>Drop photo here or click anywhere to choose a file (.png and .jpg files only, 10MB maximum)</Dropzone>
            {this.state.src && (
              <ReactCrop
                className={startClasses}
                src={this.state.src}
                crop={this.state.crop}
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}
              />
            )}
            <canvas className={startClasses} width="400" height="400" ref={this.imagePreviewCanvasRef}></canvas>
            <button className={startClasses} id="crop-button" onClick={this.handleCompleteClick}>Click Me</button>
            <div className="inputGroup">
              <textarea
                placeholder="Description"
                className="input"
                type="text"
                autoComplete="description"
                id="submission-description" />
            </div>
            <div className="inputGroup">
              <textarea
                placeholder="Manufacturing Description"
                className="input"
                type="text"
                autoComplete="manufacturing"
                id="submission-manufacturing" />
            </div>
            <div className="inputGroup">
              <input
                placeholder="CAD file"
                className="input"
                type="text"
                autoComplete="cad-file"
                id="submission-cad" />
            </div>
            <button onClick={this.submit}>Submit</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  submission: state.submission
})

export default connect(mapStateToProps)(cssModules(NewSubmission, style))
