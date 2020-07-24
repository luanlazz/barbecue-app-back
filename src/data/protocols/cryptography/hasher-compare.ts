export interface HasherCompare {
  compare (value: string, hash: string): Promise<boolean>
}
