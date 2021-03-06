const express = require('express')
const app = express()
const path = require('path')
const { handlebars, engine } = require('express-handlebars')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')
require('dotenv').config()
const port = process.env.PORT_ENV

var bcrypt = require('bcryptjs')
var saltRounds = 10
var salt = bcrypt.genSaltSync(saltRounds)
// var hash = bcrypt.hashSync(senha, salt);

//configurações

//json
app.use(express.json());



//cookies
app.use(cookieParser());

// config session
var minute = 60000

app.use(session({
    secret: 'meu_segredo',
    cookie: {
        maxAge: minute * 60,
    },
    resave: true,
    saveUninitialized: true
}));

// req flash
app.use(flash())    


app.use((req, res, next) => {

    // auth config
    res.locals.authenticated = []
    res.locals.isAdmin = []

    // flash config
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')

    //authenticated and admin config
    const authenticated = req.session.authenticated
    const isAdmin = req.session.isAdmin 
    
    next()

})

//config
app.set('views', path.join(__dirname, 'views'))

//template engine
app.engine('handlebars', engine({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

//Body Parser
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

//criando link para o diretório public (css, js, imagens e outros)
app.use(express.static(path.join(__dirname, 'public')))

// importando a rota a utilizar na Home
const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth')
const adminRouter = require('./routes/admin')
const createRouter = require('./routes/create')
const updateRouter = require('./routes/update')
const deleteRouter = require('./routes/delete')

//usando a rota importada 
app.use('/', indexRouter)

//usando as rotas para autenticação de usuário
app.use('/', authRouter)

//administrador
app.use('/admin', adminRouter)

//create
app.use('/criar', createRouter)

//update
app.use('/atualizar', updateRouter)

// destroy
app.use('/deletar/', deleteRouter)


//servidor local onde vai rodar a aplicação
app.listen(port, () => {
    console.log('Rodando na url http://localhost:' + port)
})
