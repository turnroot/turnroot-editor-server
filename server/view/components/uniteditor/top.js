import {
    w2toolbar,
    w2prompt,
    w2alert,
    w2confirm
} from '../../lib/w2ui.es6.min.js'

import createNewUnit from './functions/units/createNewUnit.js'
import deleteUnit from './functions/units/deleteUnit.js'
import getAllUnits from './functions/units/getAllUnits.js'
window.UnitEditorCreateNewUnit = createNewUnit
window.UnitEditorDeleteUnit = deleteUnit

import updateCurrentUnitRecord from './functions/utils/updateCurrentUnitRecord.js'

let nodes = []

let toolbar = new w2toolbar({
    name: 'UnitEditorTopMenu',
    tooltip: 'bottom',
    items: [
        {type: 'button',
        id: 'new-unit',
        text: 'New unit',
        class: "w2ui-btn accent",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
        },
        {type: 'button',
        id: 'unit-checklist',
        text: 'Unit checklist',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list-checks"><path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/></svg>',
        },
        {type: 'spacer'},
        {type: 'button',
        id: 'delete-unit',
        text: 'Delete unit',
        class: 'w2ui-btn slider1',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
        },
    ]
})

toolbar.on('click', function async(event) {
    event.done(async() => {
        window.turnrootEditorLogs.push(`${new Date()}||info||Unit toolbar button clicked: ${JSON.stringify(event.target)}`)
        if (event.detail.item.id === 'new-unit') {
            w2prompt({
                title: 'Create new unit',
                label: window.allUnits.length === 0 ?'Enter the familiar name for your first unit. This unit will be the "avatar", or customizable player character. The player will be allowed to change this name if they want- this is just a default.' : 'Enter the familiar name of the new unit',
            }).ok(async(event) => {
                
                if (event.detail.value === ''){
                    event.preventDefault()
                } else {
                    window.allUnits = await getAllUnits()
                    let subtype = 'avatar'
                    if (window.allUnits.length > 0){
                        subtype = 'enemy'
                    }
                    await window.UnitEditorCreateNewUnit(subtype, event.detail.value).then(n => {
                        window.UnitEditor.html('main', window.unitEditorBasicFields)
                        window.allUnits.push(n)
                        window.currentUnit = n
                        
                        updateCurrentUnitRecord(n)

                        window.allUnits.forEach(unit => {
                            nodes.push({id:  unit.id, text: unit.name + ' ' + unit.id})
                        })
                        nodes.forEach(node => {
                            if (node.id === n.id){
                                node.selected = true
                            }
                        })
                        window.allUnitsNodes = nodes
                        window.UnitEditorLeftSidebar.remove()
                        window.UnitEditorLeftSidebar.nodes = window.allUnitsNodes
                        window.UnitEditor.refresh()
                        window.UnitEditorLeftSidebar.refresh()
                        
                        return w2alert('New unit created')
                    }).catch(e => {
                        console.error(e)
                    })
                }
            })
        }
        else if (event.detail.item.id === 'delete-unit'){
            if (window.allUnits.length === 0){
                return w2alert('No units to delete')
            }
            let unit = window.currentUnit
            w2confirm({
                title: 'Delete unit',
                body: `Are you sure you want to delete ${unit.name}?`,
                width: 300,
                height:200,
            }).yes(async() => {
                updateCurrentUnitRecord(window.currentUnit)
                await window.UnitEditorDeleteUnit(unit.id).then(() => {
                    let index = window.allUnits.findIndex(u => u.id === unit.id)
                    window.allUnits.splice(index, 1)
                    window.UnitEditorLeftSidebar.remove()
                    window.UnitEditorLeftSidebar.nodes = window.allUnits.map(unit => ({id: unit.id, text: unit.name + ' ' + unit.id}))
                    window.UnitEditorLeftSidebar.refresh()
                    window.currentUnit = window.allUnits[0]
                    window.UnitEditor.html('main', window.unitEditorBasicFields)
                    return w2alert('Unit deleted')
                }).catch(e => {
                    return w2alert('Error deleting unit')
                })
            })
        }
    })

})

export default toolbar