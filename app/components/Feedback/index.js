import React from "react"
import * as contentful from 'contentful'
const ReactMarkdown = require('react-markdown')
import FontAwesome from "react-fontawesome";
import style from "./style.css"
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { default as Concept } from "../Concept"
import HubspotForm from 'react-hubspot-form'
import { default as Header } from "../Header"
import classNames from 'classnames';

export class Feedback extends React.Component {

  // Added this:
  constructor(props) {
    super(props);

    this.state = {
      model: {},
      children: [],
      concepts: [],
      showNext: false,
      remaining: 0,
      original: ''
    }

    this.reset = this.reset.bind(this);
    this.buttonDisappear = this.buttonDisappear.bind(this);
    this.progress = this.progress.bind(this);
  }



  client = contentful.createClient({
    space: 'cahjy08ew1qz',
    accessToken: '37c6ec31a1a6cb3f533f51fa4c4af8fee88e2f910d9879eb79b2d073ae8cc499'
  })

  componentDidMount() {
    this.reset()
    window.addEventListener('hashchange', this.reset);
  }

  componentWillUnmount() {
      window.removeEventListener('hashchange', this.reset);
  }

  reset() {
    window.scrollTo(0,0);
    let query = this.props.match.params.object
    this.fetchModel().then(this.setModel);
    if (query==='start') {
      this.fetchChildren().then(this.setChildren)
    } else if (query==='finish') {
      const script = document.createElement('script');
      script.src = 'https://js.hsforms.net/forms/v2.js';
      document.body.appendChild(script);

      script.addEventListener('load', () => {
        if(window.hbspt) {
          window.hbspt.forms.create({
            portalId: '4042167',
            formId: 'd1e13228-c396-4338-bbe3-67cd84f53065',
            target: '#secondForm'
          })
        }
      });
    } else {
      this.fetchConcepts().then(this.setConcepts)
      this.setState({showNext:false})
    }
  }

  fetchModel() {
    if (this.props.match.params.object==='start') {
      return this.client.getEntry('3XtovxD6w0AQ6U4ieSiIow')
    } else if (this.props.match.params.object==='finish') {
      return this.client.getEntry('6ofWITems0U0OqGM6W42GU')
    } else {
      return this.client.getEntry(this.props.match.params.object)
    }
  }

  fetchChildren() {
    return this.client.getEntries({ content_type: 'object' })
  }

  fetchConcepts() {
    return this.client.getEntries({
      content_type: 'concept',
      'fields.object.sys.id': this.props.match.params.object
    })
  }

  setModel = response => {
    this.setState({
      model: response.fields
    })
    if (this.state.model.original) {
      this.client.getAsset(this.state.model.original.sys.id).then(this.setOriginal)
    }
  }

  setOriginal = response => {
    this.setState({
      original: response.fields.file.url
    })
  }

  setChildren = response => {
    this.setState({
      children: response.items,
      remaining: response.items.length
    })
  }

  setConcepts = response => {
    this.setState({
      concepts: response.items
    })
  }

  buttonDisappear() {
    this.setState({
      showNext:true
    })
  }

  progress() {
    var old = this.state.remaining
    this.setState({
      remaining: --old
    })
  }

  next = () => {
    var feedback = classNames({'show': this.state.showNext})

    if (this.state.model.formId) {
      if (this.state.model.next) {
        return <div className="footer-links"><iframe id="idIframe" src={"https://docs.google.com/forms/d/e/" + this.state.model.formId + "/viewform?embedded=true"} width="100%" height="1150">Loading...</iframe><Link className="show" to={'/feedback/' + this.state.model.next} onClick={this.progress}><span>Next</span><FontAwesome name='chevron-right' size='2x' /></Link></div>
      } else {
        return <div className="footer-links"><iframe id="idIframe" src={"https://docs.google.com/forms/d/e/" + this.state.model.formId + "/viewform?embedded=true"} width="100%" height="1150">Loading...</iframe><Link className="show" to='/feedback/finish'><span>Finish</span><FontAwesome name='chevron-right' size='2x' /></Link></div>
      }
    }
  }

  render() {
    var iFrameID = document.getElementById('idIframe');
    if(iFrameID) {
        // here you can make the height, I delete it first, then I make it again
        // iFrameID.height = "";
        // iFrameID.height = iFrameID.contentWindow.document.body.scrollHeight + "px";
        if (screen.width < 450) {
          iFrameID.height = "1250px";
        }
    }

    if (this.state.model.next) {
      var next = this.state.model.next
    } else {
      var next = 'finish'
    }

    if (this.props.match.params.object==='start') {

      return (
      <div className='feedback'>
      <Header />
      <div className="feedbackBody">
        <h2>{this.state.model.head}</h2>
        <h3>{this.state.model.subhead}</h3>
        <ReactMarkdown source={this.state.model.bodyText} />
        <h3>There are {this.state.remaining} types of furniture to review.</h3>
        <Link to='/feedback/5FDr4od7jyqYm88kMUaQAC' onClick={this.progress}><span>Get started</span><FontAwesome name='chevron-right' size='2x' /></Link>
      </div>
      </div>
      )
    } else if (this.props.match.params.object==='finish') {
      return (
        <div className='feedback'>
        <Header />
        <div className="feedbackBody">
          <h2>{this.state.model.head}</h2>
          <ReactMarkdown source={this.state.model.bodyText} />
          <div id="secondForm"></div>
          <Link to='/' className="return-home"><FontAwesome name='chevron-left' size='2x' /><span>Return to home</span></Link>
        </div>
        </div>
      )
    } else {

      return (
        <div className='feedback'>
        <Header />
        <div className="feedbackBody">

          <h2>{this.state.model.head}</h2>
          <ReactMarkdown source={this.state.model.background} />
          <h2>{this.state.model.problemInsights}</h2>
          <img src={this.state.original} />
          <ReactMarkdown source={this.state.model.problem} />
          {this.state.concepts.map(item =>
            <Concept key={item.sys.id} concept={item} />
          )}
          {this.next()}
        </div>
        </div>
      )
    }
  }
}

export default Feedback
