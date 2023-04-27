import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import shortid from 'shortid';

// user 스토어 타입 정의
export interface IPost {
  mainPosts: any;
  imagePaths: {};
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: {} | null;
  addCommentLoading: boolean;
  addCommentDone: boolean;
  addCommentError: {} | null;
}

export const initialState: IPost = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: '제로초',
      },
      content: '첫 번째 게시글 #해시태그 #익스프레스',
      Images: [
        {
          src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
        },
        {
          src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
        },
        {
          src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
        },
      ],
      Comments: [
        {
          User: {
            nickname: 'nero',
          },
          content: '우와 개정판이 나왔군요~',
        },
        {
          User: {
            nickname: 'hero',
          },
          content: '얼른 사고싶어요~',
        },
      ],
    },
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

const dummyPost = (text: string) => ({
  id: shortid.generate(),
  content: text,
  User: {
    id: 1,
    nickname: '제로초',
  },
  Images: [],
  Comments: [],
});

const dummyComment = (content: string) => ({
  User: {
    nickname: 'man',
  },
  content: content,
});

const name = 'post';

// ducks 패턴을 지원하기 위해 나온 함수가 createSlice.
const postSlice = createSlice({
  name, // 해당 모듈의 이름. store.user 형식으로 추후 접근
  initialState,
  reducers: {
    addPostReqAction: (state: IPost, action: PayloadAction<{ text: string }>) => {
      state.addPostLoading = true;
      state.addPostDone = false;
      state.addPostError = null;
    },
    addPostSucAction: (state: IPost, action: PayloadAction<{ text: string }>) => {
      state.mainPosts.unshift(dummyPost(action.payload.text));
      state.addPostDone = true;
      state.addPostLoading = false;
    },
    addPostErrorAction: (state: IPost, action: PayloadAction<{ error: any }>) => {
      const { error } = action.payload;
      state.addPostLoading = false;
      state.addPostError = error.response.data;
    },
    addCommentReqAction: (state: IPost, action: PayloadAction<{ content: string; postId: number; userId: number }>) => {
      state.addCommentLoading = true;
      state.addCommentDone = false;
      state.addCommentError = null;
    },
    addCommentSucAction: (state: IPost, action: PayloadAction<{ content: string; postId: number; userId: number }>) => {
      const post = state.mainPosts.find((v: any) => v.id === action.payload.postId);
      post?.Comments.unshift(dummyComment(action.payload.content));
      state.addCommentDone = true;
      state.addCommentLoading = false;
    },
    addCommentErrorAction: (state: IPost, action: PayloadAction<{ error: any }>) => {
      const { error } = action.payload;
      state.addCommentLoading = false;
      state.addCommentError = error.response.data;
    },
  },
});

export const postAction = postSlice.actions;
export default postSlice.reducer;
