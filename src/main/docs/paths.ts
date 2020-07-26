import { signUpPath, loginPath, barbecuePath } from './paths/'

export default {
  '/signup': signUpPath,
  '/login': loginPath,
  '/barbecue/{barbecueId}': barbecuePath
}
