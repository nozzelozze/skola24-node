import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { BaseResponse, ResponseData } from "./types/Response";
import { ApiRequest } from "./types/types";
import getBaseRequestConfig from "./utils/baseRequestConfig";
import { RequestData } from "./types/Request";

export default class Skola24Client
{

    public getActiveSchoolYears: ApiRequest<RequestData.getActiveSchoolYears, ResponseData.getActiveSchoolYears>
    public servicesSkola24GetTimetableViewerUnits: ApiRequest<RequestData.servicesSkola24GetTimetableViewerUnits, ResponseData.servicesSkola24GetTimetableViewerUnits>
    public getTimetableRenderKey: ApiRequest<RequestData.getTimetableRenderKey, ResponseData.getTimetableRenderKey>
    public getTimetableSelection: ApiRequest<RequestData.getTimetableSelection, ResponseData.getTimetableSelection>
    public servicesSkola24GetPersonalTimetables: ApiRequest<RequestData.servicesSkola24GetPersonalTimetables, ResponseData.servicesSkola24GetPersonalTimetables>
    public renderTimetable: ApiRequest<RequestData.renderTimetable, ResponseData.renderTimetable>
    public encryptSignature: ApiRequest<RequestData.encryptSignature, ResponseData.encryptSignature>
    public getRolesForTimetableViewer: ApiRequest<RequestData.getRolesForTimetableViewer, ResponseData.getRolesForTimetableViewer>
    
    constructor()
    {
        this.getActiveSchoolYears = Skola24Client.createApiRequest("/get/active/school/years", this)
        this.servicesSkola24GetTimetableViewerUnits = Skola24Client.createApiRequest("/services/skola24/get/timetable/viewer/units", this)
        this.getTimetableRenderKey = Skola24Client.createApiRequest("/get/timetable/render/key", this)
        this.getTimetableSelection = Skola24Client.createApiRequest("/get/timetable/selection", this)
        this.servicesSkola24GetPersonalTimetables = Skola24Client.createApiRequest("/services/skola24/get/personal/timetables", this)
        this.renderTimetable = Skola24Client.createApiRequest("/render/timetable", this)
        this.encryptSignature = Skola24Client.createApiRequest("/encrypt/signature", this)
        this.getRolesForTimetableViewer = Skola24Client.createApiRequest("/get/roles/for/timetable/viewer", this)
    }
    
    private static createApiRequest<D extends object, R extends object>(url: string, client: Skola24Client): ApiRequest<D, R>
    {
        return async (data: D, additionalRequestParams: object = {}) =>
        {
            return client.executeApiRequest<R>(url, data, additionalRequestParams)
        }
    }

    private async executeApiRequest<R extends object>(url: string, data: object = {}, additionalRequestParams: object = {}): Promise<BaseResponse<R>>
    {
        const config: AxiosRequestConfig =
        {
            ...getBaseRequestConfig(),
            data: data,
            params: additionalRequestParams,
            url: url
        }
        const response = await axios.create(config).request(config)
        
        // ERROR HANDLING

        return response.data
    }

}