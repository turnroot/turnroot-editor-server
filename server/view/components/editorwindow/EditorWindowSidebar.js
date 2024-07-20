import { w2sidebar, w2ui } from '../../lib/w2ui.es6.min.js'
import UnitEditor from '../uniteditor/UnitEditor.js'
import ClassEditor from '../classeditor/ClassEditor.js'
import GameEditor from '../gameeditor/GameEditor.js'
import ObjectEditor from '../objecteditor/ObjectEditor.js'

window.UnitEditor = UnitEditor
window.ClassEditor = ClassEditor
window.GameEditor = GameEditor
window.ObjectEditor = ObjectEditor

let sidebar = new w2sidebar({
    name: 'EditorWindowSidebar',
    flatButton: true,
    icon: {
        text(node) {
            if (node.id === 'sidebar-editors-unit-editor') {
            return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`}
            else if (node.id === 'sidebar-editors-class-editor') {
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-drama"><path d="M10 11h.01"/><path d="M14 6h.01"/><path d="M18 6h.01"/><path d="M6.5 13.1h.01"/><path d="M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3"/><path d="M17.4 9.9c-.8.8-2 .8-2.8 0"/><path d="M10.1 7.1C9 7.2 7.7 7.7 6 8.6c-3.5 2-4.7 3.9-3.7 5.6 4.5 7.8 9.5 8.4 11.2 7.4.9-.5 1.9-2.1 1.9-4.7"/><path d="M9.1 16.5c.3-1.1 1.4-1.7 2.4-1.4"/></svg>`
            } else if (node.id === 'sidebar-editors-game-editor'){
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings-2"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>`
            } else if (node.id === 'sidebar-editors-object-editor'){
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sword"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/></svg>`
            }
        }
    },
    nodes: [
        {id: 'sidebar-editors-list', text: 'Simple Editors', expanded: true, group: true, groupShowHide: true,
        nodes: [
            {id: 'sidebar-editors-game-editor', text: 'Project'},
            {id: 'sidebar-editors-unit-editor', text: 'Units', disabled: true},
            {id: 'sidebar-editors-class-editor', text: 'Classes', disabled: true},
            {id: 'sidebar-editors-object-editor', text: 'Objects', disabled: true},
        ],
        onCollapse(event) {
            event.preventDefault()
        }
    },
    {id: 'sidebar-complex-editors-list', text: 'Assembly Editors', expanded: true, group: true, groupShowHide: true,
    nodes: [
    ],
}
],
onFlat(event) {
    let layout = w2ui.EditorWindowLayout
    layout.sizeTo('left', (event.detail.goFlat ? '24' : '12%'), true)
},
})

sidebar.on('render', function(event) {
    if (window.newUserOnboardingGameDetails === false){
        sidebar.enable('sidebar-editors-unit-editor')
        sidebar.enable('sidebar-editors-class-editor')
        sidebar.enable('sidebar-editors-object-editor')
    }
    if (sessionStorage.getItem('startupView')){
        let startupView = sessionStorage.getItem('startupView')
        if (startupView === 'default-editor-unit-editor'){
            sidebar.click('sidebar-editors-unit-editor')
        } else if (startupView === 'default-editor-class-editor'){
            sidebar.click('sidebar-editors-class-editor')
        } else if (startupView === 'default-editor-object-editor'){
            sidebar.click('sidebar-editors-object-editor')
        } else {
            sidebar.click('sidebar-editors-game-editor')
        }
    }
})

sidebar.on('click', function(event) {
    if (event.object.disabled) return
    let layout = w2ui.EditorWindowLayout
    if (event.target === 'sidebar-editors-unit-editor') {
        layout.html('main', UnitEditor).removed()
        window.activeEditor = 'unit-editor'
    } else if (event.target === 'sidebar-editors-class-editor') {
        w2ui['unit-editor-bottom-toolbar'].click('unit-editor-bottom-toolbar-basic')
        layout.html('main', ClassEditor).removed()
        window.activeEditor = 'class-editor'
    } else if (event.target === 'sidebar-editors-game-editor') {
        w2ui['unit-editor-bottom-toolbar'].click('unit-editor-bottom-toolbar-basic')
        layout.html('main', GameEditor).removed()
        window.activeEditor = 'game-editor'
    } else if (event.target === 'sidebar-editors-object-editor') {
        w2ui['unit-editor-bottom-toolbar'].click('unit-editor-bottom-toolbar-basic')
        layout.html('main', ObjectEditor).removed()
        window.activeEditor = 'object-editor'
    }
})

window.goFlat = function () {
    sidebar.goFlat()
}

export default sidebar