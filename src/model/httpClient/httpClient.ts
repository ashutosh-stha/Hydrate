import {createModel} from '@rematch/core';
import ApiService from '../../controller/ApiService';
import {RootModel} from '../models';

const BASE_URL = 'https://www.google.com';

interface HttpClientState {
  apiService?: ApiService;
}

const initialState: HttpClientState = {
  apiService: undefined,
};

export const httpClient = createModel<RootModel>()({
  state: initialState,
  reducers: {
    setApiSerivce(state, payload) {
      return {...state, apiService: payload};
    },
  },
  effects: dispatch => ({
    intializeHttpClient() {
      const apiService = new ApiService(BASE_URL);
      dispatch.httpClient.setApiSerivce(apiService);
    },
  }),
});
