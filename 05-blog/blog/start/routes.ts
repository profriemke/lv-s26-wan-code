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

