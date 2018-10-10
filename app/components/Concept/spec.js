import React from "react"
import expect from "expect"
import { shallow } from "enzyme"

import { Concept } from "./"

describe("<Concept />", () => {
  it("should render", () => {
    const renderedComponent = shallow(
      <Concept />
    )
    expect(renderedComponent.is("div")).toEqual(true)
  })
})
