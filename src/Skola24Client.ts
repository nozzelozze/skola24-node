import axios, { AxiosRequestConfig } from "axios";
import { AdditionalAxiosRequestConfig, ApiRequest, CreateApiRequest } from "./types/types";
import getBaseRequestConfig from "./utils/baseRequestConfig";
import { BaseResponse } from "./types/Response";
import { Services, Timetable, Utilities } from "./modules";
import Host from "./utils/hosts";

class Skola24Client
{

    public HostName: Host;

    public Timetable: Timetable
    public Services: Services
    public Utilities: Utilities

    constructor(hostName: Host)
    {
        this.HostName = hostName
        const createApiRequest = this.createApiRequest.bind(this)
        this.Timetable = new Timetable(createApiRequest, this)
        this.Services = new Services(createApiRequest, this)
        this.Utilities = new Utilities(createApiRequest, this)
    }

    private async executeApiRequest<R extends object>(url: string, data: object = {}, additionalConfig?: AdditionalAxiosRequestConfig): Promise<BaseResponse<R>>
    {
        const config: AxiosRequestConfig = {
            data: data,
            url: url,
            ...additionalConfig,
            ...getBaseRequestConfig(),
        }
        const response = await axios.create(config).request(config)

        // error handling

        return response.data
    }

    private createApiRequest: CreateApiRequest = <D extends object, R extends object>(url: string): ApiRequest<D, R> =>
    {
        return async (data: D, additionalConfig?: AdditionalAxiosRequestConfig) =>
        {
            return this.executeApiRequest<R>(url, data, additionalConfig)
        }
    }
}

export default Skola24Client
