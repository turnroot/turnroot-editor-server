import { w2sidebar, w2ui } from '../../lib/w2ui.es6.min.js'
import updateCurrentUnitRecord from './functions/utils/updateCurrentUnitRecord.js'

let sidebar = new w2sidebar({
    name: 'UnitEditorLeft',
    flatButton: false,
    nodes: []  
})

window.UnitEditorLeftSidebar = sidebar

sidebar.on('click', function(event) {
    event.done(() => {
        let node = sidebar.get(event.target)
        window.currentUnit = window.allUnits.find(unit => unit.id === node.id)
        updateCurrentUnitRecord(window.currentUnit)
        node.selected = true
        sidebar.nodes.forEach(n => {
            if (n.id !== node.id){
                n.selected = false
            }
        })
        sidebar.refresh()
        
    })
})

export default sidebar