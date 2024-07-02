import { w2toolbar, w2ui } from '../../lib/w2ui.es6.min.js'

const autosavedIcon = '<div style="margin-top:-.5rem; margin-right:.25rem;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-check"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m9 15 2 2 4-4"/></svg></div>'

const autoSavingIcon = '<div style="margin-top:-.5rem; margin-right:.25rem;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-up"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M12 12v6"/><path d="m15 15-3-3-3 3"/></svg></div>'


let toolbar = new w2toolbar({
    name: 'EditorWindowStatusBar',
    tooltip: 'top',
    items: [
        { type: 'label', id: 'status-bar-project-status', text: 'Required project settings missing', class: 'status-bar' },
        { type: 'break'},
        {type: 'label', id: 'status-bar-db-status', icon: '<div style = "margin-top:-8px;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--slider-1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-server-off"><path d="M7 2h13a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-5"/><path d="M10 10 2.5 2.5C2 2 2 2.5 2 5v3a2 2 0 0 0 2 2h6z"/><path d="M22 17v-1a2 2 0 0 0-2-2h-1"/><path d="M4 14a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16.5l1-.5.5.5-8-8H4z"/><path d="M6 18h.01"/><path d="m2 2 20 20"/></svg></div>', tooltip: 'Database connection lost', },
        {type: 'label', id: 'status-bar-autosave-status', class: 'status-bar', icon: autosavedIcon,},
        {type: 'spacer'},
        {type: 'label', id: 'status-bar-turnroot-version', class: 'status-bar', text: 'Turnroot Editor v0.0.5 Weekly'},
        {type: 'spacer'},
        {type: 'label', id: 'status-bar-report-issue', class: 'status-bar report-issue', text: 'Report an issue', style:'margin:0!important;padding:0!important;'},
    ]
})

toolbar.on('click', function (event) {
    event.done(() => {
        window.turnrootEditorLogs.push(`${new Date()}||info||Status bar button clicked: ${JSON.stringify(event.target)}`)
        if (event.target === 'status-bar-report-issue') {
            window.open('https://community.turnroot.com/c/turnroot-editor/editor-support/6', '_blank')
        }
        else if (event.target === 'status-bar-project-status'){
            let sidebar = w2ui.EditorWindowSidebar
            sidebar.click('sidebar-editors-game-editor')

        }
    })

})

export default toolbar