import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

import App from '../../app/components/App';

describe('<App />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const dispatch = jest.fn();

      const props = {
        dispatch
      }

      let wrapper = shallow(<App.WrappedComponent {...props} />);

      expect(wrapper).toMatchSnapshot();
    });

    /*
    test('scrollTo on change', () => {
      const scrollToSpy = jest.fn();
      global.scrollTo = scrollToSpy;

      expect(scrollToSpy).toHaveBeenCalled();
    })
    */
  });
});
