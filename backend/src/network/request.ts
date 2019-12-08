import {request} from "http";
import {CONFIG} from "../config";

export function matchServiceRequest(path: string, callback: (string) => void) {
    request({
        hostname: CONFIG.matchServiceHostname,
        port: CONFIG.matchServicePort,
        path: '/create',
        method: 'GET',
    }, response => {
        if (response.statusCode === 200) {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                callback(data);
            });
        }
    });
}
