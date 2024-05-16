import executeRequest from "../executeRequest";
import type Host from "../utils/hosts";
import Endpoint from "./endpoint";

export type Unit = { unitGuid: string, unitId: string }

const getUnits = (hostName: Host) =>
{

    const body = {
        getTimetableViewerUnitsRequest:
        {
            hostName: hostName
        }
    }

    return executeRequest<Unit[]>(
        Endpoint.Units,
        (json) =>
        {
            let units: Unit[] = []
            json.data.getTimetableViewerUnitsResponse.units.forEach(unit =>
            {
                units.push({ unitGuid: unit.unitGuid, unitId: unit.unitId })
            })
            return units
        },
        body
    )
}

export default getUnits