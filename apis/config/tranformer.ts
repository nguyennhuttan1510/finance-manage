import { AxiosResponse } from 'axios';

export type ResponseAPI<T = any> = AxiosResponse<{
  data: T;
  status: boolean;
  message: string;
}>;

// export abstract class RepositoryAPI {
//   abstract create<P, T>(object: P): Promise<ResponseAPI<T>>;
//   abstract findOne<P, T>(id: P): Promise<ResponseAPI<T>>;
//   abstract search<P, T>(object: P): Promise<ResponseAPI<T>>;
//   abstract update<P, T>(object: P): Promise<ResponseAPI<T>>;
//   abstract delete<P, T>(id: P): Promise<ResponseAPI<T>>;
// }
