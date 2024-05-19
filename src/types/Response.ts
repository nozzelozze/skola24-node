
export type BaseResponse<T> =
    {
        error: any,
        data: T,
        exception: any,
        validation: any[],
        sessionExpires: Date,
        needSessionRefresh: boolean
    }

module ResponseData
{

    export type getActiveSchoolYears =
        {
            activeSchoolYears: {
                guid: string
                name: string
                from: string
                to: string
            }[],
            useSchoolYearsFeatures: boolean
        }

    export type getTimetableViewerUnits =
        {
            errors: any
            validationErrors: any
            getTimetableViewerUnitsResponse: {
                hostName: string
                units: {
                    unitGuid: string
                    unitId: string
                    allowCalendarExport: boolean
                    private: any
                    staff: any
                    anonymous: {
                        students: boolean
                        classes: boolean
                        groups: boolean
                        teachers: boolean
                        rooms: boolean
                        subjects: boolean
                        courses: boolean
                    }
                }[]
            }
        }

    export type getTimetableRenderKey =
        {
            key: string
        }

    export type getTimetableSelection =
        {
            courses: any[]
            subjects: {
                id: string
                name: string
                eid: string
                selectableBy: any
              }[]
            periods: {
                name: string
                id: string
                from: string
                to: string
              }[]
            groups: {
                id: any
                groupGuid: string
                groupName: string
                absenceMessageNotDeliveredCount: number
                isResponsible: boolean
                isClass: boolean
                isAdmin: boolean
                isPrincipal: boolean
                isMentor: boolean
                isPreschoolGroup: boolean
                teachers: any
                selectableBy: any
                substituteTeacherGuid: any
                teacherChangeStudentsInGroup: number
            }[]
            classes: {
                id: any
                groupGuid: string
                groupName: string
                absenceMessageNotDeliveredCount: number
                isResponsible: boolean
                isClass: boolean
                isAdmin: boolean
                isPrincipal: boolean
                isMentor: boolean
                isPreschoolGroup: boolean
                teachers: any
                selectableBy: any
                substituteTeacherGuid: any
                teacherChangeStudentsInGroup: number
            }[]
            rooms: {
                id: any
                name: string
                eid: string
                external: boolean
                selectableBy: any
            }[]
            teachers: {
                name: any
                firstName: string
                lastName: string
                fullName: string
                isActiveUser: boolean
                integrity: boolean
                id: string
                reported: boolean
                personGuid: string
                readOnly: boolean
                selectableBy: any
              }[]
            students: any[]
        }


    export type renderTimetable =
        {
            textList: {
                x: number
                y: number
                fColor: string
                fontsize: number
                text: string
                bold: boolean
                italic: boolean
                id: number
                parentId: number
                type: string
            }[]
            boxList: {
                x: number
                y: number
                width: number
                height: number
                bColor: string
                fColor: string
                id: number
                parentId?: number
                type: string
                lessonGuids?: string[]
            }[]
            lineList: {
                p1x: number
                p1y: number
                p2x: number
                p2y: number
                color: string
                id: number
                parentId: number
                type: string
            }[]
            
            lessonInfo: {
                guidId: string
                texts: string[]
                timeStart: string
                timeEnd: string
                dayOfWeekNumber: number
                blockName: string
            }[]
            metadata: {
                schoolName: string
                lastPublished: string
            }[]
        }

    export type encryptSignature =
        {
            signature: string
        }


}

export default ResponseData