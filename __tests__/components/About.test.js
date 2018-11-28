import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import 'jest-dom/extend-expect';
import { createClient } from "contentful";

import About from '../../app/components/About';

const client = createClient({
  space: 'foo-space',
  accessToken: 'bar-token',
  host: "127.0.0.1:8090",
  insecure: true
});

/*
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

const contentModel = {
  fields: {
    head: "radically rewriting the book",
    subhead: "we're going to change everything",
    bodyText: "Content content content",
    visual: {
      sys: {
        id: 10
      }
    },
    subhead2: "more content",
    bodyText2: "even more content",
    visual: {
      sys: {
        id: 12
      }
    },
    subhead3: "more content",
    bodyText3: "even more content",
    visual: {
      sys: {
        id: 13
      }
    },
    subhead3: "more content",
    bodyText3: "even more content",
  }
}
*/

/*
describe('Contentful mocking', () => {
  it('should be possible to mock Contentful', (done) => {
    const client = { getEntry: () => { return Promise.resolve(); } };
    const spy = {
      fn: (value) => {
        expect(value).toBe('yeah');
        done();
      },
    };

    spyOn(contentful.default, 'createClient').and.returnValue(client);

    fetchModel()(spy.fn);
  });
});
*/
describe('<About />', () => {
  describe('render()', () => {
    // jest.mock("./__mocks__/contentful.js")

    //test('renders the component', () => {
    //  const wrapper = shallow(<About />);
      // const component = wrapper.dive();

      //expect(toJson(wrapper)).toMatchSnapshot();
    //});

    //test('renders Hubspot form', () => {
    //  const wrapper = mount(<div className="hbspt-form" />);
    //  expect(wrapper.exists('.hbspt-form')).toEqual(true)

    // })

    //test('calls setModel on mount', () => {
      //const wrapper = shallow(<About />);

      //setTimeout(() => {
      //  wrapper.update();

      //  const state = wrapper.instance().state;

      //  console.log(state)
        //expect(state.term).toEqual("Mountains");
        //expect(state.status).toEqual("done");
        //expect(state.images.length).toEqual(1);

        //expect(wrapper.find("Image").length).toEqual(1);

      //  done();
      // });

      /*
      const wrapper = shallow(<About />);
      const spy = jest.spyOn(wrapper.instance(), "setModel");
      wrapper.instance().forceUpdate();
      const data = await wrapper.instance().fetchModel();
      expect(spy).toHaveBeenCalled();
      done()
      */
    //})
  });
});
