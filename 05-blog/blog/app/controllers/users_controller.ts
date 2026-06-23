import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import hash from '@adonisjs/core/services/hash'

export default class UsersController {

    public async registerForm({ view }: HttpContext) {
        return view.render('pages/register')
    }

    public async register({ response, request }: HttpContext) {
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
    }
}