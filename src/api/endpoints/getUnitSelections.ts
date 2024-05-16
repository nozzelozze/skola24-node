import executeRequest from "../executeRequest";
import type Host from "../utils/hosts";
import Endpoint from "./endpoint";

export type Selections = {
    courses: any[],
    subjects: any[],
    periods: any[],
    groups: any[],
    classes: { groupGuid: string, groupName: string }[],
    rooms: { id: null|any, name: string, eid: string, external: boolean, selectableBy: null|any }[], // |null on everythign!??
    teachers: any[],
    students: any[]
}

export type Filters = {
    class?: boolean,
    course?: boolean,
    group?: boolean,
    period?: boolean,
    room?: boolean,
    student?: boolean,
    subject?: boolean,
    teacher?: boolean
}

const getUnitSelections = async (hostName: Host, unitGuid: string, filters: Filters) =>
{
    
    const body = {
        "hostName": hostName,
        "unitGuid": unitGuid,
        "filters": {
            ...{
                class: false,
                course: false,
                group: false,
                period: false,
                room: false,
                student: false,
                subject: false,
                teacher: false
            },
            ...filters
        }
    }

    return executeRequest<Selections>(
        Endpoint.UnitSelections,
        (json: { data: { [K in keyof Selections]: any[] } }) =>
        {
            // Gör en kommentar här att det blir streamlined här men om man vill kan man bara ta bort mina custom types
            // och få all data som Skola24 kommer mä
            let data: Selections = {
                courses: json.data.courses.map((course) => course),
                subjects: json.data.subjects.map((subject) => subject),
                periods: json.data.periods.map((period) => period),
                groups: json.data.groups.map((group) => group),
                classes: json.data.classes.map((classItem) => { return { groupGuid: classItem.groupGuid, groupName: classItem.groupName}}),
                rooms: json.data.rooms.map((room) => room),
                teachers: json.data.teachers.map((teacher) => teacher),
                students: json.data.students.map((student) => student)
            }

            return data;
        },
        body
    )
}

export default getUnitSelections