const initQueue = () => {
    window.editsQueue = {
        saved_at: Date.now(),
        queue: []
    }
}

const updateQueue = (model, method, body) => {
    const id = body.id
    let existing = window.editsQueue.queue.find(item => item.body.id === id)
    if (existing) {
        existing.body = body
    } else {
        window.editsQueue.queue.push({ model, method, body })
    }
}

const autosavedIcon = '<div style="margin-top:-.5rem; margin-right:.25rem;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-check"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m9 15 2 2 4-4"/></svg></div>'

const autoSavingIcon = '<div style="margin-top:-.5rem; margin-right:.25rem;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-up"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M12 12v6"/><path d="m15 15-3-3-3 3"/></svg></div>'

let startTime, currentTime
const sendQueue = async () => {
    let savedTime = window.editsQueue.saved_at
    startTime = Date.now()
    if (startTime - savedTime < 60000) {
        window.window.EditorWindowStatusBar.set('status-bar-autosave-status', { icon: autoSavingIcon, text: 'Saving changes' })
        setTimeout(() => {
            window.window.EditorWindowStatusBar.set('status-bar-autosave-status', { icon: autosavedIcon, text: 'Changes saved' })
        }, 500)
        return
    }
    window.window.EditorWindowStatusBar.set('status-bar-autosave-status', { icon: autoSavingIcon, text: 'Saving changes' })
    let url = '/queue'
    let body = {
        actions: window.editsQueue.queue || []
    }
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
        if (!data) {
            console.error('Error: invalid response, not JSON')
        }
        if (data.status === 'success') {
            window.editsQueue.saved_at = Date.now()
            window.editsQueue.queue = []
            currentTime = Date.now()
            let timeDiff = currentTime - startTime
            if (timeDiff < 300) {
                setTimeout(() => {
                    window.window.EditorWindowStatusBar.set('status-bar-autosave-status', { icon: autosavedIcon, text: 'Changes saved' })
                }, 300 - timeDiff)
            }
        } else {
            console.error('Error: invalid response ' + data)
        }
        console.log('Data saved to schema server')
        return data
    } catch (err) {
        return 'Error: invalid response ' + err
    }
}

export { initQueue, updateQueue, sendQueue}