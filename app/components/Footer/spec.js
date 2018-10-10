import React from "react"
import expect from "expect"
import { shallow } from "enzyme"

import { Footer } from "./"

describe("<Footer />", () => {
  it("should render", () => {
    const renderedComponent = shallow(
      <Footer />
    )
    expect(renderedComponent.is("footer")).toEqual(true)
  })
})
