import { API_HOST } from "@/constants";
import request from "@/util/request";

export const login = async (name: string, passwd: string) : Promise<any> => {
    return await request.post({
        path: `${API_HOST}/api/v1/login`,
        data: {
            name: name,
            passwd: passwd,
        },
    })
};

export const getUserInfoDetail = async (): Promise<any> => {
    return await request.get({
      path: `${API_HOST}/api/v1/user/info`,
    });
};

export const logout = async (): Promise<any> => {
    return await request.post({
      path: `${API_HOST}/api/v1/logout`,
    });
};

export const chat = async (messageList: any[]): Promise<any> => {
    return await request.post({
      path: `${API_HOST}/api/v1/chat`,
      data: messageList,
    });
};