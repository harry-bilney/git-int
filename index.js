const express = require('express')
const shell = require('shelljs')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const app_path = path.join(__dirname, process.env.APP)

app.post('/git/on-push', (req, res) => {
	/*
	shell.cd(app_path)
	shell.exec(
		'git clone https://github.com/harry-bilney/' + process.env.REPO + '.git'
	)
	*/
	console.log(process.env.REPO)
})

app.listen(process.env.PORT || 3000, () => {
	console.log('Watching git repo...')
})
