import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

import About from '../../app/components/About';

const mockStore = configureStore();
const initialState = {
  user: {
    email: "amhasler@gmail.com",
    first_name: "Adam",
    last_name: "Hasler",
    role: 1,
    id: 20,
    charges: []
  }
}
const store = mockStore(initialState);

describe('<About />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<About store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});
