import { Hasher } from '@/data/protocols/cryptography/hasher'
import { HasherCompare } from '@/data/protocols/cryptography/hasher-compare'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher, HasherCompare {
  constructor (private readonly salt: number) {}

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }

  async compare (value: string, hash: string): Promise<boolean> {
    await bcrypt.compare(value, hash)
    return null
  }
}
