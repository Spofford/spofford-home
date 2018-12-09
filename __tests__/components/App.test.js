import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

import App from '../../app/components/App';

const dispatch = jest.fn();
const props = {
  location: '/studios',
  dispatch
}

describe('<App />', () => {
  test('renders the component', () => {
    let wrapper = shallow(<App.WrappedComponent {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  test('scrollTo on change', () => {
    const scrollToSpy = jest.fn();
    global.scrollTo = scrollToSpy;

    let wrapper = shallow(<App.WrappedComponent {...props} />);
    wrapper.setProps({ location: '/about' });

    expect(scrollToSpy).toHaveBeenCalled();
  })
});
