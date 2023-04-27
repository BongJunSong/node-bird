import { fork, all, takeLatest, delay, put, call, AllEffect, ForkEffect } from 'redux-saga/effects';
import axios from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';

import { userAction } from '@/store/user';

function loginUserAPI(data: { email: string; password: string }) {
  return axios.post('http://', data);
}

function* loginUser(action: PayloadAction<{ email: string; password: string }>) {
  try {
    // const result = yield call(loginUserAPI, action.payload);
    yield delay(1000);
    yield put(userAction.loginSucAction(action.payload));
  } catch (err) {
    console.error(err);
    yield put(userAction.loginFailAction({ error: err }));
  }
}

function* logoutUser(action: PayloadAction<{ email: string; password: string }>) {
  try {
    // const result = yield call(loginUserAPI, action.payload);
    yield delay(1000);
    yield put(userAction.logoutSucAction());
  } catch (err) {
    console.error(err);
    yield put(userAction.logoutFailAction({ error: err }));
  }
}

function* signupUser(action: PayloadAction<{ email: string; password: string; nickname: string }>) {
  try {
    // const result = yield call(loginUserAPI, action.payload);
    yield delay(1000);
    yield put(userAction.signupSucAction(action.payload));
  } catch (err) {
    console.error(err);
    yield put(userAction.signupFailAction({ error: err }));
  }
}

function* watchLoginUser() {
  yield takeLatest(userAction.loginReqAction.type, loginUser);
}

function* watchLogoutUser() {
  yield takeLatest(userAction.logoutReqAction.type, logoutUser);
}

function* watchSignupUser() {
  yield takeLatest(userAction.signupReqAction.type, signupUser);
}

export default function* userSaga(): Generator<AllEffect<ForkEffect<void>>, void, unknown> {
  yield all([fork(watchLoginUser), fork(watchLogoutUser), fork(watchSignupUser)]);
}
