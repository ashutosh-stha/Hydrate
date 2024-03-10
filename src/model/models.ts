import { Models } from '@rematch/core';
import { httpClient } from './httpClient/httpClient';
import { user } from './user/user';
import { authentication } from './user/authentication';

export interface RootModel extends Models<RootModel> {
  httpClient: typeof httpClient;
  user: typeof user;
  authentication: typeof authentication;
}

export const models: RootModel = { httpClient, user, authentication };
