import axios, { AxiosRequestConfig } from "axios";
import { AdditionalAxiosRequestConfig, ApiRequest, CreateApiRequest } from "./types/utilTypes";
import getBaseRequestConfig from "./utils/baseRequestConfig";
import { Services, Timetable, Utilities } from "./modules";
import Host from "./utils/hosts";
import Skola24Errors from "./error/Errors";
import { BaseResponse } from "./types/baseResponse";
import ResponseData from "./types/Response";

class Skola24Client
{

    public HostName: Host
    public UnitGuid: string
    public SchoolYear: string

    public Timetable: Timetable
    public Services: Services
    public Utilities: Utilities

    /**
     * Constructs a new instance of the client for interacting with the Skola24 API.
     * 
     * @param {Host} hostName - The domain of the host.
     * @param {boolean} supplyOwnRenderKey - Determines if you need to provide your own render key:
     *                                        - `true`: Provide your own render key using `Skola24Client.Timetable.getRenderKey`.
     *                                        - `false`: `Skola24Client.Timetable.renderTimetable` will automatically fetch a render key.
     *                                        - Recommended: `false` for automatic fetching.
     * @param {boolean} supplyOwnSchoolYear - Determines if you need to provide your own school year:
     *                                         - `true`: Provide your own school year using `Skola24Client.Utilities.getActiveSchoolYears`.
     *                                         - `false`: The client will immediately use `Skola24Client.Utilities.getActiveSchoolYears`
     *                                                   and use the first school year in the fetched list in `Skola24Client.Timetable.renderTimetable`.
     *                                         - Recommended: `false` for automatic fetching.
     * @param {string|null} unitGuid - Optional. A unitGuid you may already have. `Skola24.UnitGuid`.
     * @param {string|null} schoolYear - Optional. A schoolYear you may already have. `Skola24.SchoolYear`.
     */
    constructor(hostName: Host, supplyOwnRenderKey: boolean = false, supplyOwnSchoolYear: boolean = false, unitGuid: string = null, schoolYear: string = null)
    {
        this.HostName = hostName
        this.UnitGuid = unitGuid
        this.SchoolYear = schoolYear
        const createApiRequest = this.createApiRequest.bind(this)
        this.Timetable = new Timetable(createApiRequest, this, supplyOwnRenderKey, supplyOwnSchoolYear)
        this.Services = new Services(createApiRequest, this)
        this.Utilities = new Utilities(createApiRequest, this)
    }

    private async executeApiRequest<R extends object>(url: string, data: object = {}, additionalConfig?: AdditionalAxiosRequestConfig): Promise<R>
    {
        const config: AxiosRequestConfig = {
            data: data,
            url: url,
            ...additionalConfig,
            ...getBaseRequestConfig(),
        }
        const response = await axios.create(config).request<BaseResponse<R>>(config)

        if (response.status < 200 || response.status > 200) // Skola24 always returns 200 but if for some reason it doesn't...
        { 
            throw new Error(JSON.stringify(response.data))
        }
        if (response.data.validation.length > 0)
        {
            throw new Skola24Errors.ValidationError(response.data.validation)
        }
        if (response.data.exception != null)
        {
            throw new Skola24Errors.ExceptionError(response.data.exception)
        }
        const validationErrors = (response.data.data as ResponseData.getTimetableViewerUnits).validationErrors
        if (validationErrors)
        {
            throw new Skola24Errors.GetTimetableViewerUnitsValidationErrorsError(validationErrors)
        }

        return response.data.data
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
