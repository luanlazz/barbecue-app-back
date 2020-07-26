import { makeSaveBarbecueController } from '@/main/factories/controllers/barbecue/save/save-barbecue-controller-factory'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { auth } from '@/main/middlewares/auth/auth'
import { Router } from 'express'

export default (route: Router): void => {
  route.put('/barbecue/:barbecueId?', auth, adaptRoute(makeSaveBarbecueController()))
}
