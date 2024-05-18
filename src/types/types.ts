import { AxiosResponse } from "axios";
import { BaseResponse } from "./Response";

export type ApiRequest<D extends object, R extends object> = (data: D, additionalRequestParams?: object) => Promise<BaseResponse<R>>