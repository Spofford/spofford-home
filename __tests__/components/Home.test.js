import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import * as contentful from 'contentful'

import Home from '../../app/components/Home';

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
  modal: {
    modal: true
  }
}
const store = mockStore(initialState);

describe('<Home />', () => {
  describe('render()', () => {
    beforeEach(() => {
      var client = contentful.createClient({
        space: 'cahjy08ew1qz',
        accessToken: '37c6ec31a1a6cb3f533f51fa4c4af8fee88e2f910d9879eb79b2d073ae8cc499'
      });
    });

    test('renders the component', () => {
      const wrapper = shallow(<Home store={store} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('calls setModel on mount', async () => {
      const wrapper = shallow(<Home store={store} />);
      const spy = jest.spyOn(wrapper.instance(), "setModel");
      wrapper.instance().forceUpdate();
      wrapper.instance().componentDidMount();

      const data = await wrapper.instance().fetchModel();
      expect(spy).toHaveBeenCalled();
    })

    // test to render model from contentful
  });
});
