import React from 'react';
import { Input, Menu, Row, Col } from 'antd';
import Link from 'next/link';
import styled, { createGlobalStyle } from 'styled-components';

import UserProfile from '../common/UserProfile';
import LoginForm from '../common/LoginForm';
import { useTypedSelector } from '@/store';

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const Global = createGlobalStyle`
  .ant-row {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }

  .ant-col:first-child {
    padding-left: 0 !important;
  }

  .ant-col:last-child {
    padding-right: 0 !important;
  }
`;

interface Props {
  children: React.ReactNode;
}

const AppLayout = ({ children }: Props) => {
  const { me, loginLoading, logoutLoading, loginDone } = useTypedSelector((state) => state.user);

  return (
    <>
      <Global />
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/">Home</Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile">profile</Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput enterButton />
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup">signup</Link>
        </Menu.Item>
      </Menu>
      <Row gutter={10}>
        <Col xs={24} md={6}>
          {loginDone ? (
            <UserProfile me={me} logoutLoading={logoutLoading} />
          ) : (
            <LoginForm loginLoading={loginLoading} />
          )}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a href="https://gitlab.com/chaosts0981" target="_blank" rel="noreferrer noopener">
            Made by Song
          </a>
        </Col>
      </Row>
    </>
  );
};

export default AppLayout;
