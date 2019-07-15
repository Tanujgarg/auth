const express = require("express")
const app = express()
const mongoose = require("mongoose")
const User = require("./model")


mongoose.connect("mongodb+srv://user:user@cluster0-5el5m.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(connect => console.log("connect"))
  .catch(err => {
    console.log(err.message)
  })

app.use(require("cors")({
  origin: true
}))
app.use(require("body-parser").json())


app.post('/signup', (req, res) => {
  if (!req.body.username || !Request.body.password || !req.body.secret) {
    return res.status(400).send("username,password and secret required")
  }

  let newUser = new User(req.body)
  newUser.save(err => {
    if (err) return res.status(400).send(err.message)
    else return res.send("success")
  })

})

app.post('/login', (req, res) => {
  if (!req.body.username || !Request.body.password) {
    return res.status(400).send("username and password required")
  }

  User.findOne({
      username: req.body.username,
      password: req.body.password
    })
    .then(user => {
      if (user) return res.send("login success")
      else return res.status(401).send("login failed")
    })
    .catch(err => {
      return res.status(400).send(err.message)
    })

})


app.post('/reset', (req, res) => {
  if (!req.body.username || !Request.body.newPassword) {
    return res.status(400).send("username, secret and newPassword required")
  }

  User.findOneAndUpdate({
      username: req.body.username,
      secret: req.body.secret
    }, {
      password: req.body.newPassword
    }, {
      new: true
    })
    .then(user => {
      if (user) return res.send("reset success")
      else return res.status(401).send("reset failed")
    })
    .catch(err => {
      return res.status(400).send(err.message)
    })

})

app.listen(11223, '0.0.0.0', () => {
  console.log("connected")
})