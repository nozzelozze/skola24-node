import type Endpoint from "./endpoints/endpoint"
import getOptions from "./getOptions"


async function executeRequest<Data>(endpoint: Endpoint, getData: (json: any) => Data, requestBody?: Object): Promise<{success: boolean, data: Data | null}>
{
    try
    {
        const response = await fetch(endpoint, getOptions(requestBody))
        if (!response.ok)
            return { success: false, data: null }
    
        const json = await response.json()
        
        const data = getData(json)
        
        return { success: true, data: data }
    } catch (error: any)
    {
        return { success: false, data: null }
    }
}

export default executeRequest