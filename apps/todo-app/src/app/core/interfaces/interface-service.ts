import { Observable } from 'rxjs'

export interface IService<T> {
  get(): Promise<T> | Observable<T> | T
  getById(): Promise<T> | Observable<T> | T
  put(): Promise<T> | Observable<T> | Observable<void> | T | void
  putById(): Promise<T> | Observable<T> | T
  patch(): Promise<T> | Observable<T> | T | never
  post(): Promise<T> | Observable<T> | T | never
  delete(): Promise<T> | Observable<T> | T | never
  deleteById(): Promise<T> | Observable<T> | T | never
}
