import { AxiosRequestConfig } from "axios";
import { BaseResponse } from "./Response";

export type ApiRequest<D extends object, R extends object> = (data: D, additionalConfig?: AdditionalAxiosRequestConfig) => Promise<BaseResponse<R>>

export type CreateApiRequest = <D extends object, R extends object>(url: string) => ApiRequest<D, R>

export type AdditionalAxiosRequestConfig = Omit<AxiosRequestConfig, "baseURL" | "method" | "headers" | "url" | "data">

export type BaseAxiosRequestConfig = Pick<AxiosRequestConfig, "method" | "headers" | "baseURL">

export type ExcludeClientManaged<T, K extends keyof T> = Omit<T, K>