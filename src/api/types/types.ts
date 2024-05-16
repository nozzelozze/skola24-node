
export type ApiRequest<D extends object, R> = (data?: D, additionalRequestParams?: object) => Promise<R>;