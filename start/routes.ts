/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('login', 'AuthController.login')
  Route.post('register', 'UsersController.store')
  Route.get('me', 'AuthController.me').middleware('auth')
}).prefix('auth')

Route.group(() => {
  Route.resource('users', 'UsersController').apiOnly().except(['create'])
  Route.resource('credentials', 'CredentialsController').apiOnly()
  Route.resource('tags', 'TagsController').apiOnly()
  Route.resource('folders', 'FoldersController').apiOnly()
  Route.resource('folders.credentials', 'FolderCredentialsController').apiOnly()
}).middleware('auth')
