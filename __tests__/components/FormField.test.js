import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

import FormField from '../../app/components/FormField';

describe('<FormField />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<FormField />);
      //const component = wrapper.dive();

      expect(toJson(wrapper)).toMatchSnapshot();
    });

    // test to render model from contentful
  });
});
