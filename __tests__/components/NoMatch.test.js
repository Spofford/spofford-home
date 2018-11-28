import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

import NoMatch from '../../app/components/NoMatch';

describe('<NoMatch />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<NoMatch />);
      // const component = wrapper.dive();

      expect(toJson(wrapper)).toMatchSnapshot();
    });

    // test to render model from contentful
  });
});
