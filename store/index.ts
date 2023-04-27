import { createWrapper, HYDRATE, MakeStore } from 'next-redux-wrapper';
import { AnyAction, CombinedState, combineReducers, Store } from 'redux';
import { configureStore, EnhancedStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import userSlice, { IUser } from '@/store/user';
import postSlice, { IPost } from '@/store/post';
import rootSaga from '@/sagas';

const rootReducer = (state: CombinedState<{ user: IUser; post: IPost }> | undefined, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE', action);
      return { ...state, ...action.payload };
    default: {
      const combinedReducer = combineReducers({
        user: userSlice,
        post: postSlice,
      });
      return combinedReducer(state, action);
    }
  }
};

const isDev = process.env.NODE_ENV === 'development';

const loggerMiddleware = getDefaultMiddleware();
if (isDev) {
  loggerMiddleware.push(logger);
}

const sagaMiddleware = createSagaMiddleware();

const createStore = () => {
  const store = configureStore({
    reducer: rootReducer, // 위에서 만든 persistReducer를 대입
    devTools: isDev, // redux devTool을 보일건지 말건지에 대한 유무
    middleware: [sagaMiddleware, ...loggerMiddleware],
  });
  // saga를 실행
  sagaMiddleware.run(rootSaga);
  return store;
};

const setupStore = (context: any): EnhancedStore => createStore();
const makeStore: MakeStore<EnhancedStore> = (context) => setupStore(context);

export const wrapper = createWrapper<Store>(makeStore, { debug: process.env.NODE_ENV !== 'production' });

const RootType = createStore().getState;

export type RootState = ReturnType<typeof RootType>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
