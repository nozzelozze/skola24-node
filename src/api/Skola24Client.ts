import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import getBaseRequestConfig from "./utils/baseRequestConfig";
import { ApiRequest } from "./types/types";
import { Request } from "./types/Request";
import { BaseResponse, ResponseData } from "./types/Response";

export default class Skola24Client
{

    public getActiveSchoolYears: ApiRequest<
        Request.getActiveSchoolYears,
        BaseResponse<ResponseData.getActiveSchoolYears>
    >
        
    public getTimetableViewerUnits: ApiRequest<
        Request.getTimetableViewerUnits,
        BaseResponse<ResponseData.getTimetableViewerUnits>
    >
        
    public getTimetableRenderKey: ApiRequest<
        Request.getTimetableRenderKey,
        BaseResponse<ResponseData.getTimetableRenderKey>
    >
        
    public getTimetableSelection: ApiRequest<
        Request.getTimetableSelection,
        BaseResponse<ResponseData.getTimetableSelection>
    >
    public getPersonalTimetables: ApiRequest<
        Request.getPersonalTimetables,
        BaseResponse<ResponseData.getPersonalTimetables>
    >
    public renderTimetable: ApiRequest<
        Request.renderTimetable,
        BaseResponse<ResponseData.renderTimetable>
    >

    constructor()
    {
        this.getActiveSchoolYears = Skola24Client.createApiRequest("/get/active/school/years", this)
        this.getTimetableViewerUnits = Skola24Client.createApiRequest("/services/skola24/get/timetable/viewer/units", this)
        this.getTimetableRenderKey = Skola24Client.createApiRequest("/get/timetable/render/key", this)
        this.getTimetableSelection = Skola24Client.createApiRequest("/get/timetable/selection", this)
        this.getPersonalTimetables = Skola24Client.createApiRequest("/services/skola24/get/personal/timetables", this)
        this.renderTimetable = Skola24Client.createApiRequest("/render/timetable", this)
    }

    private static createApiRequest<D extends object, R>(url: string, client: Skola24Client): ApiRequest<D, R>
    {
        return async (data: D = {} as D, additionalRequestParams: object = {}) =>
        {
            return client.executeApiRequest<R>(url, data, additionalRequestParams)
        }
    }

    private async executeApiRequest<R>(url: string, data: object = {}, additionalRequestParams: object = {}): Promise<AxiosResponse<R>>
    {
        const config: AxiosRequestConfig =
        {
            ...getBaseRequestConfig(),
            data: data,
            params: additionalRequestParams,
            url: url
        }
        const client = axios.create(config)
        return client.request(config)
    }

}