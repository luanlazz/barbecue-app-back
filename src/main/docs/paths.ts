import { signUpPath, loginPath, barbecuePath, barbecueGetPath, participantPath } from './paths/'

export default {
  '/signup': signUpPath,
  '/login': loginPath,
  '/barbecue': barbecueGetPath,
  '/barbecue/{barbecueId}': barbecuePath,
  '/barbecue/{barbecueId}/participants': participantPath
}
