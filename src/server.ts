import mongoose from "mongoose"
import app from "./app.js"

const PORT = 3000

let server 

async function main(){
  try {
    await mongoose.connect('mongodb://localhost:27017/wise-wallet')
    console.log('DB Connected Successfully')

    server = app.listen(PORT, ()=>{
      console.log(`WiseWallet Server Is Listening On Port => http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Failed To Connect With DB', error)
    process.exit(1)
  }
}

main()