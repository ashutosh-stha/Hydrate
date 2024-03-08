import loadingPlugin, { ExtraModelsFromLoading } from '@rematch/loading';
import { RootModel, models } from './models';
import { RematchDispatch, RematchRootState, init } from '@rematch/core';

type FullModel = ExtraModelsFromLoading<RootModel>;

export const store = init<RootModel, FullModel>({
  models,
  plugins: [loadingPlugin()],
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel, FullModel>;
