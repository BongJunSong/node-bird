import { Button, Form, Input } from 'antd';
import React, { FC, useCallback, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { postAction } from '@/store/post';
import { useEffect } from 'react';
import useInput from '@/hooks/useInput';

interface Props {
  imagePaths: any;
  addCommentLoading: boolean;
  addPostDone: boolean;
}

const PostForm: FC<Props> = ({ imagePaths, addCommentLoading, addPostDone }) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [text, onChangeText, setText] = useInput('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const onSubmit = useCallback(() => {
    return dispatch(postAction.addPostReqAction({ text }));
  }, [text]);

  const onClickUpload = useCallback(() => {
    imageInputRef.current?.click();
  }, []);

  return (
    <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder="bb" />
      <div>
        <input type="file" ref={imageInputRef} multiple hidden />
        <Button onClick={onClickUpload}>image upload</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit" loading={addCommentLoading}>
          OK
        </Button>
      </div>
      <div>
        {imagePaths.map((path: string) => (
          <div key={path} style={{ display: 'inline-block' }}>
            <img src={path} style={{ width: '200px' }} alt={path} />
            <div>
              <Button>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
