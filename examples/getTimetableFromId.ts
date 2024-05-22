import { Skola24Client } from "../src/Skola24Client"
import { SelectionType } from "../src/utils/helperEnums"
import Host from "../src/utils/hosts"

const getTimetableFromId = async () =>
{
    const host: Host = "demo.skola24.se"
    const unidGuid = "ZGEwNGM4Y2YtNzc0Yy1mNjFjLWIzMTgtZGViYzE1MDVjNDRh"
    const client = new Skola24Client({ Host: host, UnitGuid: unidGuid })

    const id = "UL"

    const signatureResponse = await client.Utilities.encryptSignature({ signature: id })

    const timetable = await client.Timetable.renderTimetable({
        selection: signatureResponse.signature,
        selectionType: SelectionType.Signature,
        week: 21,
        year: new Date().getFullYear(),
    })

    console.log(`Lessons for ${id} week 20:\n`)
    timetable.lessonInfo.forEach(l =>
    {
        console.log(`${l.texts.join(" ")} from ${l.timeEnd} to ${l.timeEnd}\n`)
    })

}

export default getTimetableFromId