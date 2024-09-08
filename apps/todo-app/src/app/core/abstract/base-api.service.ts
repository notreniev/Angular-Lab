import { HttpClient } from '@angular/common/http'
import { IService } from '../interfaces/interface-service'
import { Observable, of } from 'rxjs'

export class BaseApiService<T> implements IService<T> {
  constructor(protected readonly http: HttpClient) {}

  get(): Observable<T> {
    return this.http.get<T>('https://jsonplaceholder.typicode.com/todos')
  }

  getById(): Observable<T> {
    return this.http.get<T>('https://jsonplaceholder.typicode.com/todos/1')
  }

  put(): Observable<void> {
    throw new Error('Method not implemented.')
  }

  putById(): T | Observable<T> | Promise<T> {
    throw new Error('Method not implemented.')
  }

  patch(): T | Observable<T> | Promise<T> {
    throw new Error('Method not implemented.')
  }

  post(): T | Observable<T> | Promise<T> {
    throw new Error('Method not implemented.')
  }

  delete(): T | Observable<T> | Promise<T> {
    throw new Error('Method not implemented.')
  }

  deleteById(): T | Observable<T> | Promise<T> {
    throw new Error('Method not implemented.')
  }
}
