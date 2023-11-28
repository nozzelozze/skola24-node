import executeRequest from "../executeRequest"
import type { Dimensions, RawTimetable } from "../helperTypes"
import type Host from "../hosts"
import Endpoint from "./endpoint"
import type SelectionType from "./selectionTypes"

const getTimetable = async (hostName: Host, renderKey: string, schoolYear: string, unitGuid: string, selection: string, week: number, dimensions: Dimensions, selectionType: SelectionType) =>
{

    const body = {
        "renderKey": renderKey,
        "host": hostName,
        "unitGuid": unitGuid,
        "startDate": null,
        "endDate": null,
        "scheduleDay": 0,
        "blackAndWhite": false,
        "width": dimensions.width,
        "height": dimensions.height,
        "selectionType": selectionType,
        "selection": selection,
        "showHeader": false,
        "periodText": "",
        "week": week,
        "year": 2023,
        "privateFreeTextMode": null,
        "privateSelectionMode": false,
        "customerKey": "",
        "schoolYear": "9f797060-f067-49ce-91f4-e945692ea8e8"
    }

    return executeRequest<RawTimetable>(
        Endpoint.Timetable,
        (json) =>
        {
            console.log(json)
            return json.data
        },
        body
    )

}

export default getTimetable