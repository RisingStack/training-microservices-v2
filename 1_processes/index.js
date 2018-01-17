'use strict'

switch (process.env.PROCESS_TYPE) {
  case 'web':
    require('./web')
    break
  case 'worker':
    require('./worker')
    break
  case 'clock':
    require('./clock')
    break
  default:
    throw new Error('Process type has to be one of: web, worker, clock')
}
