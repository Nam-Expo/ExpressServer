import { createHash } from 'crypto'

const hash = createHash('sha256');

export const getHash = (value: string) => {
    hash.update(value);
    return hash.copy().digest('hex')
}
  