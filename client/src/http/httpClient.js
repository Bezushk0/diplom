import { accessTokenService } from "../services/accessTokenService";
import { authService } from "../services/authService";
import { createClient } from "./index";

export const httpClient = createClient();

httpClient.interceptors.request.use(onRequest);
httpClient.interceptors.response.use(onResponseSuccess, onResponseError)

function onRequest(request) {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
        request.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return request;
}

function onResponseSuccess(res) {
    return res.data;
}

async function onResponseError(error) {
    const originalRequest = error.config;

    if (error.response.status !== 401) {
        throw error;
    }

    // eslint-disable-next-line no-useless-catch
    try {
        const { accessToken } = await authService.refresh();

        accessTokenService.save(accessToken);

        return httpClient.request(originalRequest);
    } catch (error) {
        throw error;
    }
}