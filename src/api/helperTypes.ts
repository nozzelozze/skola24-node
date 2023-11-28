
export type Dimensions = { width: number, height: number }

export type RawTimetable =
{
    "textList": {
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
        "parentId": number | null,
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

export type Timetable = { // Note: Gör om så att det är en lista av objekten istället? Skippa guidId som key?
    [key: string]: {
        x: number,
        y: number,
        width: number,
        height: number,
        texts: string[],
        color: string,
        timeStart: string,
        timeEnd: string,
        dayOfWeekNumber: number,
    }
}

export type activeSchoolYears = {
    guid: string,
    name: string,
    from: string,
    to: string
}[]