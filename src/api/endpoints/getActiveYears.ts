import executeRequest from "../executeRequest"
import type { activeSchoolYears } from "../helperTypes"
import type Host from "../hosts"
import Endpoint from "./endpoint"

const getActiveYears = async (hostName: Host, checkSchoolYearsFeatures: boolean = false) =>
{

    const body = {
        "hostName": hostName,
        "checkSchoolYearsFeatures": checkSchoolYearsFeatures
    }

    return executeRequest<activeSchoolYears>(
        Endpoint.GetSchoolYears,
        (json) =>
        {
            return json.data.activeSchoolYears
        },
        body
    )
}

export default getActiveYears