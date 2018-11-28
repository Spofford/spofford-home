import React from "react"
import HubspotForm from 'react-hubspot-form'
const ReactMarkdown = require('react-markdown')
import style from "./style.css"
import * as contentful from 'contentful'
// import { default as client } from '../../../src/services/contentful-client.js'
//import { fetchModel } from "../../redux/actions"

import { default as Header } from "../Header"

export class About extends React.Component {

  state = {
    model: {}
  }

  client = contentful.createClient({
    space: 'cahjy08ew1qz',
    accessToken: '37c6ec31a1a6cb3f533f51fa4c4af8fee88e2f910d9879eb79b2d073ae8cc499'
  })


  componentDidMount() {
    this.fetchModel().then(this.setModel);
    //this.props.dispatch(Actions.fetchModel('wKhyV2HRBeSgK4UcOoiEi'))
    /*
    const response = await client().getEntry('wKhyV2HRBeSgK4UcOoiEi')
    self.setState({
      model: response.fields
    })
    */
    //const client = await contentful.createClient({
    //  space: 'cahjy08ew1qz',
    //  accessToken: '37c6ec31a1a6cb3f533f51fa4c4af8fee88e2f910d9879eb79b2d073ae8cc499'
    // })
    //const model = await client.getEntry('wKhyV2HRBeSgK4UcOoiEi')

    //this.setModel;

    // var script = document.querySelector('[src="https://js.hsforms.net/forms/v2.js"]')

  	//if(window.hbspt) {
    //	window.hbspt.forms.create({
    //  	portalId: '',
    //    formId: '',
    //    target: '#hubspotForm'
    //  })
    // }
  }

  fetchModel = () => this.client.getEntry('wKhyV2HRBeSgK4UcOoiEi')

  setModel = response => {
    this.setState({
      model: response.fields
    })
  }

  render() {
    return (
      <div className="about">
        <Header headerStart={true} />
        <div className="hero">
          <div className="copy-container">
            <h2>{this.state.model.head}</h2>
            <h3>{this.state.model.subhead}</h3>
          </div>
        </div>
        <div className="body-container">
          <div className="copy-container">

            <ReactMarkdown source={this.state.model.bodyText} />
            <HubspotForm
               portalId='4042167'
               formId='d1e13228-c396-4338-bbe3-67cd84f53065'
               />
          </div>
        </div>
      </div>
    )
  }
}

export default About
