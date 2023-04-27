import { Button, Form, Input } from 'antd';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import React, { FC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { userAction } from '@/store/user';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

type UserSubmitForm = {
  email: string;
  password: string;
};

interface Props {
  loginLoading: boolean;
}

const LoginForm: FC<Props> = ({ loginLoading }) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required(' is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationSchema),
  });

  const onClickLogin = (data: UserSubmitForm) => {
    const { email, password } = data;
    dispatch(userAction.loginReqAction({ email, password }));
    reset({
      password: '',
    });
  };

  return (
    <FormWrapper onFinish={handleSubmit(onClickLogin)}>
      <div>
        <label htmlFor="email">email</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => <Input {...field} type="email" placeholder="email" />}
        />
        {errors.email && <div>{errors.email.message}</div>}
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
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={loginLoading}>
          Login
        </Button>
        <Link href="/signup">
          <Button>Signup</Button>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default LoginForm;
