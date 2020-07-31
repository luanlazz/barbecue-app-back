import { makeSaveBarbecueController } from '@/main/factories/controllers/barbecue/save/save-barbecue-controller-factory'
import { makeLoadBarbecueByIdController } from '../factories/controllers/barbecue/load-by-id/load-barbecue-by-id-controller-factory'
import { makeLoadBarbecuesController } from '@/main/factories/controllers/barbecue/load-all/load-barbecues-controller-factory'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { auth } from '@/main/middlewares/auth/auth'
import { Router } from 'express'

export default (route: Router): void => {
  route.put('/barbecue/:barbecueId?', auth, adaptRoute(makeSaveBarbecueController()))
  route.get('/barbecue/:barbecueId/', auth, adaptRoute(makeLoadBarbecueByIdController()))
  route.get('/barbecue/', auth, adaptRoute(makeLoadBarbecuesController()))
}
