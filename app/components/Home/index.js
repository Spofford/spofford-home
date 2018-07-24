import React from "react"
import cssModules from "react-css-modules"
import style from "./style.css"

export class Home extends React.Component {

  render() {
    return (
      <div>
        <h2>
          Home component
        </h2>
        <p>WASHINGTON — President Trump’s vituperative tweet against Iran late on Sunday showed his determination to use the same approach that he took to engineer a diplomatic breakthrough with North Korea. But Mr. Trump’s top advisers are far more united in their hostility to engaging with Iran, and Iran is far less likely to bend to such pressure.

Mr. Trump’s threat that Iran would “suffer consequences the likes of which few throughout history have ever suffered before,” delivered before midnight in all capital letters, succeeded in changing the subject after a week of bad headlines about his meeting with President Vladimir V. Putin of Russia.

But it only deepened questions about the long-term direction of Mr. Trump’s Iran policy. While the White House on Monday did not rule out direct talks between the president and Iran’s leaders over its nuclear program, Mr. Trump’s hawkish national security team has put the focus more on toppling the Iranian government than striking a new deal with it.

A few hours before Mr. Trump’s tweet, Secretary of State Mike Pompeo vowed in a speech that the United States would work with the Iranian people to undermine their clerical leaders, whom he described as “hypocritical holy men,” guilty of looting their country to enrich themselves and finance Islamist terrorism around the world.</p>



      </div>
    )
  }
}

export default cssModules(Home, style)
