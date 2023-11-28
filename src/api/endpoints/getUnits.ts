import executeRequest from "../executeRequest";
import Endpoint from "./endpoint";

export type Unit = { unitGuid: string, unitId: string }

const getUnits = (hostName: string) =>

    executeRequest<Unit[]>(
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
        {
            getTimetableViewerUnitsRequest:
            {
                hostName: hostName
            }
        }
        )

export default getUnits