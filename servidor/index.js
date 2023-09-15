// JWT
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
var { expressjwt: expressJWT } = require("express-jwt");
const cors = require('cors');

var cookieParser = require('cookie-parser')

const express = require('express');
const { usuario } = require('./models');

const app = express();

const crypto = require('./crypto');


app.set('view engine', 'ejs');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

app.use(cookieParser());
app.use(
  expressJWT({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    getToken: req => req.cookies.token
  }).unless({ path: ["/autenticar", "/logar", "/deslogar", "/"] })
);

app.get('/autenticar', async function(req, res){
  res.render('autenticar');
})

app.get('/', async function(req, res){
  res.render("home")
})

app.post('/logar', (req, res) => {
  if(req.body.usuario == "filipe" && req.body.senha == 12345) {

    const id = 1;
    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 300
    })

    res.cookie('token', token, {httpOnly:true});
    return res.json({
      usuario: req.body.usuario,
      token: token
    })
  }
  res.status(500).json({mensagem:"login invalido"})

})

app.post('/deslogar', function(req, res) {
  res.cookie('token', null, {httpOnly:true});
  return res.json({
    deslogado:true
  })
})

app.get('/usuarios/listar', async function(req, res) {
  let usuarios = await usuario.findAll()
  res.render('listar', {users: usuarios});

})

app.get('/usuarios/cadastrar', async function(req, res){
  res.render('cadastrar');
})

app.post('/usuarios/cadastrar', async function(req, res){
  
    if(req.body.senha == req.body.confisenha){
      await usuario.create(req.body);
      res.redirect('/usuarios/cadastrar')
      
      let usuariocrypto = req.body;
      //vai ter que criar a senha criptografada no banco de dados
      //vai ter que chamar ela do banco de dados
      //descriptografar a senha e comparar elas
      const encrypted_key = crypto.encrypt(usuariocrypto.senha);
      console.log("senha criptografada: " + encrypted_key);
  
      const decrypted_key = crypto.decrypt(encrypted_key);
      console.log("descryptografada: " + decrypted_key)
  
    }else{
    res.status(500).json({mensagem:"As senhas são diferentes"})
  }
})

app.listen(3000, function() {
  console.log('App de Exemplo escutando na porta 3000!')
});