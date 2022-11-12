if (process.env.NODE_ENV !== "rhondev") {
    require("dotenv").config()
}


// Importing Libraies that we installed using npm
const express = require("express")
const app = express()
const bcrypt = require("bcrypt") // Importing bcrypt package
const passport = require("passport")
const initializePassport = require("./passport-config")
const flash = require("express-flash")
const session = require("express-session")
const methodOverride = require("method-override") //allow us to logout
const { response } = require("express")

initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
    )



const users = []
//static resources(photos $ styles)
app.use('/public', express.static(__dirname + "/public"));

app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, // We wont resave the session variable if nothing is changed
    saveUninitialized: false
}))
app.use(passport.initialize()) 
app.use(passport.session())
app.use(methodOverride("_method"))

// Configuring the login post functionality
app.post("/login", checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true
}))

// Configuring the register post functionality
app.post("/register", checkNotAuthenticated, async (req, res) => {

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(), 
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        })
        console.log(users); // Display newly registered in the console
        res.redirect("/login")
        
    } catch (e) {
        console.log(e);
        res.redirect("/register")
    }
})

// Routes
app.get('/', (req, res) => {
    res.render("index.ejs")
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render("login.ejs")
})

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render("register.ejs")
})
app.get('/dashboard',checkAuthenticated,(req,res)=>{
    res.render(('dashboard.ejs'), {name: req.user.name})
})
app.get('/reconciliation',(req,res)=>{
    res.render("reconciliation.ejs")
})
app.get('/orders',(req,res)=>{
    res.render("orders.ejs")
})
app.get('/analytics',(req,res)=>{
    res.render("analytics.ejs")
})
app.get('/stock', (req, res)=>{
    res.render("stock.ejs")
})
app.get('/about',(req,res)=>{
    res.render("about.ejs")
})
app.get('/benefits',(req,res)=>{
    res.render("benefits.ejs")
})
app.get('/contacts',(req,res)=>{
    res.render("contacts.ejs")
})

// End Routes

// app.delete('/logout', (req, res) => {
//     req.logOut()
//     res.redirect('/login')
//   })

app.delete("/logout", (req, res) => {
    req.logout(req.user, err => {
        if (err) return next(err)
        res.redirect("/")
    })
})

function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect("/dashboard")
    }
    next()
}

app.listen(3000, function(){
    console.log("listening on port 3000");
})
