import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class PostsController {
    public async home({ view }: HttpContext) {
        const posts = await db.from('posts')
            .select('*')

        console.log(posts)
        return view.render('pages/home', { posts: posts })
    }
    public async update({ request, response }: HttpContext) {
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
    }
}