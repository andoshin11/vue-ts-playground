import { TupleToUnion } from '@/types/utils'

export const HTTPMethod = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PUT: 'PUT'
} as const

export interface APIRequest<R> {
  response: R
  path: string
  method: TupleToUnion<typeof HTTPMethod>
  params?: any
  baseURL?: string
}
