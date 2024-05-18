import { AxiosRequestConfig } from "axios";

export default function getBaseRequestConfig (): AxiosRequestConfig
{
    let config: AxiosRequestConfig = {
        method: "POST", // Skola24 always requires POST
        headers: {
            "Content-Type": "application/json",
            "X-Scope": "8a22163c-8662-4535-9050-bc5e1923df48"
        },
        baseURL: "https://web.skola24.se/api"
    } 

    return config;
}