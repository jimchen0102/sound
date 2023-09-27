import { UploadTask } from 'firebase/storage'

export enum AuthType {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER'
}

export interface Upload {
  task: UploadTask
  name: string
  progress: number
  state: string
}
