import {
  FieldPath,
  WhereFilterOp,
  OrderByDirection
} from 'firebase/firestore'
import { UploadTask } from 'firebase/storage'

export interface Option {
  title: string
  value: string
}

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

export interface Query {
  where?: [fieldPath: string | FieldPath, opStr: WhereFilterOp, value: unknown]
  orderBy?: [fieldPath: string | FieldPath, directionStr?: OrderByDirection]
  limit?: number
}
