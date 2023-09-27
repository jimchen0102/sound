import { UploadTask } from 'firebase/storage'

export enum AuthType {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER'
}

export interface Upload {
  progress: number
  state: string
  task: UploadTask
  title: string
}
