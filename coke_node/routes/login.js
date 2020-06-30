var express = require('express');
var router = express.Router();
const fs = require('fs')
const path = require('path')
const md5 =  require('md5')

// 处理登录相关逻辑
router.use('/in', function(req, res, next) {
  const data = req.body
  if (!data.hasOwnProperty('user') || data.user === '') {
    res.send({msg: 'noUser'});
  } else if (!data.hasOwnProperty('pwd') || data.pwd === '') {
    res.send({msg: 'noPwd'});
  } else {
      let users = ''
      const usersCRF = fs.createReadStream(path.join(__dirname, '../login/users.json'))
      usersCRF.on('data', (usersCRF_data) => {
          users += usersCRF_data
      })
      usersCRF.on('end', () => {
          users = JSON.parse(users)
          for (let user in users) {
              if (users[user].username === data.user && users[user].password === md5(data.pwd)) {
                res.send({msg: 'success', data: {
                  id: user,
                  username: users[user].username
                }});
                return
              }
          }
          res.send({msg: 'error'});
      })
      usersCRF.on('error', () => {
        res.send({msg: 'error'});
      })
  }
})

router.use('/register', (req, res, next) => {
  const data = req.body
  if (!data.hasOwnProperty('user') || data.user === '') {
    res.send({msg: 'noUser'});
  } else if (!data.hasOwnProperty('pwd') || data.pwd === '' || !data.hasOwnProperty('oncePwd') || data.oncePwd === '') {
    res.send({msg: 'noPwd'});
  } else if (data.pwd !== data.oncePwd) {
    res.send({msg: 'pwd'});
  } else {
    let users = ''
    const usersCRF = fs.createReadStream(path.join(__dirname, '../login/users.json'))
    usersCRF.on('data', (usersCRF_data) => {
      users += usersCRF_data
    })
    usersCRF.on('end', () => {
      users = JSON.parse(users)
      if (users.hasOwnProperty(data.user)) {
        res.send({msg: 'noUser'});
      } else {
        const id = getId(users)
        users[id] = {
          "username": data.user,
          "password": md5(data.pwd)
        }
        const usersCWF = fs.createWriteStream(path.join(__dirname, '../login/users.json'))
        usersCWF.write(JSON.stringify(users))
        usersCWF.on('err', () => {
          res.send({msg: 'error'});
        });
        res.send({msg: 'success', data: {
          id: id,
          userName: data.user
        }});
      }
    })
    usersCRF.on('error', () => {
      res.send({msg: 'error'});
    })
  }
})

function getId (users) {
  let id = new Date().getTime()
  if (users.hasOwnProperty(id)) {
    getId(users)
  } else {
    return id
  }
}

module.exports = router;
