import Skola24Client from "../Skola24Client"
import RequestData from "../types/Request"
import ResponseData from "../types/Response"
import { ApiRequest, CreateApiRequest } from "../types/utilTypes"

class Timetable
{
    private client: Skola24Client
    private SupplyOwnRenderKey: boolean
    private SupplyOwnSchoolYear: boolean

    private _getTimetableRenderKey: ApiRequest<RequestData._getTimetableRenderKey, ResponseData.getTimetableRenderKey>
    private _getTimetableSelection: ApiRequest<RequestData._getTimetableSelection, ResponseData.getTimetableSelection>
    private _renderTimetable: ApiRequest<RequestData._renderTimetable, ResponseData.renderTimetable>

    constructor(createApiRequest: CreateApiRequest, client: Skola24Client, supplyOwnRenderKey: boolean, supplyOwnSchoolYear: boolean)
    {
        this.SupplyOwnRenderKey = supplyOwnRenderKey
        this.client = client
        this._getTimetableRenderKey = createApiRequest("/get/timetable/render/key")
        this._getTimetableSelection = createApiRequest("/get/timetable/selection")
        this._renderTimetable = createApiRequest("/render/timetable")
    }

    private missing = (param: string) => `${param} is required but missing. Please provide a valid ${param} either in the 'data' parameter or ensure the client has a ${param} configured.`

    private addUnitGuid(data: any): any
    {
        if (this.client.UnitGuid == null && data.unitGuid == null)
        {
            throw new Error(this.missing("UnitGuid"))
        }
        return { ...data, unitGuid: data.unitGuid || this.client.UnitGuid }
    }

    private async addSchoolYear(data: any): Promise<any>
    {
        if (!this.SupplyOwnSchoolYear && !this.client.SchoolYear)
        {
            const schoolYearResponse = await this.client.Utilities.getActiveSchoolYears({})
            this.client.SchoolYear = schoolYearResponse.activeSchoolYears[0].guid
        }
        if (this.client.SchoolYear == null && data.schoolYear == null)
        {
            throw new Error(this.missing("SchoolYear"))
        }
        return { ...data, schoolYear: data.schoolYear || this.client.SchoolYear }
    }

    private async addRenderKey(data: any): Promise<any>
    {
        if (this.SupplyOwnRenderKey && !data.renderKey)
        {
            throw new Error(this.missing("RenderKey"))
        }
        let clientSuppliedKey: string
        if (!this.SupplyOwnRenderKey)
        {
            const renderKeyResponse = await this.getTimetableRenderKey({})
            clientSuppliedKey = renderKeyResponse.key
        }
        return { ...data, renderKey: data.renderKey || clientSuppliedKey }
    }

    public getTimetableRenderKey: ApiRequest<RequestData.getTimetableRenderKey, ResponseData.getTimetableRenderKey> = (data, additionalConfig) =>
    {
        return this._getTimetableRenderKey({ ...data }, additionalConfig)
    }

    public getTimetableSelection: ApiRequest<RequestData.getTimetableSelection, ResponseData.getTimetableSelection> = (data, additionalConfig) =>
    {
        const requestData = this.addUnitGuid(data)
        return this._getTimetableSelection({ hostName: this.client.HostName, ...requestData }, additionalConfig)
    }

    public renderTimetable: ApiRequest<RequestData.renderTimetable, ResponseData.renderTimetable> = async (data, additionalConfig) =>
    {
        const requestData = await this.addRenderKey(this.addUnitGuid(await this.addSchoolYear(data)))
        return this._renderTimetable({ host: this.client.HostName, ...requestData }, additionalConfig)
    }
}

export default Timetable