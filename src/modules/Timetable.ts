import { Skola24Client } from "../Skola24Client"
import RequestData from "../types/Request"
import ResponseData from "../types/Response"
import { AdditionalAxiosRequestConfig, ApiRequest, CreateApiRequest } from "../types/utilTypes"

interface ITimetable
{
    getTimetableRenderKey: ApiRequest<RequestData.getTimetableRenderKey, ResponseData.getTimetableRenderKey>
    getTimetableSelection: ApiRequest<RequestData.getTimetableSelection, ResponseData.getTimetableSelection>
    renderTimetable: ApiRequest<RequestData.renderTimetable, ResponseData.renderTimetable>
}

class Timetable implements ITimetable
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

    private missing = (param: string) => `${param} is required but missing. Please provide a valid ${param} either in the 'data' parameter or ensure the client's config has a ${param} configured.`

    private addUnitGuid(data: any): any
    {
        if (this.client.Config.UnitGuid == null && data.unitGuid == null)
        {
            throw new Error(this.missing("UnitGuid"))
        }
        return { ...data, unitGuid: data.unitGuid || this.client.Config.UnitGuid }
    }

    private async addSchoolYear(data: any): Promise<any>
    {
        if (!this.client.Config.SupplyOwnSchoolYear && !this.client.Config.SchoolYear)
        {
            const schoolYearResponse = await this.client.Utilities.getActiveSchoolYears({})
            this.client.Config.SchoolYear = schoolYearResponse.activeSchoolYears[0].guid
        }
        if (this.client.Config.SchoolYear == null && data.schoolYear == null)
        {
            throw new Error(this.missing("SchoolYear"))
        }
        return { ...data, schoolYear: data.schoolYear || this.client.Config.SchoolYear }
    }

    private async addRenderKey(data: any): Promise<any>
    {
        if (this.client.Config.SupplyOwnRenderKey && !data.renderKey)
        {
            throw new Error(this.missing("RenderKey"))
        }
        let clientSuppliedKey: string
        if (!this.client.Config.SupplyOwnRenderKey)
        {
            const renderKeyResponse = await this.getTimetableRenderKey({}, {})
            clientSuppliedKey = renderKeyResponse.key
        }
        return { ...data, renderKey: data.renderKey || clientSuppliedKey }
    }

    /**
     * Retrieves a render key.
     * 
     * @param {RequestData.getTimetableRenderKey} data - An empty type. Always leave as `{}`
     * @param {AdditionalAxiosRequestConfig?} additionalConfig - Additional Axios configuration settings.
     */
    public getTimetableRenderKey = async (data: RequestData.getTimetableRenderKey, additionalConfig?: AdditionalAxiosRequestConfig) =>
    {
        return this._getTimetableRenderKey({ ...data }, additionalConfig)
    }

    /**
     * Fetches selected timetable elements from the host based on the provided data, such as classes, teachers, rooms, and more.
     * 
     * @param {RequestData.getTimetableSelection} data - Filters for timetable selections.
     * @param {AdditionalAxiosRequestConfig?} additionalConfig - Additional Axios configuration settings. 
     */
    public getTimetableSelection = async (data: RequestData.getTimetableSelection, additionalConfig?: AdditionalAxiosRequestConfig) =>
    {
        const requestData = this.addUnitGuid(data)
        return this._getTimetableSelection({ hostName: this.client.Config.Host, ...requestData }, additionalConfig)
    }

    /**
     * Retrieves a timetable.
     * 
     * @param {RequestData.renderTimetable} data - Required information such as week and selection.
     * @param {AdditionalAxiosRequestConfig?} additionalConfig - Additional Axios configuration settings. 
     */
    public renderTimetable = async (data: RequestData.renderTimetable, additionalConfig?: AdditionalAxiosRequestConfig) =>
    {
        data.height = data.height ?? 500
        data.width = data.width ?? 500
        const requestData = await this.addRenderKey(this.addUnitGuid(await this.addSchoolYear(data)))

        return this._renderTimetable({ host: this.client.Config.Host, ...requestData }, additionalConfig)
    }
}

export default Timetable