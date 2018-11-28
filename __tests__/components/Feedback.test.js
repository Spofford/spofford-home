import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

import Feedback from '../../app/components/Feedback';

const startMatch = {
  params: {
    object: "start"
  }
}

describe('<Feedback />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<Feedback match={startMatch} />);
      // const component = wrapper.dive();

      expect(toJson(wrapper)).toMatchSnapshot();
    });

    // test to render model from contentful
  });
});
