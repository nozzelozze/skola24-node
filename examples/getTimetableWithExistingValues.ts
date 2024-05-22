import { Skola24Client } from "../src/Skola24Client"
import { SelectionType } from "../src/utils/helperEnums"
import Host from "../src/utils/hosts"

const getTimetableWithExistingValues = async () =>
{
    const host: Host = "demo.skola24.se"
    const unidGuid = "ZGEwNGM4Y2YtNzc0Yy1mNjFjLWIzMTgtZGViYzE1MDVjNDRh"
    const selection = "NTc1MDU2MjUtZWY0My1mY2UxLWFlZjQtMzFhNzZjYzBjZTM4"

    const client = new Skola24Client({ Host: host, UnitGuid: unidGuid })

    const timetable = await client.Timetable.renderTimetable({
        selection: selection,
        selectionType: SelectionType.Teacher,
        week: 21,
        year: new Date().getFullYear()
    })

    console.log("Lessons for week 20:\n")
    timetable.lessonInfo.forEach(l =>
    {
        console.log(`${l.texts.join(" ")} from ${l.timeEnd} to ${l.timeEnd}\n`)
    })
}

export default getTimetableWithExistingValues