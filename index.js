const express = require('express')
const shell = require('shelljs')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const app_path = path.join(__dirname, 'app/', process.env.REPO)

app.post('/git/on-push', (req, res) => {
	shell.cd(app_path)
	shell.exec(
		'git fetch https://github.com/harry-bilney/' + process.env.REPO + '.git -p'
	)
})

app.listen(process.env.PORT || 3000, () => {
	console.log('Watching git repo...')
})
