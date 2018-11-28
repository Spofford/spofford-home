import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

import Submission from '../../app/components/Submission';

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
  mySubmissions: [
    {
      description: "description one",
      manufacturing: "manufacturing description one",
      advance: "false",
      approved: "true",
      cad_url: "www.google.com",
      photo_url: "www.google.com",
      id: 1,
      comments: [],
      updated_at: "2018-11-18T14:53:08.533957"
    },
    {
      description: "description two",
      manufacturing: "manufacturing description two",
      advance: "false",
      approved: "false",
      cad_url: "www.google.com",
      photo_url: "www.google.com",
      id: 2,
      comments: [],
      updated_at: "2018-11-18T14:53:08.533957"
    },
    {
      description: "description three",
      manufacturing: "manufacturing description three",
      advance: "true",
      approved: "true",
      cad_url: "www.google.com",
      photo_url: "www.google.com",
      id: 3,
      comments: [],
      updated_at: "2018-11-18T14:53:08.533957"
    }
  ],
  submission:{
    description: "description four",
    manufacturing: "manufacturing description four",
    advance: "true",
    approved: "true",
    cad_url: "www.google.com",
    photo_url: "www.google.com",
    id: 4,
    comments: [],
    updated_at: "2018-11-18T14:53:08.533957"
  },
  comment: {
    approved: true,
    comments: "my feedback",
    version: "2018-11-18T14:53:08.533957",
    user_id: 1,
    created_at: "2018-11-18T14:53:08.533957",
    updated_at: "2018-11-18T14:53:08.533957",
    submission_id: 4,
    id: "1"
  }
}

const store = mockStore(initialState);

describe('<Submission />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<Submission store={store} />);
      // const component = wrapper.dive();

      expect(toJson(wrapper)).toMatchSnapshot();
    });

    // test to render model from contentful
  });
});
