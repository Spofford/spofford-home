import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

import Signup from '../../app/components/Signup';

const mockStore = configureStore();
const initialState = {
  user: {
    email: "amhasler@gmail.com",
    first_name: "Adam",
    last_name: "Hasler",
    role: 1,
    id: 20,
    charges: []
  },
  error: {
    message: "Wrong Credentials"
  }
}
const store = mockStore(initialState);

describe('<Signup />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<Signup store={store} />);
      //const component = wrapper.dive();

      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
