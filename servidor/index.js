  // JWT
  require("dotenv-safe").config();
  const jwt = require('jsonwebtoken');
  var { expressjwt: expressJWT } = require("express-jwt");
  const cors = require('cors');
  const corsOpcoes = {
    //CLIENTE QUE FARA ACESSO
    origin: "http://localhost:3000",
    
    //METODOS QUE O CLIENTE PODERA EXECUTAR
    methods: "GET, PUT ,POST, DELETE",

    allowedHeaders: "Content-Type, Authotization",
    credentials: true

  }


  var cookieParser = require('cookie-parser')

  const express = require('express');
  const { usuario } = require('./models');

  const app = express();
  app.use(cors(corsOpcoes))

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
    }).unless({ path: ["/autenticar", "/logar", "/deslogar", "/", "/usuarios/listar"] })
  );

  app.get('/autenticar', async function(req, res){
    res.render('autenticar');
  })

  app.get('/', async function(req, res){
    res.render("home")
  })

  app.post('/logar', async function (req, res){
    const usuariodobanco = await usuario.findOne({where: {usuario: req.body.usuario, senha: crypto.encrypt(req.body.senha)}})
    
    if (usuariodobanco) {
      const id = usuariodobanco.id;
      const token = jwt.sign({id}, process.env.SECRET, {expiresIn:3800});
      return res.cookie("token", token, {httpOnly:true}).json({
        nome: usuariodobanco.usuario,
        token: token
      })
    }
   // return res.status(500).json({message:'credenciais erradas'})
  })
    

  app.post('/deslogar', function(req, res) {
    res.cookie('token', null, {httpOnly:true});
    return res.json({
      deslogado:true
    })
  })

 

  app.get('/usuarios/cadastrar', async function(req, res){
    res.render('cadastrar');
  })

  app.post('/usuarios/cadastrar', async function(req, res){

      if(req.body.senha){
        const encrypted_key = crypto.encrypt(req.body.senha);

        let usuariocrypto = req.body;
        usuariocrypto.senha = encrypted_key;

        await usuario.create(usuariocrypto);
        res.redirect('/usuarios/listar')
      }else{
      res.status(500).json({mensagem:"As senhas são diferentes"})
    }
  })

  app.get('/usuarios/listar', async function(req, res) {
    let usuarios = await usuario.findAll()
    res.json( usuarios);

  })
  
  app.listen(4000, function() {
    console.log('App de Exemplo escutando na porta 4000!')
  });
