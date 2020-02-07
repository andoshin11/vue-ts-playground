export interface APIError {
  message: string
  status: number | undefined
  raw: Error
}
