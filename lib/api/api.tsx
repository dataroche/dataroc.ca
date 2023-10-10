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

export function apiFetch<Type>({
  url,
  asSingleJsonObject,
  serverSide,
}: ApiProps) {
  const apiUrl = serverSide ? API_URL + url : '/api' + url
  const headers = {}

  if (asSingleJsonObject) {
    headers['Accept'] = 'application/vnd.pgrst.object+json'
  }

  return fetch(apiUrl, {
    headers,
    next: { revalidate: SERVER_SIDE_CACHE_SECONDS },
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
