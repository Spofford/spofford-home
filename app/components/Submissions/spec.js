import React from "react"
import expect from "expect"
import { shallow } from "enzyme"

import { Submissions } from "./"

describe("<Submissions />", () => {
  it("should render", () => {
    const renderedComponent = shallow(
      <Submissions />
    )
    expect(renderedComponent.is("div")).toEqual(true)
  })
})
