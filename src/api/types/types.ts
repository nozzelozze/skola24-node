import { AxiosResponse } from "axios";

export type ApiRequest<D extends object, R> = (data?: D, additionalRequestParams?: object) => Promise<AxiosResponse<R>>
