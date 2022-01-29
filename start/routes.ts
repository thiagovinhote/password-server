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
  Route.group(() => {
    Route.get('me', 'AuthController.me')
    Route.post('logout', 'AuthController.logout')
  }).middleware('auth')
}).prefix('auth')

Route.group(() => {
  Route.resource('users', 'UsersController').apiOnly().except(['create'])
  Route.resource('tags', 'TagsController').apiOnly()
  Route.resource('credentials', 'CredentialsController').apiOnly()
  Route.resource('credentials.tags', 'CredentialTagsController').only(['store', 'destroy'])
  Route.resource('folders', 'FoldersController').apiOnly()
  Route.resource('folders.credentials', 'FolderCredentialsController').apiOnly()
  Route.resource('credentials.password', 'PasswordController').only(['index'])
}).middleware('auth')
