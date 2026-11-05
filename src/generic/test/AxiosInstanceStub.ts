import type {AxiosInstance} from "axios";
import sinon from 'sinon';

interface AxiosInstanceStub extends AxiosInstance {
    get: sinon.SinonStub;
    post: sinon.SinonStub;
}

export const stubAxiosInstance = (): AxiosInstanceStub =>
    ({
        get: sinon.stub(),
        post: sinon.stub(),
    }) as AxiosInstanceStub;