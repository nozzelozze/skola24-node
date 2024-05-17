import Host from "../utils/hosts"
import SelectionType from "../utils/selectionTypes"

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
            selectionType: SelectionType
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