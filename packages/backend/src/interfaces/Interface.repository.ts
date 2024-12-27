export interface InterfaceRepository<T>{
  count(): Promise<number>;
  findAll(): Promise<T[]>;
  findOneById(id: string): Promise<T | null>;
  createOne(CreateData: Partial<T>): Promise<T>;
  updateOne(id: string, UpdateData: Partial<T>): Promise<T>;
  deleteOne(id: string): Promise<T | null>;
  deleteMany(): Promise<void>;
}