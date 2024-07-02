const deleteUnit = async (
    id
) => {
    console.log('deleting unit')
    let url = 'http://localhost:26068/data'
    let method = 'POST'
    let headers = {
        'Content-Type': 'application/json'
    }
    let body = {}
    body.which = subtype
    body.name = familiarName
    body.queue = [
        {
            model: 'Person',
            method: 'deletePerson',
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

export default deleteUnit