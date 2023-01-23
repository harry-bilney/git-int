const express = require('express')
const shell = require('shelljs')
const path = require('path')
const dotenv = require('dotenv')
const fs = require('fs')

dotenv.config()

const app = express()
const app_path = path.join(__dirname, 'app/', process.env.REPO)

if (!fs.existsSync(path.join(__dirname, 'app'))) {
	shell.mkdir('-p', path.join(__dirname, 'app'))
}

app.post('/git/on-push', (req, res) => {
	if (fs.existsSync(app_path)) {
		shell.cd(app_path)
		shell.exec('git pull')
		shell.exec('npm install')
		shell.exec('pm2 restart ' + process.env.REPO)
	} else {
		shell.cd(path.join(__dirname, 'app/'))
		shell.exec(
			'git clone https://github.com/harry-bilney/' + process.env.REPO + '.git'
		)
		shell.cd(app_path)
		shell.exec('npm install')
		shell.exec('pm2 restart ' + process.env.REPO)
	}
})

app.listen(process.env.PORT || 3000, () => {
	console.log('Watching git repo...')
})
