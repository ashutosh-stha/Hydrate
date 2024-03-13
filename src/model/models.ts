import { Models } from '@rematch/core';
import { httpClient } from './httpClient/httpClient';
import { user } from './user/user';
import { authentication } from './user/authentication';
import { notifications } from './user/notification';

export interface RootModel extends Models<RootModel> {
  httpClient: typeof httpClient;
  user: typeof user;
  authentication: typeof authentication;
  notifications: typeof notifications;
}

export const models: RootModel = {
  httpClient,
  user,
  authentication,
  notifications,
};
