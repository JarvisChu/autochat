import React, { useEffect } from 'react';
import { ConfigProvider, Layout, message } from 'antd';
import { useHistory, useModel } from 'umi';
import { getToken } from '@/util/token';

const { Content } = Layout;

interface IContainerProps {
    children: React.ReactChild;
}

const BaseContainer = (props: IContainerProps) => {
    const history = useHistory();
    const { isLogin, onSetToken} = useModel('auth', (model) => ({
        isLogin: model.isLogin,
        onSetToken: model.onSetToken,
      }));

    useEffect(()=>{
        message.config({
            top: 100,
        });
        const location: any = history.location;
        const {token: queryToken} = location.query; // 解构出字段 token，并重命名为 queryToken
        const localToken = getToken();
        if (queryToken){
            onSetToken(queryToken);
        } else if (localToken) {
            onSetToken(localToken);
        } else {
            history.push('/login');
        }
    }, []);

    useEffect(()=> {
        if (isLogin) {
            history.push('/chat')
        }else {
            history.push('/login')
        }

    }, [isLogin]);

    return <ConfigProvider autoInsertSpaceInButton={false}>
        <Layout>
            <Content>{props.children}</Content>
        </Layout>
    </ConfigProvider>
}

export default BaseContainer;