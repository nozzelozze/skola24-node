import Host from "../utils/hosts"
import { ScheduleDay, SelectionType } from "../utils/helperEnums"
import { ExcludeClientManaged, OptionallyClientManaged } from "./utilTypes"

export module RequestData
{
    export type _getActiveSchoolYears =
        {
            hostName: Host
            checkSchoolYearsFeatures?: boolean
        }
    export type getActiveSchoolYears = ExcludeClientManaged<_getActiveSchoolYears, "hostName">

    export type _getTimetableViewerUnits =
        {
            getTimetableViewerUnitsRequest:
            {
                hostName: Host
            }
        }
    export type getTimetableViewerUnits = ExcludeClientManaged<_getTimetableViewerUnits, "getTimetableViewerUnitsRequest">

    export type _getTimetableRenderKey =
        {

        }
    export type getTimetableRenderKey = ExcludeClientManaged<_getTimetableRenderKey, never>

    export type _getTimetableSelection =
        {
            hostName: Host
            unitGuid: string
            filters:
            {
                class?: boolean
                course?: boolean
                group?: boolean
                period?: boolean
                room?: boolean
                student?: boolean
                subject?: boolean
                teacher?: boolean
            }
        }
    export type getTimetableSelection = OptionallyClientManaged<ExcludeClientManaged<_getTimetableSelection, "hostName">, "unitGuid">

    export type _renderTimetable =
        {
            renderKey?: string
            host: Host
            unitGuid: string
            schoolYear: string
            startDate?: any
            endDate?: any
            scheduleDay?: ScheduleDay
            blackAndWhite?: boolean
            width?: number
            height?: number
            selectionType: SelectionType
            selection: string
            showHeader?: boolean
            periodText?: string
            week: number
            year: number
            privateFreeTextMode?: any
            privateSelectionMode?: boolean
            customerKey?: string
        }
    export type renderTimetable = OptionallyClientManaged<ExcludeClientManaged<_renderTimetable, "host">, "unitGuid" | "schoolYear" | "width" | "height">

    export type _encryptSignature =
        {
            signature: string
        }
    export type encryptSignature = ExcludeClientManaged<_encryptSignature, never>

}

export default RequestData