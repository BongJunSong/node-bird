import Head from 'next/head';
import React from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { Button, Form, Input, Checkbox } from 'antd';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import AppLayout from '@/components/layout/AppLayout';
import { userAction } from '@/store/user';
import { useTypedSelector } from '@/store';

type UserSubmitForm = {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const Signup = () => {
  const dispatch = useDispatch();

  const { signupLoading } = useTypedSelector((state) => state.user);

  const validationSchema = Yup.object().shape({
    nickname: Yup.string()
      .required('nickname is required')
      .min(6, 'nickname must be at least 6 characters')
      .max(20, 'nickname must not exceed 20 characters'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Confirm Password does not match'),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required').required('Accept Terms is required'),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationSchema),
  });

  const onClickSignup = (data: UserSubmitForm) => {
    console.log(data);
    dispatch(userAction.signupReqAction({ email: data.email, password: data.password, nickname: data.nickname }));
  };

  return (
    <AppLayout>
      <Head>
        <title>Signup | NodeBird</title>
      </Head>
      <Form onFinish={handleSubmit(onClickSignup)}>
        <div>
          <label htmlFor="user-nickname">nickname</label>
          <Controller
            name="nickname"
            control={control}
            render={({ field }) => <Input {...field} type="text" placeholder="nickname" />}
          />
          {errors.nickname && <div>{errors.nickname.message}</div>}
        </div>
        <div>
          <label htmlFor="email">email</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => <Input {...field} type="email" placeholder="email" />}
          />
          {errors.email && <div>{errors.email?.message}</div>}
        </div>
        <div>
          <label htmlFor="user-password">password</label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => <Input {...field} type="password" placeholder="password" />}
          />
          {errors.password && <div>{errors.password.message}</div>}
        </div>
        <div>
          <label htmlFor="user-password-check">confirmPassword</label>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => <Input {...field} type="password" placeholder="confirmPassword" />}
          />
          {errors.confirmPassword && <div>{errors.confirmPassword.message}</div>}
        </div>
        <div>
          <label htmlFor="check">acceptTerms</label>
          <Controller name="acceptTerms" control={control} render={({ field }) => <Checkbox {...field} />} />
          {errors.acceptTerms && <div>{errors.acceptTerms.message}</div>}
        </div>
        <ButtonWrapper>
          <Button type="primary" htmlType="submit" loading={signupLoading}>
            Signup
          </Button>
        </ButtonWrapper>
      </Form>
    </AppLayout>
  );
};

export default Signup;
