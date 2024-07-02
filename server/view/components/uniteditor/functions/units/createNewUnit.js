const createNewUnit = async (
    subtype, familiarName
) => {
    console.log('creating new unit')
    console.log(subtype)
    let url = 'http://localhost:26068/data'
    let method = 'POST'
    let headers = {
        'Content-Type': 'application/json'
    }
    let body = {}
    body.which = subtype
    if (subtype === 'avatar'){
    body.canSSupport = true
    body.canHaveChildren = true
    }
    body.name = familiarName
    
    body.queue = [
        {
            model: 'Person',
            method: 'createPerson',
        }
    ]
    console.log(body)
    let options = {
        method: method,
        headers: headers,
        body: JSON.stringify(body)
    }

    let response  = await fetch(url, options).catch(err => {
        console.error(err)
        return w2alert('Error: invalid response from schemas server')
    })
    if (response.ok){
        let data = await response.json()
        console.log(data)
        return data
    } else {
        return w2alert('Error: invalid response from schemas server')
    }
}

export default createNewUnit