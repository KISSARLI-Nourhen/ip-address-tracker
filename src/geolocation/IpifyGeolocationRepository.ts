import type {IpGeolocationRepository} from "./IpGeolocationRepository.ts";
import type {AxiosInstance} from "axios";
import type {IpGeolocation} from "./IpGeolocation.ts";
import {type RestIpifyResponse, toIpGeolocation} from "./RestIpifyResponse.ts";

export class IpifyGeolocationRepository implements IpGeolocationRepository {

    private readonly axiosInstance: AxiosInstance;
    private readonly apiKey: string;

    constructor(axiosInstance: AxiosInstance, apiKey: string) {
        this.axiosInstance = axiosInstance;
        this.apiKey = apiKey;
    }

    async findByIpAddress(ipAddress: string): Promise<IpGeolocation> {

        const response = await this.axiosInstance.get<RestIpifyResponse>(
            'https://geo.ipify.org/api/v2/country,city', {
                params: {
                    apiKey: this.apiKey,
                    ipAddress: ipAddress,
                }
            }).then(result => result.data);

        return toIpGeolocation(response);
    }
}