import Reducer from '../../app/redux/reducers';

import {
  USER_AUTH, // Only ones related to the reducer being tested
} from '../../app/redux/actions';

describe('USER_AUTH', () => {
  test('returns the correct state', () => {
    const action = { type: USER_AUTH, payload: { user: {email: "amhasler@gmail.com", first_name: "adam", last_name: "hasler", role: "designer", id: 5, charges: []}} };

    expect(Reducer(undefined, action)).toMatchSnapshot();
  });
});
