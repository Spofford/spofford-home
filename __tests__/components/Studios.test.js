import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

import Studios from '../../app/components/Studios';

describe('<Studios />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<Studios />);
      // const component = wrapper.dive();

      expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('calls setModel on mount', async () => {
      const wrapper = shallow(<Studios />);
      const spy = jest.spyOn(wrapper.instance(), "setModel");
      wrapper.instance().forceUpdate();
      wrapper.instance().componentDidMount();

      const data = await wrapper.instance().fetchModel();
      expect(spy).toHaveBeenCalled();

      spy.mockRestore();
    })
  });
});
