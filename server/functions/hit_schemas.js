import dotenv from 'dotenv'
import fetch from 'node-fetch'
dotenv.config()

const establishConnection = async (req, res) => {
    console.log('establishing connection')
    if (process.env.LOCAL === 'false'){
        if (!req.user || !req.user.userId){
            return res.status(401).send('Unauthorized')
        }
    } else {
        console.log(req.user)
        req.user = {}
        req.user.userId = 'local'
    }
    let url = process.env.LOCAL === 'false' ? process.env.SCHEMAS_SERVER_URL : 'http://localhost:9194/'
    let body = {
        userId: req.user.userId,
        key: process.env.SCHEMAS_SERVER_KEY,
    }
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
    console.log(url, options)
    let response = await fetch(url, options).catch(err => {
        console.error(err)
        return res.status(500).send('Error: invalid response from schemas server' )
    })
    let data = await response.json()
    console.log(data)
    if (data){
        return data
    } else {
        return res.status(500).send('Error: invalid response from schemas server')
    }
}

const sendToFromDatabase = async (req, res) => {
    console.log('sending to database')
    if (process.env.LOCAL === 'true'){
        req.user = {}
        req.user.userId = 'local'
    }
    if (!req.user && process.env.LOCAL === 'false'){
        return res.status(200).send('No data processed')
    }
    let url = process.env.LOCAL === 'false' ? process.env.SCHEMAS_SERVER_URL + '/data' : 'http://localhost:9194/data'
    let body = {
        userId: req.user.userId,
        key: process.env.SCHEMAS_SERVER_KEY,
        actions: req.body.queue,
    }
    let copy = JSON.parse(JSON.stringify(req.body))
    delete copy.user
    delete copy.queue
    Object.assign(body, copy)

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
    let response = await fetch(url, options).catch(err => console.error(err))
    try {
    let data = await response.json()
    return res.send(data)}
    catch (err) {
        return res.status(500).send('Error: invalid response from schemas server' + err)
    }
}

export { establishConnection, sendToFromDatabase }