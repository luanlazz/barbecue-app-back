import { Hasher, HasherCompare } from '@/data/protocols/cryptography'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher, HasherCompare {
  constructor (private readonly salt: number) {}

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }

  async compare (value: string, hash: string): Promise<boolean> {
    const areEqual = await bcrypt.compare(value, hash)
    return areEqual
  }
}
