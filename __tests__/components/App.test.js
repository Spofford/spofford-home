import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";

import App from '../../app/components/App';

const mockStore = configureMockStore([thunk]);
const store = mockStore();

describe('<App />', () => {
  let wrapper, store;
  // our mock login function to replace the one provided by mapDispatchToProps
  const mockAuthfn = jest.fn();

   beforeEach(() => {
     const initialState = {};
     store = mockStore(initialState);
     // pass the mock function as the login prop
     wrapper = shallow(<App store={store} userAuth={mockAuthfn} />);
   })

   test('renders the component', () => {
     expect(wrapper).toMatchSnapshot();
   });

});
