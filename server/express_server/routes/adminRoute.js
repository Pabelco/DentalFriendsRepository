const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroSequelize = require('@admin-bro/sequelize')

const User = require('../models/user'); 
const UserDetails = require('../models/userDetails'); 

AdminBro.registerAdapter(AdminBroSequelize)
 
const adminBro = new AdminBro({
	resources: [User, UserDetails],
	rootPath: '/admin',
  })

const router = AdminBroExpress.buildRouter(adminBro)

module.exports = router;