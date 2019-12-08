import {get} from "http";
import {CONFIG} from "../config";

export function matchServiceRequest(path: string): Promise<string> {
    return new Promise<string>((res, rej) => {
        get(`http://${CONFIG.matchServiceHostname}:${CONFIG.matchServicePort}${path}`, response => {
            let data = '';
            response.on('data', (chunk: string) => {
                data += chunk;
            });

            response.on('end', () => {
                res(data);
            });
        });
    });
}
