import Skola24Client from "../Skola24Client"
import RequestData from "../types/Request"
import ResponseData from "../types/Response"
import { ApiRequest, CreateApiRequest } from "../types/utilTypes"

class Services
{
    private client: Skola24Client

    private _getTimetableViewerUnits: ApiRequest<RequestData._getTimetableViewerUnits, ResponseData.getTimetableViewerUnits>

    constructor(createApiRequest: CreateApiRequest, client: Skola24Client)
    {
        this.client = client
        this._getTimetableViewerUnits = createApiRequest("/services/skola24/get/timetable/viewer/units")
    }

    public getTimetableViewerUnits: ApiRequest<RequestData.getTimetableViewerUnits, ResponseData.getTimetableViewerUnits> = (data, additionalConfig) =>
    {
        return this._getTimetableViewerUnits({ getTimetableViewerUnitsRequest: { hostName: this.client.HostName } }, additionalConfig)
    }
}

export default Services