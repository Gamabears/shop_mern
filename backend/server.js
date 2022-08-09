const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 8000
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')


//Connect to DB
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.send('Hello')
})

//Routes
app.use('/api/users',require('./routes/userRoutes'))
app.use(errorHandler)
app.listen(PORT,()=>console.log(`Server started on port ${PORT}`))