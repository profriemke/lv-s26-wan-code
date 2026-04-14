/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'


router.get('/', async ({ view })=>{
    return view.render('pages/home', {name: 'Horsti', 
      tag: 'Donnerstag', 
      freunde: ['Tara', 'Klausi', 'Susi', 'Manni'],
      anzeigeFreunde:false})
})

router.get('/data', async (ctx)=>{
  return ctx
})