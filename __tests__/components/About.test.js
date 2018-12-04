import React from 'react';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import 'jest-dom/extend-expect';

import About from '../../app/components/About';

describe('<About />', () => {
    // jest.mock("./__mocks__/contentful.js")

  test('renders the component', () => {
    const wrapper = shallow(<About />);
    const component = wrapper.dive();

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
