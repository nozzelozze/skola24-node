import Skola24Client from "../Skola24Client"
import RequestData from "../types/Request"
import ResponseData from "../types/Response"
import { AdditionalAxiosRequestConfig, ApiRequest, CreateApiRequest } from "../types/utilTypes"

interface IUtilities
{
    getActiveSchoolYears: ApiRequest<RequestData.getActiveSchoolYears, ResponseData.getActiveSchoolYears>
    encryptSignature: ApiRequest<RequestData.encryptSignature, ResponseData.encryptSignature>
}

class Utilities implements IUtilities
{
    private client: Skola24Client

    private _getActiveSchoolYears: ApiRequest<RequestData._getActiveSchoolYears, ResponseData.getActiveSchoolYears>
    private _encryptSignature: ApiRequest<RequestData._encryptSignature, ResponseData.encryptSignature>

    constructor(createApiRequest: CreateApiRequest, client: Skola24Client)
    {
        this.client = client
        this._getActiveSchoolYears = createApiRequest("/get/active/school/years")
        this._encryptSignature = createApiRequest("/encrypt/signature")
    }
    /**
     * Retrieves active school years.
     * 
     * @param {RequestData.getActiveSchoolYears} data - The request data.
     * @param {AdditionalAxiosRequestConfig?} additionalConfig - Additional Axios configuration settings.
     * @throws Will throw an error if no active school years are found.
     */
    public getActiveSchoolYears = async (data: RequestData.getActiveSchoolYears, additionalConfig?: AdditionalAxiosRequestConfig) =>
    {
        const response = await this._getActiveSchoolYears({ hostName: this.client.Config.Host, ...data }, additionalConfig)
        if (response.activeSchoolYears.length <= 0)
        {
            throw new Error(`No school years. Response: \n\n${response}`)
        }
        return response
    }

    /**
     * Encrypts an ID or signature and returns a string that should be used as a selection when fetching timetables.
     * 
     * @param {RequestData.encryptSignature} data - The request data.
     * @param {AdditionalAxiosRequestConfig?} additionalConfig - Additional Axios configuration settings.
     */
    public encryptSignature = async (data: RequestData.encryptSignature, additionalConfig?: AdditionalAxiosRequestConfig) =>
    {
        return this._encryptSignature({ ...data }, additionalConfig)
    }
}

export default Utilities