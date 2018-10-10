import React from "react"
import expect from "expect"
import { shallow } from "enzyme"

import { Search } from "./"

describe("<Search />", () => {
  it("should render", () => {
    const renderedComponent = shallow(
      <Search />
    )
    expect(renderedComponent.is("div")).toEqual(true)
  })
})
