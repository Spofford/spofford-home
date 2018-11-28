import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

import Footer from '../../app/components/Footer';

describe('<Footer />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<Footer />);
      // const component = wrapper.dive();

      expect(toJson(wrapper)).toMatchSnapshot();
    });

    // test to render model from contentful
  });
});
