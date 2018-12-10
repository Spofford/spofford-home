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
import { fetchContent, fetchPosts, toggleModal } from "../../redux/actions"

const customStyles = {
  content : {
    width                    : 600,
    height                   : 450,
    //left                     : 'auto'
  }
};

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
    setTimeout(function(){ self.setState({modalIsOpen: true}) }, 200);
  }

  closeModal() {
    this.props.toggleModal()
  }

  componentWillMount() {
      if (process.env.NODE_ENV !== 'test') Modal.setAppElement("#root");
  }

  componentDidMount() {
    this.props.getContent('2RAz4CbUQwYcIMSgmuQQQ4')
    this.props.fetchPosts()

    if(this.props.welcomeModal) {
      this.openModal();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.content != this.props.content) {
      this.setState({
        model: this.props.content.items[0].fields
      })
    }
    if (prevProps.posts != this.props.posts) {
      this.setState({
        posts: this.props.posts.items
      })
    }
    if (prevProps.welcomeModal != this.props.welcomeModal) {
      this.setState({modalIsOpen: false});
    }
  }

  render() {
    const myData = [].concat(this.state.posts)
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
              <p>Spofford is inviting New England's best and most visionary furniture designers to meld circular design, regionality, and human centeredness to submit designs for a juried group show.</p>
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

export const mapDispatchToProps = {
  getContent: fetchContent,
  toggleModal: toggleModal,
  fetchPosts: fetchPosts
};

export const mapStateToProps = state => ({
  user: state.user,
  content: state.content,
  posts: state.posts,
  welcomeModal: state.modal
})

export default connect(mapStateToProps, mapDispatchToProps)(cssModules(Home, style))
