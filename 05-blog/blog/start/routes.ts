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


router.get('/', async ({ view })=>{
  const posts = await db.from('posts')
                        .select ('*')

  return view.render('pages/home', { posts: posts})
})

// Dynamische Route für Post-Detailansicht

router.get('/article/:id', async ({ view, params})=>{
  const post = await db.from('posts')
                       .select('*')
                       .where({
                          id: params.id
                       })
                       .first()

  return view.render('pages/article', { post: post})
})

// Neue Posts

router.get('/post/create', async ({ view })=>{
  return view.render('pages/post_create')
})

router.post('/post/create', async ({ request, response })=>{
  const title = request.input('title')
  const teaser = request.input('teaser')
  const text = request.input('text')

  if(!title || !teaser || !text){
    return response.redirect('/post/create')
  }

  const result = await db.table('posts')
                         .insert(
                          {
                            title: title,
                            teaser: teaser,
                            text: text,
                            author: 'Kalle',
                            date: new Date().toDateString()
                          })
  console.log(result)
  return response.redirect('/')
})