import { makeSaveBarbecueController, makeLoadBarbecuesController, makeLoadBarbecueByIdController } from '@/main/factories/controllers'
import { adaptRoute } from '@/main/adapters'
import { auth } from '@/main/middlewares'
import { Router } from 'express'

export default (route: Router): void => {
  route.put('/barbecue/:barbecueId?', auth, adaptRoute(makeSaveBarbecueController()))
  route.get('/barbecue/:barbecueId/', auth, adaptRoute(makeLoadBarbecueByIdController()))
  route.get('/barbecue/', auth, adaptRoute(makeLoadBarbecuesController()))
}
