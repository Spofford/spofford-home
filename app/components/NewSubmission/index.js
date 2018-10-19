import React from 'react'
import ReactDOM from 'react-dom'
import ReactCrop, { makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import cssModules from "react-css-modules"
import style from "./style.css"
import { connect } from "react-redux"
import Actions from "../../redux/actions"
import 'react-image-crop/dist/ReactCrop.css';
import {image64toCanvasRef, extractImageFileExtensionFromBase64} from '../../../src/ReusableUtils.js'

export class NewSubmission extends React.Component {
  constructor(props){
    super(props)
    this.imagePreviewCanvasRef = React.createRef()
    this.state = {
      src: null,
      crop: {
        aspect: 1/1
      }
    }
  }

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener(
        'load',
        () =>
          this.setState({
            src: reader.result,
          }),
        false
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }

  onImageLoaded = image => {
    console.log('onCropComplete', image)
  }

  onCropComplete = (crop, pixelCrop) => {
    console.log(crop, pixelCrop)

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
    console.log(imageData64)
  }

  onCropChange = crop => {
    this.setState({ crop })
  }

  render() {
    return (
      <div className="App">
        <div>
          <input type="file" onChange={this.onSelectFile} />
        </div>
        {this.state.src && (
          <ReactCrop
            src={this.state.src}
            crop={this.state.crop}
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
        )}
        <p>Preview Canvas Crop</p>
        <canvas ref={this.imagePreviewCanvasRef}></canvas>
        <button onClick={this.handleCompleteClick}>Click Me</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(cssModules(NewSubmission, style))
