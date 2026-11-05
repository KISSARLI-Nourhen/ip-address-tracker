import {stubAxiosInstance} from "@generic/test/AxiosInstanceStub.ts";
import {describe, expect, it} from "vitest";
import {IpifyGeolocationRepository} from "../IpifyGeolocationRepository.ts";

describe('IpifyGeolocationRepository.spec.ts', () => {

    it('should retrieve and map geolocation data', async () => {

        const axiosInstance = stubAxiosInstance();

        axiosInstance.get.resolves({
            data: {
                ip: '8.8.8.8',
                location: {
                    city: 'Mountain View',
                    region: 'California',
                    country: 'US',
                    postalCode: '94043',
                    timezone: '-07:00',
                    lat: 37.40599,
                    lng: -122.078514,
                },
                isp: 'Google LLC',
            }
        });

        const repository = new IpifyGeolocationRepository(axiosInstance, 'fake-test-key');

        const result = await repository.findByIpAddress('8.8.8.8');

        expect(result).toEqual({
                ip: '8.8.8.8',
                city: 'Mountain View',
                region: 'California',
                country: 'US',
                postalCode: '94043',
                timezone: '-07:00',
                latitude: 37.40599,
                longitude: -122.078514,
                isp: 'Google LLC'
            }
        );

        expect(axiosInstance.get.calledOnce).toBe(true);

        const [url, config] = axiosInstance.get.getCall(0).args;

        expect(url).toBe("https://geo.ipify.org/api/v2/country,city");
        expect(config.params).toEqual({apiKey: 'fake-test-key', ipAddress: '8.8.8.8',});
    });
});