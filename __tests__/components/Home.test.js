import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";

import Home from '../../app/components/Home';
import { mapStateToProps, mapDispatchToProps } from '../../app/components/Home';

const mockStore = configureMockStore([thunk]);
const store = mockStore();

describe('<Home />', () => {
  let wrapper, store;
  // our mock login function to replace the one provided by mapDispatchToProps
  const mockContentfn = jest.fn();
  const mockPostsfn = jest.fn();
  const mockModalfn = jest.fn();

   beforeEach(() => {
     const initialState = {
       welcomeModal: true
     };
     store = mockStore(initialState);
     // pass the mock function as the login prop
     wrapper = shallow(<Home store={store} getContent={mockContentfn} fetchPosts={mockPostsfn} toggleModal={mockModalfn} />);
   })

   test('renders the component', () => {
     expect(wrapper).toMatchSnapshot();
   });

});
