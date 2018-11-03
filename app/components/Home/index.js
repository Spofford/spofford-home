import React from "react"
import cssModules from "react-css-modules"
import style from "./style.css"
import * as contentful from 'contentful'
import { Link } from 'react-router-dom'
import FontAwesome from "react-fontawesome";
import { connect } from "react-redux"
import { default as Header } from "../Header"
import { default as Footer } from "../Footer"
import Modal from 'react-modal';

const customStyles = {
  content : {
    // left                  : '50%',
    // right                 : 'auto',
    // bottom                : 'auto'
  }
};

Modal.setAppElement('#root')

export class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      model: {},
      posts: [],
      modalIsOpen: false
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    var self = this
    setTimeout(function(){ self.setState({modalIsOpen: true}) }, 1000);
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  client = contentful.createClient({
    space: 'cahjy08ew1qz',
    accessToken: '37c6ec31a1a6cb3f533f51fa4c4af8fee88e2f910d9879eb79b2d073ae8cc499'
  })

  componentDidMount() {
    /* window.scrollTo(0, 0); */
    this.fetchModel().then(this.setModel);
    this.fetchPosts().then(this.setPosts);

    this.openModal();
  }

  fetchModel = () => this.client.getEntry('2RAz4CbUQwYcIMSgmuQQQ4')

  fetchPosts = () => this.client.getEntries({ content_type: 'blogPost' })

  setModel = response => {
    this.setState({
      model: response.fields
    })
  }

  setPosts = response => {
    this.setState({
      posts: response.items
    })
  }

  render() {
    const myData = [].concat(this.state.posts)
      .sort((a, b) => a.fields.datePublished < b.fields.datePublished)
      .map((item, i) =>
          <div className="postContainer" key={i}>
            <img src={item.fields.primaryImage.fields.file.url} />
            <h2>{item.fields.head}</h2>
            <h3>{item.fields.subhead}</h3>
            <Link to={'/post/' + item.sys.id}>keep reading<FontAwesome name='chevron-right' /></Link>
          </div>
      );

    return (


      <div className="home">
        <div>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
            closeTimeoutMS={2000}
            contentLabel="Example Modal">
            <div className="modal-container">
              <h2 ref={subtitle => this.subtitle = subtitle}>The Next Generation of New England Furniture</h2>
              <p>I am a modal</p>
              <Link to="/show"><button onClick={this.closeModal} className="green" >LEARN MORE</button></Link>
              <span onClick={this.closeModal}>DISMISS</span>
            </div>
          </Modal>
        </div>
        <div className="hero">
          <img src="https://s3.us-east-2.amazonaws.com/brand-collateral/logo-light-blue-big.svg" />
          <h1>spofford</h1>
        </div>
        <Header headerStart={true} />
        <div className="body-container">
          <div className="copy-container">
            <h2>{this.state.model.head}</h2>
            <h3>{this.state.model.subhead}</h3>
            <Link to="/about">read on<FontAwesome name='chevron-right' /></Link>
          </div>
          <div className="posts">
          <hr />
            <h2>Conversations</h2>
            {myData}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(cssModules(Home, style))
