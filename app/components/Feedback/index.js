import React from "react"
const ReactMarkdown = require('react-markdown')
import FontAwesome from "react-fontawesome";
import style from "./style.css"
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { default as Concept } from "../Concept"
import HubspotForm from 'react-hubspot-form'
import { default as Header } from "../Header"
import classNames from 'classnames';
import { fetchContent, fetchChildren, fetchConcepts, fetchAsset } from "../../redux/actions"
import { connect } from "react-redux"
import cssModules from 'react-css-modules'

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

  componentDidMount() {
    this.fetchModel()
    //window.addEventListener('hashchange', function(){alert('ping')});
    // window.addEventListener("hashchange", e => console.log('hashchange1', window.location.hash ));
    let query = this.props.match.params.object
    if (query==='start') {
      this.props.fetchChildren
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
      this.props.fetchConcepts(this.props.match.params.object)
      this.setState({showNext:false})
    }
  }

  componentDidUpdate(prevProps) {
    let self = this
    if (prevProps.content != this.props.content) {
      this.setState({
        model: this.props.content.items[0].fields
      }, function() {
        if (this.props.match.params.object!='finish' && this.props.match.params.object!='start') {
          this.props.fetchAsset(this.state.model.original.sys.id)
        }
      })
    }
    if (prevProps.match.params.object != this.props.match.params.object) {

      this.reset()
    }
    if (prevProps.objects.length != this.props.objects.length) {
        this.setState({
          objects: this.props.objects
        })
    }
    if (prevProps.concepts != this.props.concepts) {
      this.setState({
        concepts: this.props.concepts.items
      })
    }
    if (prevProps.asset != this.props.asset) {
      this.setState({
        original: this.props.asset.fields.file.url
      })
    }
  }

  reset() {
    window.scrollTo(0,0);
    this.setState({
      original: '',
      model:{}
    })
    this.fetchModel()
    let query = this.props.match.params.object
    if (query==='start') {
      this.props.fetchChildren
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
      this.props.fetchConcepts(this.props.match.params.object)
      this.setState({showNext:false})
    }
  }

  fetchModel() {
    if (this.props.match.params.object==='start') {
      this.props.getContent('3XtovxD6w0AQ6U4ieSiIow')
    } else if (this.props.match.params.object==='finish') {
      this.props.getContent('6ofWITems0U0OqGM6W42GU')
    } else {
      this.props.getContent(this.props.match.params.object)
    }
  }

  setOriginal = response => {

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
        return <div className="footer-links"><Link className="show" to={'/feedback/' + this.state.model.next} onClick={this.progress}><span>Next</span><FontAwesome name='chevron-right' size='2x' /></Link></div>
      } else {
        return <div className="footer-links"><Link className="show" to='/feedback/finish'><span>Finish</span><FontAwesome name='chevron-right' size='2x' /></Link></div>
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
        <Link to='/feedback/5FDr4od7jyqYm88kMUaQAC' onClick={this.progress}><span>view designs</span><FontAwesome name='chevron-right' size='2x' /></Link>
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
      if (this.state.model) {
        return (
          <div className='feedback'>
          <Header />
          <div className="feedbackBody">

            <h2>{this.state.model.head}</h2>
            <ReactMarkdown source={this.state.model.background} />
            <h2>{this.state.model.problemInsights}</h2>
            <img src={'http:' + this.state.original} />
            <ReactMarkdown source={this.state.model.problem} />
            {this.state.concepts.map(item =>
              <Concept key={item.sys.id} concept={item} />
            )}
            {this.next()}
          </div>
          </div>
        )
      } else {
        <h2>Loading....</h2>
      }
    }
  }
}

const mapDispatchToProps = {
  getContent: fetchContent,
  fetchChildren: fetchChildren,
  fetchConcepts: fetchConcepts,
  fetchAsset: fetchAsset
};

const mapStateToProps = state => ({
  content: state.content,
  objects: state.objects,
  concepts: state.concepts,
  asset: state.asset
})

export default connect(mapStateToProps, mapDispatchToProps)(cssModules(Feedback, style))
