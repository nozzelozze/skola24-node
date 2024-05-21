import ResponseData from "../types/Response"
import { Validation, Exception } from "../types/baseResponse"


const name = (name: string) => `Skola24${name}`

module Skola24Errors
{

    class BaseError extends Error
    {
        request: any
        url: string

        constructor(message: string, request: any, url: string)
        {
            super(message)
            this.request = request
            this.url = url
        }
    }

    export class GetTimetableViewerUnitsValidationErrorsError extends BaseError
    {
        validationErrors: ResponseData.getTimetableViewerUnitsValidationErrors

        constructor(validationErrors: ResponseData.getTimetableViewerUnitsValidationErrors, request: any, url: string)
        {
            const message = "All errors: " + validationErrors.map(v => v.description).join("; ")
            super(message, request, url)
            this.name = name("GetTimetableViewerUnitsValidationErrorsError")
            this.validationErrors = validationErrors
        }
    }

    export class ValidationError extends BaseError
    {
        validation: Validation

        constructor(validation: Validation, request: any, url: string)
        {
            const errorPotentialCauses: { [code: number]: string } =
            {
                9000: "Did you provide a valid selectionType?",
                9002: "Did you provide a valid scheduleDay?",
                9003: "Did you provide valid width and height?",
                9005: "Did you provide the correct unitGuid?",
                9006: "Did you provide correct selection?",
                3: "There might be a mismatch between the selection type and selection. Alternatively, the schedule could be anonymous.",
                4: "You might be providing the wrong encrypted signature for the selection parameter.",
                6: "Did you provide a valid render key?",
                100: "Provided Host is not valid."
            }

            const message = "All errors: " + validation.map(v =>
            {
                const potentialCause = errorPotentialCauses[v.code];
                return `\nMessage: ${v.message}, Code: ${v.code}. ${potentialCause ?? ""}`
            }).join("");
            super(message, request, url)
            this.name = name("ValidationError")
            this.validation = validation
        }
    }

    export class ExceptionError extends BaseError
    {
        exception: Exception

        constructor(exception: Exception, request: any, url: string)
        {
            const message = `Code: ${exception.code}`
            super(message, request, url)
            this.name = name("ExceptionError")
        }
    }

}

export default Skola24Errors