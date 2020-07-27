import { makeSaveParticipantController } from '@/main/factories/controllers/barbecue-participant/save/save-participant-controller-factory'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { auth } from '@/main/middlewares/auth/auth'
import { Router } from 'express'

export default (route: Router): void => {
  route.put('/barbecue/:barbecueId/participants', auth, adaptRoute(makeSaveParticipantController()))
}
