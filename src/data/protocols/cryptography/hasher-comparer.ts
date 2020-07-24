export interface HasherComparer {
  comparer (value: string, hash: string): Promise<boolean>
}
