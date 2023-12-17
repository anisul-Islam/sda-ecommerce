import { DecodedUser } from '../redux/slices/products/productSlice'

export function isDecodedUser(obj: unknown): obj is DecodedUser {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'username' in obj &&
    'role' in obj &&
    'user_id' in obj
  )
}
