import Skola24Client from "../Skola24Client"
import { SelectionType } from "../utils/helperEnums"
import Host from "../utils/hosts"

const getTimetable = async () =>
{
    const host: Host = "demo.skola24.se"
    const client = new Skola24Client({ Host: host })

    const unitsResponse = await client.Services.getTimetableViewerUnits({})

    const myUnit = unitsResponse.units[7]

    const selections = await client.Timetable.getTimetableSelection({ filters: { class: true }, unitGuid: myUnit.unitGuid })

    const myClass = selections.classes[0]

    const timetable = await client.Timetable.renderTimetable({
        selection: myClass.groupGuid,
        selectionType: SelectionType.Class,
        week: 21,
        year: new Date().getFullYear(),
        unitGuid: myUnit.unitGuid
    })

    console.log(`Lessons for ${myClass.groupName} week 20:\n`)
    timetable.lessonInfo.forEach(l =>
    {
        console.log(`${l.texts.join(" ")} from ${l.timeEnd} to ${l.timeEnd}\n`)
    })

}

export default getTimetable