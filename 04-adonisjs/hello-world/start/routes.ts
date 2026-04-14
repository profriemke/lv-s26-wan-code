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

let count = 0

router.get('/', async ({ view })=>{
    return view.render('pages/home', {name: 'Horsti', 
      tag: 'Donnerstag', 
      freunde: ['Tara', 'Klausi', 'Susi', 'Manni'],
      anzeigeFreunde:false})
})

router.get('/nutzer', async ({ view })=>{
  return view.render('pages/form')
})

router.post('/nutzer/anzeige', async ({ view, request })=>{
  const vorname = request.input('vorname')
  const nachname = request.input('nachname')
  if(!vorname || !nachname ){
      return view.render('pages/form')
  }
  return view.render('pages/anzeige', {vorname: vorname, 
                                       nachname: nachname })
})

router.get('/count', async ({ view })=>{
  count++
  return view.render('pages/count', { count: count})

})

router.get('/data', async (ctx)=>{
  return ctx
})