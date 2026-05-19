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
import hash from '@adonisjs/core/services/hash'

router.get('/about', async ({ view})=>{
 return view.render('pages/about')
})

router.post('/post/update', async ({ request, response }) => {
  const id = request.input('id')
  const title = request.input('title')
  const teaser = request.input('teaser')
  const text = request.input('text')

  const result = await db.from('posts')
    .update({
      title: title,
      text: text,
      teaser: teaser,
       date: new Date().toDateString()
    })
    .where({
      id: id
    })
  return response.redirect('/article/' + id)

})

router.get('/post/edit/:id', async ({ params, view }) => {

  const post = await db.from('posts')
    .select('*')
    .where({
      id: params.id
    })
    .first()
  return view.render('pages/edit', { post: post })

})

router.get('/register', async ({ view }) => {
  return view.render('pages/register')
})

router.post('/register', async ({ response, request }) => {
  const firstname = request.input('firstname')
  const lastname = request.input('lastname')
  const login = request.input('login')
  const password = request.input('password')

  const result = await db.table('users')
    .insert({
      firstname: firstname,
      lastname: lastname,
      password: await hash.make(password),
      login: login,
     
    })
  return response.redirect('/login')
})


router.get('/login', ({ view }) => {
  return view.render('pages/login')
})

router.get('/logout', async ({ session, response }) => {
  session.forget('login')
  session.forget('firstname')
  session.forget('lastname')
  return response.redirect('/')
})


router.post('/login', async ({ request, response, session }) => {
  const login = request.input('login')
  const password = request.input('password')

  const result = await db.from('users')
    .select('*')
    .where({
      login: login
    })
    .first()
  if (!result) {
    return response.redirect('/login')
  }

  if (await hash.verify(result.password, password) != true) {
    return response.redirect('/login')
  }

  session.put('login', result.login)
  session.put('firstname', result.firstname)
  session.put('lastname', result.lastname)
  return response.redirect('/')

})


router.get('/', async ({ view }) => {
  const posts = await db.from('posts')
    .select('*')

  console.log(posts)
  return view.render('pages/home', { posts: posts })
})

// Dynamische Route für Post-Detailansicht

router.get('/article/:id', async ({ view, params }) => {
  const post = await db.from('posts')
    .select('*')
    .where({
      id: params.id
    })
    .first()

  return view.render('pages/article', { post: post })
})

// Neue Posts

router.get('/post/create', async ({ view, session, response }) => {
  if (session.get('login') == undefined) {
    return response.redirect('/login')
  }
  return view.render('pages/post_create')
})

router.post('/post/create', async ({ request, response, session }) => {
  if (session.get('login') == undefined) {
    return response.redirect('/login')
  }
  const title = request.input('title')
  const teaser = request.input('teaser')
  const text = request.input('text')

  if (!title || !teaser || !text) {
    return response.redirect('/post/create')
  }

  const result = await db.table('posts')
    .insert(
      {
        title: title,
        teaser: teaser,
        text: text,
        author: session.get('login'),
        date: new Date().toDateString()
      })
  console.log(result)
  return response.redirect('/')
})

router.get('/data', async (ctx) => {
  return ctx
})


router.get('/a', async ({ session }) => {
  session.put('text', 'Riemke war da')
  return 'Wert gesetzt';
});

router.get('/b', async ({ session }) => {
  return session.get('text');
});

router.get('/counter', async ({ view, session }) => {
  console.log(session.get('count'))
  if (session.get('count') == undefined) {
    // Sonderfall: count noch nicht vorhanden 
    session.put('count', 1)
  } else {
    // count erhöhen 
    session.put('count', session.get('count') + 1)
  }
  return session.get('count')
})

router.get('/hash', async () => {
  const hashedPassword = await hash.make("katze123");
  return hashedPassword
})