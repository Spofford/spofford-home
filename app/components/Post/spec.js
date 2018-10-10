import React from "react"
import expect from "expect"
import { shallow } from "enzyme"

import { Post } from "./"

describe("<Post />", () => {
  it("should render", () => {
    const renderedComponent = shallow(
      <Post />
    )
    expect(renderedComponent.is("div")).toEqual(true)
  })
})
