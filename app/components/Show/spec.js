import React from "react"
import expect from "expect"
import { shallow } from "enzyme"

import { Show } from "./"

describe("<Show />", () => {
  it("should render", () => {
    const renderedComponent = shallow(
      <Show />
    )
    expect(renderedComponent.is("div")).toEqual(true)
  })
})
