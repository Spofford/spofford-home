import React from "react"
import expect from "expect"
import { shallow } from "enzyme"

import { Feedback } from "./"

describe("<Feedback />", () => {
  it("should render", () => {
    const renderedComponent = shallow(
      <Feedback />
    )
    expect(renderedComponent.is("div")).toEqual(true)
  })
})
