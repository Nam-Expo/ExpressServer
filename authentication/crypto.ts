import { createHash } from 'crypto'


export const getHash = (value: string) => {
    const hash = createHash('sha256');
    hash.update(value);
    return hash.copy().digest('hex')
}
  