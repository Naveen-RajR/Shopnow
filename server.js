const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const app=express();
const bodyParser=require('body-parser');
const user=require('./Backend/APIS/api')
const admin=require('./Backend/APIS/adminAPI')
const cart=require('./Backend/APIS/cartapi')
const path=require('path')
dotenv.config()
app.use(express.static(path.join(__dirname,'./dist/shopnow')))

const PORT=process.env.PORT||3232
const dbUrl=process.env.dbUrl


mongoose.connect(dbUrl,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log(`MongoDB connected to ${mongoose.connection.host}`))
.catch((err)=>console.log(err.message));




app.use(bodyParser.json())

app.use('/user',user)
app.use('/admin',admin)
app.use('/cart',cart)

app.get('/',(req,res)=>{
    res.send("welcome to backend")
    
})

app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname,'./dist/shopnow/index.html'), err=> {
        if (err) {
           next(err)
        }
    })
})


app.listen(PORT,console.log(`Server running at a Port Number http://localhost:${PORT}`))