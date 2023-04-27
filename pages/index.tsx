import React from 'react';
import { useDispatch } from 'react-redux';

import AppLayout from '@/components/layout/AppLayout';
import { useTypedSelector } from '@/store';
import PostForm from '@/components/PostForm';
import PostCard from '@/components/PostCard';

const index = () => {
  const { user, post } = useTypedSelector((state) => state);
  const dispatch = useDispatch();
  console.log('post', post);
  return (
    <AppLayout>
      {user.loginDone && (
        <PostForm
          addPostDone={post.addPostDone}
          imagePaths={post.imagePaths}
          addCommentLoading={post.addCommentLoading}
        />
      )}
      {post.mainPosts?.map((post: any) => (
        <PostCard key={post.id} post={post} userId={user.me?.userId} />
      ))}
    </AppLayout>
  );
};

export default index;
