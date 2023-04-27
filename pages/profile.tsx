import Head from 'next/head';
import React, { FC } from 'react';

import AppLayout from '@/components/layout/AppLayout';
import FollowList from '@/components/common/FollowList';
import NicknameEditForm from '@/components/common/NicknameEditForm';
import { useTypedSelector } from '@/store';

const Profile: FC = () => {
  const { me } = useTypedSelector((state) => state.user);

  if (!me) {
    return null;
  }

  return (
    <AppLayout>
      <Head>
        <title>Profile | NodeBird</title>
      </Head>
      <NicknameEditForm />
      <FollowList header="Following" data={me.Followings} />
      <FollowList header="Follower" data={me.Followers} />
    </AppLayout>
  );
};

export default Profile;
