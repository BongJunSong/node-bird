import { Button, Form, Input } from 'antd';
import React, { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import useInput from '@/hooks/useInput';
import { postAction } from '@/store/post';
import { useEffect } from 'react';
import { useTypedSelector } from '@/store';

interface Props {
  post: any;
  userId: number;
}

const CommentForm: FC<Props> = ({ post, userId }) => {
  const dispatch = useDispatch();
  const { addCommentDone } = useTypedSelector((state) => state.post);

  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  const onSubmitComment = useCallback(() => {
    console.log(commentText, post.id);
    dispatch(postAction.addCommentReqAction({ content: commentText, postId: post.id, userId }));
  }, [commentText, post.id, userId]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: 'relative', margin: 0 }}>
        <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
        <Button type="primary" htmlType="submit" style={{ position: 'absolute', right: 0, bottom: -40, zIndex: 1 }}>
          submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommentForm;
