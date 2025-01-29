export interface InterfaceRepository<T>{
  count(): Promise<number>;
  findAll(): Promise<T[]>;
  findOneById(id: number): Promise<T | null>;
  createOne(CreateData: Partial<T>): Promise<T>;
  updateOne(id: number, UpdateData: Partial<T>): Promise<T>;
  deleteOne(id: number): Promise<T | null>;
  deleteMany(): Promise<void>;
}