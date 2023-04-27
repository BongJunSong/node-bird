import { Form, Input } from "antd";
import React from "react";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";

type NicknameEditForm = {
  userNickname: string;
};

const FormWrapper = styled(Form)`
  margin-bottom: 17px;
  border: 1px solid #d9d9d9;
  padding: 20px;
`;

const NicknameEditForm = () => {
  const validationSchema = Yup.object().shape({
    userNickname: Yup.string().required("nickname is required"),
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<NicknameEditForm>({
    resolver: yupResolver(validationSchema),
  });

  const modifyNickname = (data: NicknameEditForm) => {
    reset({
      userNickname: "",
    });
    console.log(data);
  };

  return (
    <FormWrapper onFinish={handleSubmit(modifyNickname)}>
      <Controller
        name="userNickname"
        control={control}
        render={({ field }) => (
          <Input.Search
            {...field}
            addonBefore="nickname"
            enterButton="modify"
          />
        )}
      />
      {errors.userNickname && <div>{errors.userNickname.message}</div>}
    </FormWrapper>
  );
};

export default NicknameEditForm;
