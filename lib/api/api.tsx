import axios from "axios";

export type Method = "GET" | "POST" | "PUT" | "DELETE";

const RETRY_WAIT = 1500;

/**
 *
 * @param {Method} method
 * @param {string} path
 * @param {Record<string, any>} data
 * @returns
 */
export async function apiFetch(method: Method, path: string, data: Record<string, object>, retry: number = 3) {
    try {
        return await axios({
            data,
            headers: {},
            method,
            url: '/api' + path,
        });
    } catch (e) {
        if (retry > 0) {
            await new Promise(r => setTimeout(r, RETRY_WAIT));
            return await apiFetch(method, path, data, retry - 1);
        } else {
            throw e;
        }

    }
}