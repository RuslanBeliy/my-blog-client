export enum FetchStatus {
  Idle = 'idle',
  Loading = 'loading',
  Error = 'error',
  Success = 'success',
}

export interface ValidationError {
  msg: string;
  param: string;
}
