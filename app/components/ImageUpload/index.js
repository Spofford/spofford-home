import React from "react";
import FontAwesome from "react-fontawesome";
import cssModules from 'react-css-modules';
import classNames from 'classnames';
import style from "./style.css";
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import Actions from "../../redux/actions";
import ReactCrop, { makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Dropzone from 'react-dropzone';
import 'react-image-crop/dist/ReactCrop.css';
import {image64toCanvasRef, extractImageFileExtensionFromBase64} from '../../../src/ReusableUtils.js'

const imageMaxSize = 10000000

export class ImageUpload extends React.Component {

  constructor() {
    super()
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

  }

  componentDidMount() {
    if (this.props.src) {
      this.setState({
        src: this.props.src,
        photoStart: false,
        photoCrop: false,
        photoDone: true,
      })


      const canvasRef = this.imagePreviewCanvasRef.current
      const canvas = canvasRef // document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 400;
      const ctx = canvas.getContext('2d');
      const image = new Image()
      image.src = this.props.src
      image.onload = function() {
          ctx.drawImage(
            image,
            0,
            0
          )
        }

    }

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
      photoStart: false,
      photoCrop: false,
      photoDone: true
    })

    this.props.onSelectImage(imageData64);
  }

  onCropChange = crop => {
    this.setState({ crop })
  }

  changeImage = () => {
    this.setState({
      photoStart: true,
      photoCrop: false,
      photoDone: false,
      crop: {
        aspect:1,
        x:0,
        y:0,
        width:null,
        height:null
      }
    })
  }

  cancelCrop = () => {
    this.setState({
      crop: {
        aspect:1,
        x:0,
        y:0,
        width:null,
        height:null
      }
    })

    this.setState({
      photoStart: true,
      photoCrop: false,
      photoDone: false
    })
  }

  render() {
    var startClasses = classNames(
      {'phase_one': this.state.photoStart},
      {'phase_two': this.state.photoCrop},
      {'phase_three': this.state.photoDone}
    )

    return (
      <div>
        <Dropzone className={startClasses} id="dropzone" onDrop={this.handleOnDrop} disableClick={true} maxSize={imageMaxSize} multiple={false}>Drop photo here to choose a file (.png and .jpg files only, 10MB maximum)</Dropzone>
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
        <div className="button-group">
          <button className={startClasses} id="crop-button" onClick={this.handleCompleteClick}>Crop</button>
          <button className={startClasses} id="cancel" onClick={this.cancelCrop}>Cancel</button>
          <button className={startClasses} id="change" onClick={this.changeImage}>Change Image</button>
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(cssModules(ImageUpload, style))
