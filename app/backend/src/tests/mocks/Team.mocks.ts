export default class MockModel<T> {
  constructor(private entity: T) {}
  
  public findAll(): T[] {
    return [this.entity];
  }

  public findById(id: number): T | undefined {
    return id === 1 ? this.entity : undefined
  }
}
