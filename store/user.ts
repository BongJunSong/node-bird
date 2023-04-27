import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// user 스토어 타입 정의
export interface IUser {
  loginLoading: boolean;
  loginDone: boolean;
  loginError: {} | null;
  logoutLoading: boolean;
  logoutDone: boolean;
  logoutError: {} | null;
  signupLoading: boolean;
  signupDone: boolean;
  signupError: {} | null;
  nicknameLoading: boolean;
  nicknameDone: boolean;
  nicknameError: {} | null;
  me: {
    nickname: string;
    Followings: [];
    Followers: [];
    userId: number | undefined;
  } | null;
}

// user스토어의 초기값을 설정
export const initialState: IUser = {
  loginLoading: false,
  loginDone: false,
  loginError: null,
  logoutLoading: false,
  logoutDone: false,
  logoutError: null,
  signupLoading: false,
  signupDone: false,
  signupError: null,
  nicknameLoading: false,
  nicknameDone: false,
  nicknameError: null,
  me: {
    Followings: [],
    Followers: [],
    userId: undefined,
    nickname: '',
  },
};

const dummyUser = (data: any) => ({
  ...data,
  nickname: 'king',
  userId: 1,
  Posts: [],
  Followings: [],
  Followers: [],
});

const name = 'user';

// ducks 패턴을 지원하기 위해 나온 함수가 createSlice.
const userSlice = createSlice({
  name, // 해당 모듈의 이름. store.user 형식으로 추후 접근
  initialState,
  reducers: {
    loginReqAction: (state: IUser, action: PayloadAction<{ email: string; password: string }>) => {
      const { email, password } = action.payload;
      console.log(email, password);
      state.loginLoading = true;
      state.loginError = null;
    },
    loginSucAction: (state: IUser, action: PayloadAction<{ email: string; password: string }>) => {
      const { email, password } = action.payload;
      console.log(email, password);
      state.loginLoading = false;
      state.loginDone = true;
      state.me = dummyUser(action.payload);
    },
    loginFailAction: (state: IUser, action: PayloadAction<{ error: any }>) => {
      const { error } = action.payload;
      state.loginLoading = false;
      state.loginDone = false;
      state.loginError = error.response.data;
    },
    logoutReqAction: (state: IUser) => {
      state.logoutLoading = true;
      state.logoutDone = false;
      state.logoutError = null;
    },
    logoutSucAction: (state: IUser) => {
      state.logoutLoading = false;
      state.logoutDone = true;
      state.loginDone = false;
      state.me = null;
    },
    logoutFailAction: (state: IUser, action: PayloadAction<{ error: any }>) => {
      const { error } = action.payload;
      state.logoutLoading = false;
      state.logoutDone = false;
      state.logoutError = error.response.data;
    },
    signupReqAction: (state: IUser, action: PayloadAction<{ email: string; password: string; nickname: string }>) => {
      const { email, password, nickname } = action.payload;
      console.log(email, password, nickname);
      state.signupLoading = true;
      state.signupDone = false;
      state.signupError = null;
    },
    signupSucAction: (state: IUser, action: PayloadAction<{ email: string; password: string }>) => {
      const { email, password } = action.payload;
      console.log(email, password);
      state.signupLoading = false;
      state.signupDone = true;
    },
    signupFailAction: (state: IUser, action: PayloadAction<{ error: any }>) => {
      const { error } = action.payload;
      state.signupLoading = false;
      state.signupDone = false;
      state.signupError = error.response.data;
    },
    changeNicknameReqAction: (
      state: IUser,
      action: PayloadAction<{ email: string; password: string; nickname: string }>,
    ) => {
      state.nicknameLoading = true;
      state.nicknameDone = false;
      state.nicknameError = null;
    },
    changeNicknameSucAction: (state: IUser, action: PayloadAction<{ email: string; password: string }>) => {
      const { email, password } = action.payload;
      console.log(email, password);
      state.nicknameLoading = false;
      state.nicknameDone = true;
    },
    changeNicknameFailAction: (state: IUser, action: PayloadAction<{ error: any }>) => {
      const { error } = action.payload;
      state.nicknameLoading = false;
      state.nicknameDone = false;
      state.signupError = error.response.data;
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice.reducer;
