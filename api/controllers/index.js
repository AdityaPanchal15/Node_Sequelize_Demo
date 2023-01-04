const { sequelize } = require('../../models')
var nodemailer = require('nodemailer');
const Users = sequelize.models.Users
const Department = sequelize.models.Department
Users.belongsTo(Department, { foreignKey:'deptId' })

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'adpanchal15@gmail.com',
    pass: 'guycqydngtxnvrzi'
  }
});

exports.getAllUsers = (req, res) => {
  Users.findAll().then(data => res.json(data)).catch(err => res.sendStatus(500).send(err));
}

exports.createUser = (req, res) => {
  Users
    .create({
      ...req.body
    })
    .then((data) => res.send({ message: 'Admin create user',data }))
    .catch(error => res.sendStatus(500).send(error))
}

exports.updateUser = (req, res) => {
  const updateId = req.params.id || req.query.id
  if (!updateId) {
    res.sendStatus(500).send('specify id to update user')
  }
  
  Users.update(
    req.body,
    { where: { id: updateId } }
  )
  .then (() => res.send({message: 'Admin update user'}))
  .catch(error => res.sendStatus(500).send(error))
}

exports.deleteUser = (req, res) => {
  const deletedId = req.params.id || req.query.id
  if (!deletedId) {
    res.sendStatus(500).send('specify id to update user')
  }

  Users.destroy({
    where: {
      id: deletedId
    }
  })
  .then (() => res.send({message:'Admin delete user'}))
  .catch(error => res.sendStatus(500).send('Internal error'))
}

exports.mailToGroup = async(req,res) => {
  const groupId = req.params.deptId || req.query.deptId
  const users = await Users.findAll({
    where: {deptId: groupId}
  })
  .then(users => users)
  .catch(error => res.sendStatus(500).send(error))

  let mailString = '';
  users.forEach(element => {
    mailString += element.emailId + ', '
  });

  const body = `<h1>Welcome welcome</h1>`
    var mailOptions = {
      from: 'adpanchal15@gmail.com',
      to: mailString,
      subject: 'Sending Email using Node.js',
      html: body
    };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      res.sendStatus(500).send(error);
    } else {
      res.json('Email sent: ' + info.response);
    }
  });
}

exports.mailToUser = async (req,res) => {
  const userId = req.params.id || req.query.id
  try {
    const user = await Users.findOne({
      where: {id: userId}
    }).then(data => data)
    
    const body = `<h1>Welcome to ${user.dataValues.name}</h1>`
    var mailOptions = {
      from: 'adpanchal15@gmail.com',
      to: user.dataValues.emailId,
      subject: 'Sending Email using Node.js',
      html: body
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        res.sendStatus(500).send(error);
      } else {
        res.send('Email sent: ' + info.response);
      }
    });
  } catch (error) {
    res.sendStatus(500).send(error);
  }
}