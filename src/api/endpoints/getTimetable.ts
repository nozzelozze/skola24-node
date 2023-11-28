import executeRequest from "../executeRequest"
import Endpoint from "./endpoint"

export type Timetable = 
{
    "textList":         {
        "x": number,
        "y": number,
        "fColor": string,
        "fontsize": number,
        "text": string,
        "bold": boolean,
        "italic": boolean,
        "id": number,
        "parentId": number,
        "type": string
    }[],
    "boxList": {
        "x": number,
        "y": number,
        "width": number,
        "height": number,
        "bColor": string,
        "fColor": string,
        "id": number,
        "parentId": number|null,
        "type": string,
        "lessonGuids": string[] | null
    }[],
    "lineList": {
            "p1x": number,
            "p1y": number,
            "p2x": number,
            "p2y": number,
            "color": string,
            "id": number,
            "parentId": number,
            "type": string
    }[],
    "lessonInfo": {
        "guidId": string,
        "texts": string[],
        "timeStart": string,
        "timeEnd": string,
        "dayOfWeekNumber": number,
        "blockName": string
    }[]
}

const getTimetable = async (hostName: string, renderKey: string, unitGuid: string, selection: string, week: number) =>
{

    const body = {
        "renderKey": renderKey,
        "host": hostName,
        "unitGuid": unitGuid,
        "startDate": null,
        "endDate": null,
        "scheduleDay": 0,
        "blackAndWhite": false,
        "width": 1117,
        "height": 1015,
        "selectionType": 0,
        "selection": selection,
        "showHeader": false,
        "periodText": "",
        "week": week,
        "year": 2023,
        "privateFreeTextMode": null,
        "privateSelectionMode": false,
        "customerKey": ""
    }

    return executeRequest<Timetable>(
        Endpoint.Timetable,
        (json) =>
        {
            return json.data
        },
        body
    )

}

export default getTimetable