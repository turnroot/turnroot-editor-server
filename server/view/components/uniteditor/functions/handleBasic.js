import {
    w2alert, w2ui
} from '../../../lib/w2ui.es6.min.js'

import {updateQueue} from '../../../functions/edits/queue.js'

import globalStats from './globals/getGlobalStats.js'

let globalStatsArray = []
globalStats.forEach((stat) => {globalStatsArray.push(stat.field)})

let numAvatars = 0 //get from database

const mapRange = function (value, in_min, in_max, out_min, out_max) {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
}

const subtypeConfig = {
    Avatar: {
        show: ['orientation', 'canSSupport', 'canHaveChildren', 'height', 'birthdayDay', 'birthdayMonth', 'age', 'useAccentColors', 'growth-rates', 'base-stats-header'],
        hide: ['canRecruit', 'isUnique', 'randomize-base-stats'],
        disable: ['canSSupport'],
        enable: [],
        toolbarShow: ['unit-editor-bottom-toolbar-relationship']
    },
    NPC: {
        hide: ['orientation', 'canSSupport', 'canHaveChildren', 'canRecruit', 'growth-rates', 'unit-accent-color-1', 'unit-accent-color-2', 'base-stats-header', 'randomize-base-stats', 'useAccentColors', 'height', 'birthdayDay', 'birthdayMonth', 'age'],
        show: ['isUnique'],
        enable: [],
        disable: [],
        toolbarShow: []
    },
    Friend: {
        show: ['orientation', 'canSSupport', 'canHaveChildren', 'canRecruit', 'growth-rates', 'useAccentColors', 'base-stats-header', 'height', 'birthdayDay', 'birthdayMonth', 'randomize-base-stats', 'age', 'isUnique'],
        enable: ['canSSupport'],
        hide: [],
        disable: [],
        toolbarShow: ['unit-editor-bottom-toolbar-relationship', 'unit-editor-bottom-toolbar-behavior']
    },
    Enemy: {
        hide: ['canSSupport', 'orientation', 'canHaveChildren', 'growth-rates', 'height', 'birthdayDay', 'birthdayMonth', 'age'],
        enable: [],
        disable: [],
        show: ['canRecruit', 'useAccentColors', 'randomize-base-stats', 'isUnique'],
        toolbarShow: ['unit-editor-bottom-toolbar-behavior']
    }
}

function applySubtypeConfig(form, config) {
    ['show', 'hide', 'enable', 'disable'].forEach(action => {
        (config[action] || []).forEach(field => form[action](field))
    })
    globalStats.forEach((stat, index) => {
        form[config.hide.includes(stat.field) ? 'hide' : 'show'](stat.field)
    })
    let bottomToolbar = w2ui['unit-editor-bottom-toolbar']
    bottomToolbar.hide('unit-editor-bottom-toolbar-relationship')
    bottomToolbar.hide('unit-editor-bottom-toolbar-behavior')
    bottomToolbar.show('unit-editor-bottom-toolbar-basic')
    config.toolbarShow.forEach(tab => bottomToolbar.show(tab))
    bottomToolbar.refresh()
}

const handleEvent = (form, event, automated=false) => {
    let field = event.detail.field
    let value = event.detail.value

    window.turnrootEditorLogs.push(`${new Date()}||info||Unit field ${field} requested change to ${value.current}`)

    if (field === 'useAccentColors') {
        if (value.current === true) {
            form.show('unit-accent-color-1')
            form.show('unit-accent-color-2')
        } else {
            form.hide('unit-accent-color-1')
            form.hide('unit-accent-color-2')
        }
    }

    else if (globalStatsArray.includes(field) && field !== 'mov'){
        let meter = w2ui['unit-editor-basic-fields'].get('base-stats-balance').el
        let statFields = globalStatsArray
        let statValueTotal = 0
        statFields.forEach(stat => {
            statValueTotal += form.getValue(stat)
        })
        let value = statValueTotal
        let min = globalStatsArray.length * 5.8
        let max = globalStatsArray.length * 9.1
        let newValue = mapRange(value, min, max, 0, 180) - 90

        meter.querySelector('.balanceMeterNeedle').style.transform = `rotate(${newValue}deg)`
        meter.querySelector('.balanceMeterNeedle').style.opacity = '1'
        
    }

    else if (field === 'canRecruit'){
        if (value.current === true){
            let isUnique = form.get('isUnique')
            if (isUnique.el.checked === false){
                form.setValue('isUnique', true)
                w2alert('A recruitable unit must be unique. The "isUnique" checkbox has been checked.')
                form.show('randomize-base-stats')
            }
        }
    }

    else if (field === 'isUnique' && value.current === false && form.get('canRecruit').el.checked === true){
        let canRecruit = form.get('canRecruit')
        if (canRecruit.el.checked === true){
            form.setValue('canRecruit', false)
            w2alert('A recruitable unit must be unique. The "canRecruit" checkbox has been unchecked.')
            form.hide('randomize-base-stats')
        }
    }

    else if (field === 'isUnique'){
        if (value.current === true){
        form.hide('randomize-base-stats')} else {
        form.show('randomize-base-stats')
        }
    }

    else if (field === 'subtype') {
        form.lock('', true)
        if (automated){
            applySubtypeConfig(form, subtypeConfig[value.current])
            form.unlock()
            return
        }
        if (value.current === 'Avatar' && numAvatars > 0) {
            form.message({
                body: '<div class="w2ui-centered">You already have an Avatar unit. You cannot create another.</div>',
                width: 400,
                height: 200,
                actions: {
                    OK() {
                        form.setValue('subtype', value.previous)
                        form.unlock()
                        form.message()
                    }
                }
            })
        } else {
            form.message({
                body: '<div class="w2ui-centered">Do you want to change the subtype? This will significantly alter your unit.</div>',
                width: 400,
                height: 200,
                actions: {
                    Yes() {
                        if (value.previous === 'Avatar' && value.current !== 'Avatar') {
                            numAvatars--
                        }
                        applySubtypeConfig(form, subtypeConfig[value.current])
                        form.unlock()
                        form.message()
                    },
                    No() {
                        form.setValue('subtype', value.previous)
                        form.unlock()
                        form.message()
                    }
                }
            })
        }
    }
    updateQueue('Person', 'updatePerson', form.record)
}

export default handleEvent