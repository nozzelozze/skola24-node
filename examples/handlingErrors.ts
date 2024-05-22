import Skola24Errors from "../src/error/Errors"


const handlingErrors = async () =>
{
    try
    {
        // Operation that throw an error
    } catch (error)
    {
        if (error instanceof Skola24Errors.ValidationError)
        {
            // Validation Error
        } else if (error instanceof Skola24Errors.ExceptionError)
        {
            // Exception Error
        } else if (error instanceof Skola24Errors.GetTimetableViewerUnitsValidationErrorsError)
        {
            // Get Timetable Units Validation Error
        }
    }
}

export default handlingErrors