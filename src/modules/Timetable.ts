import Skola24Client from "../Skola24Client"
import RequestData from "../types/Request"
import ResponseData from "../types/Response"
import { ApiRequest, CreateApiRequest } from "../types/types"

class Timetable
{
    private client: Skola24Client

    private _getTimetableRenderKey: ApiRequest<RequestData._getTimetableRenderKey, ResponseData.getTimetableRenderKey>
    private _getTimetableSelection: ApiRequest<RequestData._getTimetableSelection, ResponseData.getTimetableSelection>
    private _renderTimetable: ApiRequest<RequestData._renderTimetable, ResponseData.renderTimetable>

    constructor(createApiRequest: CreateApiRequest, client: Skola24Client)
    {
        this.client = client
        this._getTimetableRenderKey = createApiRequest("/get/timetable/render/key")
        this._getTimetableSelection = createApiRequest("/get/timetable/selection")
        this._renderTimetable = createApiRequest("/render/timetable")
    }

    public getTimetableRenderKey: ApiRequest<RequestData.getTimetableRenderKey, ResponseData.getTimetableRenderKey> = (data, additionalConfig) =>
    {
        return this._getTimetableRenderKey({ ...data }, additionalConfig)
    }

    public getTimetableSelection: ApiRequest<RequestData.getTimetableSelection, ResponseData.getTimetableSelection> = (data, additionalConfig) =>
    {
        return this._getTimetableSelection({ hostName: this.client.HostName, ...data }, additionalConfig)
    }
    
    public renderTimetable: ApiRequest<RequestData.renderTimetable, ResponseData.renderTimetable> = (data, additionalConfig) =>
    {
        return this._renderTimetable({ host: this.client.HostName, ...data }, additionalConfig)
    }
}

export default Timetable