import { camelizeKeys } from 'humps'
import useSWR from 'swr'

export type ApiProps = {
  url: string
  asSingleJsonObject?: boolean
  serverSide?: boolean
}

const SERVER_SIDE_CACHE_SECONDS = 10
const _API_URL = process.env.REACT_APP_API_URL || ''

const API_URL = _API_URL.endsWith('/') ? _API_URL.slice(0, -1) : _API_URL
const RETRY_WAIT = 1500

/** Because we use the free fly.io instances, our postgREST instance is flimsy and
 * scales down to 0. The first call fails everytime, so we need a retry.
 *
 * @param props
 * @param retry
 * @returns
 */
export function apiFetch<Type>(props: ApiProps, retry: number = 3) {
  const { url, asSingleJsonObject, serverSide } = props
  const apiUrl = serverSide ? API_URL + url : '/api' + url
  const headers = {}

  if (asSingleJsonObject) {
    headers['Accept'] = 'application/vnd.pgrst.object+json'
  }

  return fetch(apiUrl, {
    headers,
    next: { revalidate: SERVER_SIDE_CACHE_SECONDS },
  })
    .catch((e) => {
      if (retry > 0) {
        return new Promise((r) => setTimeout(r, RETRY_WAIT)).then(() =>
          apiFetch(props, retry - 1)
        )
      } else {
        throw e
      }
    })
    .then((res) => res.json() as Promise<Type>)
    .then((res) => {
      const data = camelizeKeys(res)
      return data
    })
}

export function useApiQuery<Type>(props: ApiProps) {
  const { data, ...rest } = useSWR(props, apiFetch)
  return {
    data: data as Type,
    ...rest,
  }
}
