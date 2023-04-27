import React, { FC, useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch } from 'react-redux';

import { userAction } from '@/store/user';

interface Props {
  logoutLoading: boolean;
  me: any;
}

const UserProfile: FC<Props> = ({ logoutLoading, me }) => {
  const dispatch = useDispatch();

  const onClickLogout = useCallback(() => {
    dispatch(userAction.logoutReqAction());
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          twit
          <br />
          {me.Posts?.length}
        </div>,
        <div key="followings">
          followings
          <br />
          {me.Followings?.length}
        </div>,
        <div key="followers">
          followers
          <br />
          {me.Followers?.length}
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>{me.nickname[0]}</Avatar>} title={me.nickname} />
      <Button style={{ marginTop: 10, marginLeft: 47 }} onClick={onClickLogout} loading={logoutLoading}>
        Logout
      </Button>
    </Card>
  );
};

export default UserProfile;
