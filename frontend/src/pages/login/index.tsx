import { useRef } from 'react';
import { Button, Card, Form, Input, message } from 'antd';
import { userService } from '@/service';
import { useModel } from 'umi';
import { history } from '@/.umi/core/history';
import './index.less';

export default function LoginPage() {

  const { onSetToken } = useModel('auth', (model) => ({
    onSetToken: model.onSetToken,
  }));

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    const {username, password} = values;
    console.log('name:', username, ", password:", password);
    const res = await userService.login(username, password);
    console.log("res:", res);
    if(res.code != 200) {
      if (res.msg && res.msg.length > 0) {
        message.error(res.msg);
      }
    }else {
      console.log("token:", res.token);
      onSetToken(res.token);
      history.push('/autoTag');
    }
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="m-login">
      <Form
       className='m-login-form'
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
