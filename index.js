const { GoogleSpreadsheet } = require('google-spreadsheet')
const credenciais = require('./credentials (1).json')
const arquivo = require('./arquivo (1).json')
const { JWT } = require('google-auth-library')

const SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets'
]

const jwt = new JWT({
    email: credenciais.client_email,
    key: credenciais.private_key,
    scopes: SCOPES,
})


async function GetDoc() {
    let newObject = new GoogleSpreadsheet(arquivo.id, jwt)
    await newObject.loadInfo()
    return newObject
}


async function ReadWorkSheet() {
    let read = (await GetDoc()).sheetsByIndex[0]
    let rows = await read.getRows()
    let users = rows.map(row => {
        return row.toObject()
    })
    return users
}


async function AddUser(data = {}) {
    const response = await fetch("https://apigenerator.dronahq.com/api/WnvJOA2f/Users", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });

    return response.json();
}


async function TrackData() {
    let data = await ReadWorkSheet()
    data.map(async (user) => {
        let response = await AddUser(user)
        console.log(response)
    })
    return console.log("Dados copiados com sucesso!")
}

TrackData()