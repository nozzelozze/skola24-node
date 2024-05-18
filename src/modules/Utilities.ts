import Skola24Client from "../Skola24Client"
import RequestData from "../types/Request"
import ResponseData from "../types/Response"
import { ApiRequest, CreateApiRequest } from "../types/types"

class Utilities
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

    public getActiveSchoolYears: ApiRequest<RequestData.getActiveSchoolYears, ResponseData.getActiveSchoolYears> = (data, additionalConfig) =>
    {
        return this._getActiveSchoolYears({ hostName: this.client.HostName, ...data }, additionalConfig)
    }

    public encryptSignature: ApiRequest<RequestData.encryptSignature, ResponseData.encryptSignature> = (data, additionalConfig) =>
    {
        return this._encryptSignature({ ...data }, additionalConfig)
    }
}

export default Utilities