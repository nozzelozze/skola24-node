import type { RawTimetable, Timetable } from "./helperTypes";

const formatTime = (time: string) => time.slice(0, time.length - 3);

const transformTimetable = (timetable: RawTimetable): Timetable =>
{
    const data: Timetable = {};

    if (timetable.lessonInfo)
    {
        for (const lesson of timetable.lessonInfo)
        {
            const { guidId, dayOfWeekNumber, timeStart, timeEnd, texts } = lesson;
            data[guidId] = {
                ...data[guidId],
                dayOfWeekNumber,
                timeStart: formatTime(timeStart),
                timeEnd: formatTime(timeEnd),
                texts,
            };
        }
    }

    for (const box of timetable.boxList)
    {
        if (box.type === "Lesson" && box.lessonGuids)
        {
            const guid = box.lessonGuids[0];
            const { x, y, width, height, bColor } = box;
            data[guid] = {
                ...data[guid],
                x,
                y,
                width,
                height,
                color: bColor,
            };
        }
    }

    return data;
};

export default transformTimetable;