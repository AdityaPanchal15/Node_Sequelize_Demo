const { getAllUsers, createUser, updateUser, deleteUser, mailToGroup, mailToUser } = require("../api/controllers");
const { roleBaseMiddleWare } = require("../api/middlewares");
const app = require('express')
const router = app.Router()

/****
 * Case 1:
    A. There will be two kind of users Admin and Normal users.
    B. The Admin user has the ability to create, update, delete, and add normal users to the application.
    C. Admin user can create groups of normal users. One normal user can available to one or more groups.
    Not mandatory that every normal user having group.
 */
  router.get('/getAllUsers', roleBaseMiddleWare, getAllUsers)
  
  router.post('/createUser', roleBaseMiddleWare, createUser)
  
  router.patch('/updateUser', roleBaseMiddleWare, updateUser)
  
  router.delete('/deleteUser', roleBaseMiddleWare, deleteUser)
  
  /**************************************************************************************************** */
  
  
  /****
   * Case 2:
      A. Admin user has the ability to send emails to a specific group of normal users.
      B. Admin user can also send email to a specific normal user.
      C. Email body template are managed separately.
      D. Only admin user can send email.
    */
  
  router.get('/mailToGroup', roleBaseMiddleWare, mailToGroup)
  
  router.get('/mailToUser', roleBaseMiddleWare, mailToUser)
  
  /**************************************************************************************************** */
    
  module.exports = router