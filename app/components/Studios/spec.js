import React from "react"
import expect from "expect"
import { shallow } from "enzyme"

import { Studios } from "./"

describe("<Studios />", () => {
  it("should render", () => {
    const renderedComponent = shallow(
      <Studios />
    )
    expect(renderedComponent.is("div")).toEqual(true)
  })
})
