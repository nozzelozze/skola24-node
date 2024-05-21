import Skola24Client from "../Skola24Client"
import RequestData from "../types/Request"
import ResponseData from "../types/Response"
import { AdditionalAxiosRequestConfig, ApiRequest, CreateApiRequest } from "../types/utilTypes"

interface IServices
{
    getTimetableViewerUnits: ApiRequest<RequestData.getTimetableViewerUnits, ResponseData.getTimetableViewerUnits>
}

class Services implements IServices
{
    private client: Skola24Client

    private _getTimetableViewerUnits: ApiRequest<RequestData._getTimetableViewerUnits, ResponseData.getTimetableViewerUnits>

    constructor(createApiRequest: CreateApiRequest, client: Skola24Client)
    {
        this.client = client
        this._getTimetableViewerUnits = createApiRequest("/services/skola24/get/timetable/viewer/units")
    }

    /**
     * Retrieves the host's units, which in most cases are schools.
     * 
     * @param {RequestData.getTimetableViewerUnits} data - The request data.
     * @param {AdditionalAxiosRequestConfig?} additionalConfig - Additional Axios configuration settings.
     */
    public getTimetableViewerUnits = (data: RequestData.getTimetableViewerUnits, additionalConfig?: AdditionalAxiosRequestConfig) =>
    {
        return this._getTimetableViewerUnits({ getTimetableViewerUnitsRequest: { hostName: this.client.Config.Host } }, additionalConfig)
    }
}

export default Services