// RepositoryFactory.ts

// Accepts any interface/class as repository type
export class RepositoryFactory {
  // Map to store already instantiated repositories (Singleton per class)
  private static repositories = new Map<new () => unknown, unknown>();

  /**
   * Returns a singleton instance of the requested repository class.
   * @param RepositoryClass - The class constructor of the repository.
   * @returns An instance of the requested repository.
   */
  public static getRepository<T>(RepositoryClass: new () => T): T {
    if (!this.repositories.has(RepositoryClass)) {
      this.repositories.set(RepositoryClass, new RepositoryClass());
    }
    return this.repositories.get(RepositoryClass) as T;
  }
}
