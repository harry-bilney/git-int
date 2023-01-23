import express from 'express'
import dotenv from 'dotenv'
import shell from 'shelljs'

dotenv.config()

const app = express()

app.post('/git/on-push', (req, res) => {
	console.log(req.body)
})

app.listen(process.env.PORT || 3000, () => {
	console.log('Watching git repo...')
})
