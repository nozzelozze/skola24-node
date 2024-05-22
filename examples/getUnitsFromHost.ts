import { Skola24Client } from "../src/Skola24Client"
import Host from "../src/utils/hosts"


const getUnitsFromHost = async () => 
{
    const host: Host = "demo.skola24.se"
    const client = new Skola24Client({ Host: host })

    const response = await client.Services.getTimetableViewerUnits({})
    console.log(`Units / schools for ${host}:`)
    response.units.forEach(u =>
    {
        console.log(u.unitId)
    })
}

export default getUnitsFromHost