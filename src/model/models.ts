import { Models } from '@rematch/core';
import { httpClient } from './httpClient/httpClient';
import { user } from './user/user';

export interface RootModel extends Models<RootModel> {
  httpClient: typeof httpClient;
  user: typeof user;
}

export const models: RootModel = { httpClient, user };
