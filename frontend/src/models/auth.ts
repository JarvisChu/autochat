import { userService } from "@/service";
import { removeToken, setToken } from "@/util/token";
import { useCallback, useState } from "react";

interface IUserInfo {
    name: string;
}

export default function useAuthModel() {
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<any[]>();

    const getUserInfoDetail = useCallback(async () => {
        const res = await userService.getUserInfoDetail();
        setUserInfo(res?.data);
    }, []);

    const onSetToken = useCallback((token: string) => {
        setIsLogin(true);
        setToken(token);
        getUserInfoDetail();
    }, []);

    const onLogout = useCallback(() => {
        removeToken();
        setIsLogin(false);
    }, [])

    return {
        userInfo,
        isLogin,
        onSetToken,
        onLogout,
    }

    

}