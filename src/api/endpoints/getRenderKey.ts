import executeRequest from "../executeRequest";
import Endpoint from "./endpoint";


const getRenderKey = () =>
    executeRequest<string>(
        Endpoint.RenderKey,
        (json) =>
        {
            return json.data.key
        }
    )

export default getRenderKey