/** Client-side-only hook to use the result of a query. */
import useSWR from 'swr'

import { apiFetch, ApiProps } from './api'

export function useApiQuery<Type>(props: ApiProps) {
  const { data, ...rest } = useSWR(props, apiFetch)
  return {
    data: data as Type,
    ...rest,
  }
}
