import { signUpPath, loginPath, barbecuePath, barbecueWithIdPath, participantPath, participantWithIdPath } from './paths/'

export default {
  '/signup': signUpPath,
  '/login': loginPath,
  '/barbecue': barbecuePath,
  '/barbecue/{barbecueId}': barbecueWithIdPath,
  '/barbecue/{barbecueId}/participants/': participantPath,
  '/barbecue/{barbecueId}/participants/{participantId}': participantWithIdPath
}
