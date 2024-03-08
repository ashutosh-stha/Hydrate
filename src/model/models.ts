import { Models } from '@rematch/core';
import { httpClient } from './httpClient/httpClient';

export interface RootModel extends Models<RootModel> {
  httpClient: typeof httpClient;
}

export const models: RootModel = { httpClient };
