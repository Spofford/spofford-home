import React from "react"
import expect from "expect"
import { shallow } from "enzyme"

import { About } from "./"

describe("<About />", () => {
  it("should render", () => {
    const renderedComponent = shallow(
      <About />
    )
    expect(renderedComponent.is("div")).toEqual(true)
  })
})
