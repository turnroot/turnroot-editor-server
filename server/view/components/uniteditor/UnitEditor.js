import { w2layout } from '../../lib/w2ui.es6.min.js'
import unitEditorBasicFields from './tabs/basic.js'
import unitEditorLeft from './left.js'
import unitEditorTop from './top.js'
import unitEditorBottom from './bottom.js'
import getAllUnits from './functions/units/getAllUnits.js'
import updateCurrentUnitRecord from './functions/utils/updateCurrentUnitRecord.js'

let layout = new w2layout({
    name: 'UnitEditor',
    panels: [
        { type: 'top', size: 30, resizable: false, content: 'top', html: unitEditorTop, style: 'overflow-y: hidden;'},
        { type: 'main', content: 'main', html: unitEditorBasicFields},
        { type: 'left', size: 200, resizable: true, content: 'left', html: unitEditorLeft},
        { type: 'bottom', size: 30, resizable: false, content: 'bottom', html: unitEditorBottom, style: 'overflow-y: hidden;'},
    ]
})

layout.on('render', async function(event){
    layout.html('main', '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;font-size:150%"><h2>Loading units...</h2></div>')

        window.allUnits = await getAllUnits()

    if (window.allUnits.length > 0){
        window.currentUnit = window.allUnits[0]
        updateCurrentUnitRecord(window.currentUnit)
        layout.html('main', unitEditorBasicFields)
        unitEditorLeft.nodes = window.allUnits.map(unit => ({id: unit.id, text: unit.name + ' ' + unit.id}))
        unitEditorLeft.nodes[0].selected = true
        unitEditorLeft.refresh()
    } else {
        layout.html('main', '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;font-size:150%"><h2>No units</h2><p>Create a new unit to get started</p><img src = "http://localhost:26068/style/img/nu.png" style="position: fixed;width: 256px;left: 17%;top: 33%;"></div>')
    }
})

export default layout