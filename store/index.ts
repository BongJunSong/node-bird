import { createWrapper, HYDRATE, MakeStore } from 'next-redux-wrapper';
import { AnyAction, CombinedState, combineReducers, Store } from 'redux';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';

import userSlice from '@/store/user';

const rootReducer = (state: any, action: AnyAction): CombinedState<any> => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    default: {
      const combinedReducer = combineReducers(userSlice);
      return combinedReducer(state, action);
    }
  }
};

export const store = configureStore({
  reducer: rootReducer, // 위에서 만든 persistReducer를 대입
  devTools: process.env.NODE_ENV !== 'production', // redux devTool을 보일건지 말건지에 대한 유무
});

const makeStore: MakeStore<EnhancedStore> = () => store;

export const wrapper = createWrapper<Store>(makeStore, { debug: process.env.NODE_ENV !== 'production' });

export type RootState = ReturnType<typeof rootReducer>;
