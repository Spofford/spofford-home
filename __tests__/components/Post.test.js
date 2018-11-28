import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'
import * as contentful from 'contentful'

import Post from '../../app/components/Post';

const props = {
  match: {
    params: {
      entity: "719Ed2edIk8Yi2Img602A"
    }
  }
}


describe('<Post />', () => {
  describe('render()', () => {
    beforeEach(() => {
      var client = contentful.createClient({
        space: 'cahjy08ew1qz',
        accessToken: '37c6ec31a1a6cb3f533f51fa4c4af8fee88e2f910d9879eb79b2d073ae8cc499'
      });
    });

    test('renders the component', async () => {
      const wrapper = shallow(<Post {...props} />);
      const instance = wrapper.instance();

      const data = await instance.fetchModel();
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('calls setModel on mount', async () => {
      const wrapper = shallow(<Post {...props} />);
      const spy = jest.spyOn(wrapper.instance(), "setModel");
      wrapper.instance().forceUpdate();
      wrapper.instance().componentDidMount();

      const data = await wrapper.instance().fetchModel();
      expect(spy).toHaveBeenCalled();
    })

    // Test for contentful content

  });
});
