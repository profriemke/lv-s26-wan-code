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
import db from '@adonisjs/lucid/services/db'


let count = 0

let votes = {
  spitze: 0,
  geht: 0,
  weg: 0
}

router.get('/vote/result', async ({ view })=>{
   return view.render('pages/vote_result', { result: votes})
})

router.get('/vote', async ({ view })=>{
    return view.render('pages/vote')
})

router.post('/vote', async ({ view, request })=>{
  const vote = request.input('vote')
  if(vote == 'spitze'){
    votes.spitze++
  }
  if(vote == 'geht'){
    votes.geht++
  }
  if(vote == 'weg'){
    votes.weg++
  }
  console.log(votes)
  return view.render('pages/vote_danke')

})

router.get('/kunden', async ({ view })=>{

  const kunden = await db.from('kunde')
                         .select('*')
                         .where({ ort: 'Stuttgart', anrede: 'Frau'})
                         .limit(10)
  return view.render('pages/kunden', { kunden: kunden})   
             
})

router.get('/hello', async ({ view })=>{
  return view.render('pages/hello')
})


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