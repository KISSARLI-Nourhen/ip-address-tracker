import type {IpGeolocation} from "./IpGeolocation.ts";

export type RestIpifyResponse = {
    ip: string;
    location: {
        city: string;
        region: string;
        country: string;
        lat: number;
        lng: number;
        "postalCode": string,
        "timezone": string,
    };
    isp: string;
}


export const toIpGeolocation = (json: RestIpifyResponse): IpGeolocation => {
    return {
        ip: json.ip,
        city: json.location.city,
        region: json.location.region,
        country: json.location.country,
        postalCode: json.location.postalCode,
        timezone: json.location.timezone,
        latitude: json.location.lat,
        longitude: json.location.lng,
        isp: json.isp,
    }
}