import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import getBaseRequestConfig from "./utils/baseRequestConfig";
import { ApiRequest } from "./types/types";

export default class Skola24Client
{

    public getActiveYears: ApiRequest<{}, object>;
    public getUnits: ApiRequest<{}, object>;

    constructor()
    {
        this.getActiveYears = Skola24Client.createApiRequest("/get/active/school/years", this)
        this.getUnits = Skola24Client.createApiRequest("/services/skola24/get/timetable/viewer/units", this)
    }

    private static createApiRequest<D extends object, R>(url: string, client: Skola24Client): ApiRequest<D, R> {
        return async (data: D = {} as D, additionalRequestParams: object = {}) => {
            return client.executeApiRequest<R>(url, data, additionalRequestParams);
        };
    }

    private async executeApiRequest<T>(url: string, data: object = {}, additionalRequestParams: object = {}): Promise<T> {
        const config: AxiosRequestConfig = {
            ...getBaseRequestConfig(),
            data: data,
            params: additionalRequestParams,
            url: url
        }
        const client = axios.create(config)
        return client.request(config)
    }

}