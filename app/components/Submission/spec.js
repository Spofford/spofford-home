import React from "react"
import expect from "expect"
import { shallow } from "enzyme"

import { Submission } from "./"

describe("<Submission />", () => {
  it("should render", () => {
    const renderedComponent = shallow(
      <Submission />
    )
    expect(renderedComponent.is("div")).toEqual(true)
  })
})
