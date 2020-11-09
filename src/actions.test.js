import thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';

import {
  loadInitialData,
  setRegions,
  setCategories,
  loadRestaurants,
  loadRestaurant,
  setRestaurants,
  setRestaurant,
  setAccessToken,
  requestLogin,
  setReviews,
} from './actions';

import RESTAURANT from '../fixtures/restaurant';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('./services/api');

describe('actions', () => {
  let store;

  describe('loadInitialData', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    it('runs setRegions and setCategories', async () => {
      await store.dispatch(loadInitialData());

      const actions = store.getActions();

      expect(actions[0]).toEqual(setRegions([]));
      expect(actions[1]).toEqual(setCategories([]));
    });
  });

  describe('loadRestaurants', () => {
    context('with selectedRegion and selectedCategory', () => {
      beforeEach(() => {
        store = mockStore({
          selectedRegion: { id: 1, name: '서울' },
          selectedCategory: { id: 1, name: '한식' },
        });
      });

      it('runs setRestaurants', async () => {
        await store.dispatch(loadRestaurants());

        const actions = store.getActions();

        expect(actions[0]).toEqual(setRestaurants([]));
      });
    });

    context('without selectedRegion', () => {
      beforeEach(() => {
        store = mockStore({
          selectedCategory: { id: 1, name: '한식' },
        });
      });

      it('does\'nt run any actions', async () => {
        await store.dispatch(loadRestaurants());

        const actions = store.getActions();

        expect(actions).toHaveLength(0);
      });
    });

    context('without selectedCategory', () => {
      beforeEach(() => {
        store = mockStore({
          selectedRegion: { id: 1, name: '서울' },
        });
      });

      it('does\'nt run any actions', async () => {
        await store.dispatch(loadRestaurants());

        const actions = store.getActions();

        expect(actions).toHaveLength(0);
      });
    });
  });

  describe('loadRestaurant', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    it('dispatchs setRestaurant', async () => {
      await store.dispatch(loadRestaurant({ restaurantId: 1 }));

      const actions = store.getActions();

      expect(actions[0]).toEqual(setRestaurant(null));
      expect(actions[1]).toEqual(setRestaurant({}));
    });
  });

  describe('setAccessToken', () => {
    beforeEach(() => {
      store = mockStore({
        accessToken: '',
      });
    });

    it('dispatchs setAccessToken', async () => {
      const accessToken = 'ACCESS_TOKEN';
      await store.dispatch(setAccessToken(accessToken));

      const actions = store.getActions();

      expect(actions[0]).toEqual({
        type: 'setAccessToken',
        payload: { accessToken },
      });
    });
  });

  describe('requestLogin', () => {
    beforeEach(() => {
      store = mockStore({
        loginField: {
          email: 'test@test.com',
          password: 'test',
        },
      });
    });

    it('dispatchs setAccessToken', async () => {
      await store.dispatch(requestLogin());

      const actions = store.getActions();

      expect(actions[0]).not.toBeNull();
    });
  });

  describe('sendReview', () => {
    beforeEach(() => {
      store = mockStore({
        restaurant: RESTAURANT,
        reviewFields: {
          score: '',
          description: '',
        },
      });
    });

    it('sends review and returns nothing', async () => {
      const review = {
        id: 1, name: '테스터', description: 'JMT!', score: 4,
      };

      await store.dispatch(setReviews(review));

      const actions = store.getActions();

      expect(actions[0]).toEqual({
        type: 'setReviews',
        payload: { reviews: review },
      });
    });
  });
});
