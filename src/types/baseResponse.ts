
export type Validation =
    {
        code: number,
        label: any,
        message: string
    }[]

export type Exception =
    {
        code: number
        context: string
        errorId: number
        errorTime: string
        message: any
        source: any
        targetSite: any
        innerExceptions: any[]
    }

export type BaseResponse<T> =
    {
        error: any,
        data: T,
        exception?: Exception,
        validation: Validation,
        sessionExpires: Date,
        needSessionRefresh: boolean
    }