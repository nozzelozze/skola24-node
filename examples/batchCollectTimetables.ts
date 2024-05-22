import { Skola24Client } from "../src/Skola24Client"
import { SelectionType } from "../src/utils/helperEnums"
import Host from "../src/utils/hosts"


const batchCollectTimetables = async () =>
{
    const host: Host = "demo.skola24.se"
    const client = new Skola24Client({ Host: host })

    const unitsResponse = await client.Services.getTimetableViewerUnits({})

    let times: { startTime: string, endTime: string }[] = []

    for (const unit of unitsResponse.units)
    {
        try
        {
            const selections = await client.Timetable.getTimetableSelection({ filters: { class: true }, unitGuid: unit.unitGuid })
            for (const unitClass of selections.classes)
            {
                const timetable = await client.Timetable.renderTimetable({
                    selection: unitClass.groupGuid,
                    selectionType: SelectionType.Class,
                    week: 21,
                    year: new Date().getFullYear(),
                    unitGuid: unit.unitGuid
                })
                timetable.lessonInfo.forEach(l => times.push({ startTime: l.timeStart, endTime: l.timeEnd }))
            }
        } catch (e)
        {
            // pass
        }
    }

    console.log(`Lesson end and start times for ${host}`)
    times.forEach(t =>
    {
        console.log(`${t.startTime} - ${t.endTime}`)
    })

}

export default batchCollectTimetables