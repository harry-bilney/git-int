const express = require('express')
const shell = require('shelljs')
const path = require('path')
const dotenv = require('dotenv')
const fs = require('fs')

dotenv.config()

const app = express()
const app_path = path.join(__dirname, 'app/', process.env.REPO)

app.post('/git/on-push', (req, res) => {
	if (fs.existsSync(app_path)) {
		shell.exec('pm2 kill')
		shell.cd(app_path)
		shell.exec('git pull')
		shell.exec('npm install')
		shell.exec('pm2 start index.js')
	} else {
		shell.exec('pm2 kill')
		shell.cd(path.join(__dirname, 'app/'))
		shell.exec(
			'git clone https://github.com/harry-bilney/' + process.env.REPO + '.git'
		)
		shell.exec('npm install')
		shell.exec('pm2 start index.js')
	}
})

app.listen(process.env.PORT || 3000, () => {
	console.log('Watching git repo...')
})
