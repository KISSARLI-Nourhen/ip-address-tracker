import type {IpGeolocation} from "./IpGeolocation.ts";

export interface IpGeolocationRepository {
    findByIpAddress(ipAddress: string): Promise<IpGeolocation>;
}