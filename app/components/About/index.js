import React from "react"
import HubspotForm from 'react-hubspot-form'
const ReactMarkdown = require('react-markdown')
import * as contentful from 'contentful'
import style from "./style.css"

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
    /* window.scrollTo(0, 0); */
    this.fetchModel().then(this.setModel);

    const script = document.createElement('script');
    script.src = 'https://js.hsforms.net/forms/v2.js';
    document.body.appendChild(script);

    script.addEventListener('load', () => {
    	if(window.hbspt) {
      	window.hbspt.forms.create({
        	portalId: '4042167',
          formId: 'd1e13228-c396-4338-bbe3-67cd84f53065',
          target: '#hubspotForm'
        })
      }
    });
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
        <Header />
        <div className="hero">
          <div className="copy-container">
            <h2>{this.state.model.head}</h2>
            <h3>We’re going to change damn near everything about the way we furnish our living spaces.</h3>
          </div>
        </div>
        <div className="body-container">
          <div className="copy-container">

            <ReactMarkdown source={this.state.model.bodyText} />
            <div id="hubspotForm"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default About
