import { AxiosRequestConfig } from "axios";
import { BaseAxiosRequestConfig } from "../types/types";

export default function getBaseRequestConfig (): BaseAxiosRequestConfig 
{
    let config: BaseAxiosRequestConfig  = {
        method: "POST", // Skola24 always requires POST
        headers: {
            "Content-Type": "application/json",
            "X-Scope": "8a22163c-8662-4535-9050-bc5e1923df48"
        },
        baseURL: "https://web.skola24.se/api"
    } 

    return config;
}