import React from "react"
import HubspotForm from 'react-hubspot-form'

export class About extends React.Component {
  render() {
    return (
      <div>
        <h2>About component</h2>
        <p>WASHINGTON — President Trump’s vituperative tweet against Iran late on Sunday showed his determination to use the same approach that he took to engineer a diplomatic breakthrough with North Korea. But Mr. Trump’s top advisers are far more united in their hostility to engaging with Iran, and Iran is far less likely to bend to such pressure.</p>
        <HubspotForm
          portalId='4042167'
          formId='df71f9ed-b2b9-4215-b432-bf6be7b5e738'
          onSubmit={() => console.log('Submit!')}
          onReady={(form) => console.log('Form ready!')}
          loading={<div>Loading...</div>}
        />
      </div>
    )
  }
}

export default About
