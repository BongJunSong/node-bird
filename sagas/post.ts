import { fork, all, takeLatest, delay, put, call, AllEffect, ForkEffect } from 'redux-saga/effects';
import axios from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';

import { postAction } from '@/store/post';

function addPostAPI(data: { postId: string }) {
  return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* addPost(action: PayloadAction<{ text: string }>) {
  try {
    // const result = yield call(addPostAPI, action.payload);
    yield delay(1000);
    yield put(postAction.addPostSucAction({ text: action.payload.text }));
  } catch (error) {
    console.error(error);
    yield put(postAction.addPostErrorAction({ error }));
  }
}

function* addComment(action: PayloadAction<{ content: string; postId: number; userId: number }>) {
  try {
    // const result = yield call(addPostAPI, action.payload);
    yield delay(1000);
    console.log(action.payload);
    yield put(postAction.addCommentSucAction(action.payload));
  } catch (error) {
    console.error(error);
    yield put(postAction.addCommentErrorAction({ error }));
  }
}

function* watchAddPost() {
  yield takeLatest(postAction.addPostReqAction.type, addPost);
}

function* watchAddComment() {
  yield takeLatest(postAction.addCommentReqAction.type, addComment);
}

export default function* postSaga(): Generator<AllEffect<ForkEffect<void>>, void, unknown> {
  yield all([fork(watchAddPost), fork(watchAddComment)]);
}
