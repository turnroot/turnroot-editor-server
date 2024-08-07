const createNewObject = async (
    familiarName, subtype
) => {
    console.log('creating new object')
    let url = 'http://localhost:26068/data'
    let method = 'POST'
    let headers = {
        'Content-Type': 'application/json'
    }
    let body = {}

    body.name = familiarName
    body.subtype = subtype

    body.queue = [{
        model: 'Object',
        method: 'create',
    }]

    console.log(body)
    let options = {
        method: method,
        headers: headers,
        body: JSON.stringify(body)
    }

    let response = await fetch(url, options).catch(err => {
        console.error(err)
        return w2alert('Error: invalid response from schemas server')
    })
    if (response.ok) {
        let data = await response.json()
        console.log(data)
        return data
    } else {
        return w2alert('Error: invalid response from schemas server')
    }
}

export default createNewObject