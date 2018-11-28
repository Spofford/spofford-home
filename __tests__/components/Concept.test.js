import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'
import * as contentful from 'contentful'

import Concept from '../../app/components/Concept';

describe('<Concept />', () => {
  describe('render()', () => {
    var client = contentful.createClient({
      space: 'cahjy08ew1qz',
      accessToken: '37c6ec31a1a6cb3f533f51fa4c4af8fee88e2f910d9879eb79b2d073ae8cc499'
    });

    test('renders the component', () => {

      return client.getEntry("2hoOWLpmmoqi6mAygKGY6m").then(request => {
        client.getAsset(request.fields.primaryImage.sys.id).then(next => {
          const wrapper = shallow(<Concept concept={request} />);

          expect(toJson(wrapper)).toMatchSnapshot();
        })


      })


    });

    // Test for contentful content

  });
});
