import axios from "axios";
import dayjs from "dayjs";

export type Method = "GET" | "POST" | "PUT" | "DELETE";

/**
 *
 * @param {Method} method
 * @param {string} path
 * @param {Record<string, any>} data
 * @returns
 */
export async function apiFetch(method: Method, path: string, data: Record<string, any>) {
    return await axios({
        data,
        headers: {},
        method,
        url: '/api' + path,
    });
}