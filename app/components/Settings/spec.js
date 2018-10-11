import React from "react"
import expect from "expect"
import { shallow } from "enzyme"

import { Settings } from "./"

describe("<Settings />", () => {
  it("should render", () => {
    const renderedComponent = shallow(
      <Settings />
    )
    expect(renderedComponent.is("div")).toEqual(true)
  })
})
