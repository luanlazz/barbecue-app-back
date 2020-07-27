import paths from './paths'
import schemas from './schemas'
import components from './components'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Barbecue Api',
    description: 'App to manager barbecues entry friends',
    version: '1.0.0'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login'
  }, {
    name: 'Barbecue'
  }, {
    name: 'Participants'
  }],
  paths,
  schemas,
  components
}
