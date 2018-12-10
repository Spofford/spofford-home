import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// Actions to be tested
import { userNew } from '../../app/redux/actions';

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

const store = mockStore({});

describe('actions', () => {
  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
  });

  describe('userNew', () => {
    test('Dispatches the correct action and payload', () => {
      store.dispatch(userNew(1));
      expect(store.getActions()).toMatchSnapshot();
    });
  });

});
