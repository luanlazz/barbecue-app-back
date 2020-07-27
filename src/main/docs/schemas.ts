import {
  authenticationSchema,
  loginParamsSchema,
  signUpParamsSchema,
  barbecueSchema,
  barbecuesSchema,
  saveBarbecueParamsSchema,
  participantSchema,
  participantsSchema,
  saveParticipantParamsSchema,
  errorSchema
} from './schemas/'

export default {
  authentication: authenticationSchema,
  signUpParams: signUpParamsSchema,
  loginParams: loginParamsSchema,
  barbecue: barbecueSchema,
  barbecues: barbecuesSchema,
  saveBarbecueParams: saveBarbecueParamsSchema,
  participant: participantSchema,
  participants: participantsSchema,
  saveParticipantParams: saveParticipantParamsSchema,
  error: errorSchema
}
