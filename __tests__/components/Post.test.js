import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";

import Post from '../../app/components/Post';

const mockStore = configureMockStore([thunk]);
const store = mockStore();

describe('<Post />', () => {
  let wrapper;
  // our mock login function to replace the one provided by mapDispatchToProps
  const mockContentfn = jest.fn();

   beforeEach(() => {
     // pass the mock function as the login prop
     wrapper = shallow(<Post store={store} getContent={mockContentfn} />);
   })

  test('renders the component', () => {
    expect(wrapper).toMatchSnapshot();
  });

});
