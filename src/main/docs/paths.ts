import { signUpPath, loginPath, barbecuePath, barbecueGetPath, participantPath, participantWithIdPath } from './paths/'

export default {
  '/signup': signUpPath,
  '/login': loginPath,
  '/barbecue': barbecueGetPath,
  '/barbecue/{barbecueId}': barbecuePath,
  '/barbecue/{barbecueId}/participants/': participantPath,
  '/barbecue/{barbecueId}/participants/{participantId}': participantWithIdPath
}
