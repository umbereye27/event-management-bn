import app from "./src";
import dotenv from 'dotenv'

dotenv.config()

app.listen(process.env.PORT || 4000,()=>{
    console.log('Server connected successfully')
})