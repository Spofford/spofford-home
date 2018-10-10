import React from "react"
import expect from "expect"
import { shallow } from "enzyme"

import { Header } from "./"

describe("<Header />", () => {
  it("should render", () => {
    const renderedComponent = shallow(
      <Header />
    )
    expect(renderedComponent.is("div")).toEqual(true)
  })
})
