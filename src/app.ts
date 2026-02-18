import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { type Application, type Request, type Response } from 'express'
const app:Application = express()
const port = 3000


app.use(express.json())
app.use(cookieParser())
app.use(cors())


app.get('/', (_req:Request, res:Response) => {




            res.send('Hello From WiseWallet!')
})

app.get('/test-error', (_req:Request, res:Response, next)=>{
      const err = new Error("Error Testing.!")
            
      
      
      next(err)
})



export default app