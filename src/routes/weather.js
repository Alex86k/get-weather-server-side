const { Router }  = require ('express')
const router = Router()


import { weather } from '../controllers'

router.get('/:city ', weather.getWeather)

export default router