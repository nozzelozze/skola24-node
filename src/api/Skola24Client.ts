import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import getBaseRequestConfig from "./utils/baseRequestConfig";
import { ApiRequest, BaseResponse, Request } from "./types/types";

export default class Skola24Client
{

    public getActiveSchoolYears: ApiRequest<Request.getActiveSchoolYears, BaseResponse<any>>;
    public getTimetableViewerUnits: ApiRequest<Request.getTimetableViewerUnits, BaseResponse<any>>;
    public getTimetableRenderKey: ApiRequest<Request.getTimetableRenderKey, BaseResponse<any>>;
    public getTimetableSelection: ApiRequest<Request.getTimetableSelection, BaseResponse<any>>
    public getPersonalTimetables: ApiRequest<Request.getPersonalTimetables, BaseResponse<any>>
    public renderTimetable: ApiRequest<Request.renderTimetable, BaseResponse<any>>

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
            return client.executeApiRequest<R>(url, data, additionalRequestParams);
        }
    }

    private async executeApiRequest<R>(url: string, data: object = {}, additionalRequestParams: object = {}): Promise<R>
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