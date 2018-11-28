import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

import Show from '../../app/components/Show';

describe('<Show />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<Show />);
      // const component = wrapper.dive();

      expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('calls setModel on mount', async () => {
      const wrapper = shallow(<Show />);
      const spy = jest.spyOn(wrapper.instance(), "setModel");
      wrapper.instance().forceUpdate();
      wrapper.instance().componentDidMount();

      const data = await wrapper.instance().fetchModel();
      expect(spy).toHaveBeenCalled();
    })
  });
});
