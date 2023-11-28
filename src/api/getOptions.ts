
export const headers =
{
    "Content-Type": "application/json",
    "X-Scope": "8a22163c-8662-4535-9050-bc5e1923df48"
}

const getOptions = (body?: Object) =>
{
    return {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body ?? {})
    }
}

export default getOptions