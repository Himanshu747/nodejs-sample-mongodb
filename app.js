const path=require('path');
const express=require('express');
const bodyParser=require('body-parser');
const errorController=require('./controllers/error');
const mongoConnect=require('./util/database').mongoConnect;
const app=express();
const User=require('./models/user');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use((req, res, next) => {
  User.findById('682638c623645d4cc279de53')
    .then(user => {
      req.user = new User(user.name,user.email,user.cart,user._id);
      next();
    })
    .catch(err =>console.log('Error fetching user:', err));
});

const adminRoutes=require('./routes/admin');
const shopRoutes=require('./routes/shop');


app.set('view engine','ejs');
app.set('views','views');

app.use('/admin',adminRoutes);
app.use("/",shopRoutes);

app.use(errorController.get404);

mongoConnect(()=>{
   
    app.listen(3000);
})
//app.listen(3000);