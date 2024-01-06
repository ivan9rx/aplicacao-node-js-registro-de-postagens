const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

const Post = require('./models/Post');
const { where } = require('sequelize');


//Config
    //template engine
    app.engine('handlebars', handlebars({defaultLayout: 'main', runtimeOptions: { allowProtoPropertiesByDefault: true, allowProtoMethodsByDefault: true,},}))
    app.set('view engine', 'handlebars');
    //body parser
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());
// rotas


    app.get('/', function(req,res) {
        Post.findAll({order: [['id', 'DESC']]}).then(function(posts) {
            res.render('home', {posts: posts})
        })
       
    })

    app.get('/cad', function(req,res) {
        res.render('form.handlebars')
    });

    app.post('/add', function(req,res) {
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }).then(function() {
            res.redirect('/')
        }).catch(function (erro) {
            res.send("Houve um erro "+erro)
        })

        
    });

    app.get('/delete/:id', function(req,res) {
        Post.destroy({where: {'id': req.params.id}}).then(function () {
            res.send("Postagem excluida!")
        }).catch(function (erro) {
            res.send("Esta postagem não existe")
        })
    });




app.listen(8080, function() {console.log("servidor rodando")});