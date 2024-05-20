import { AxiosRequestConfig } from "axios";

export type ApiRequest<D extends object, R extends object> = (data: D, additionalConfig?: AdditionalAxiosRequestConfig) => Promise<R>

export type CreateApiRequest = <D extends object, R extends object>(url: string) => ApiRequest<D, R>

export type BaseAxiosRequestConfig = Pick<AxiosRequestConfig, "method" | "headers" | "baseURL">

export type AdditionalAxiosRequestConfig = Omit<AxiosRequestConfig, "baseURL" | "method" | "headers" | "url" | "data">

export type ExcludeClientManaged<T, K extends keyof T> = Omit<T, K>

export type OptionallyClientManaged<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>