import Host from "../utils/hosts"

export type ApiRequest<D extends object, R> = (data?: D, additionalRequestParams?: object) => Promise<R>

export type BaseResponse<T> =
    {
        error: any,
        data: T,
        exception: any,
        validation: any[],
        sessionExpires: Date,
        needSessionRefresh: boolean
    }


export module Request
{
    export type getActiveSchoolYears =
        {
            hostName: Host
            checkSchoolYearsFeatures: boolean
        }

    export type getTimetableViewerUnits =
        {
            getTimetableViewerUnitsRequest:
            {
                hostName: Host
            }
        }

    export type getTimetableRenderKey =
        {

        }

    export type getTimetableSelection =
        {
            hostName: Host
            unitGuid: string
            filters:
            {
                class: boolean
                course: boolean
                group: boolean
                period: boolean
                room: boolean
                student: boolean
                subject: boolean
                teacher: boolean
            }
        }


    export type getPersonalTimetables =
        {
            getPersonalTimetablesRequest:
            {
                hostName: Host
            }
        }

    export type renderTimetable =
        {
            renderKey: string
            host: Host
            unitGuid: string
            schoolYear: string
            startDate: any
            endDate: any
            scheduleDay: number
            blackAndWhite: boolean
            width: number
            height: number
            selectionType: number
            selection: string
            showHeader: boolean
            periodText: string
            week: number
            year: number
            privateFreeTextMode: any
            privateSelectionMode: boolean
            customerKey: string
        }




}