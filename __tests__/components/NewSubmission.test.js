import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

import NewSubmission from '../../app/components/NewSubmission';

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
  submission: {
    description: "description one",
    manufacturing: "manufacturing description one",
    advance: "false",
    approved: "true",
    cad_url: "www.google.com",
    photo_url: "www.google.com",
    id: 1,
    comments: [],
    updated_at: "2018-11-18T14:53:08.533957"
  }
}
const store = mockStore(initialState);

describe('<NewSubmission />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<NewSubmission store={store} />);
      // const component = wrapper.dive();

      expect(toJson(wrapper)).toMatchSnapshot();
    });

    // test to render model from contentful
  });
});
