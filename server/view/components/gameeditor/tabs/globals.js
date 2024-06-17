import { w2form } from "../../../lib/w2ui.es6.min.js"

let config = {
    name: 'game-editor-global-fields',
    record: {},
    fields: []
}

import handleGlobals from '../functions/handleGlobals.js'

import { booleans, integers, strings, json, lists } from "../../../lib/globals.js"
import labels from "../../../lib/globalsLabels.js"

let booleansHeadingsAfter = {
    useExperienceAptitudes: 'Combat',
    combatAdjutantAttack: "Unit stats",
    statsUseExtraStatCharm: 'Aptitudes'
}
booleans.forEach(property => {

    config.fields.push({
        field: property,
        type: 'checkbox',
        attr:'style="width:100%"x',
        html: {
            text: labels[property],
            class: 'no-label',
            style: 'width:100%;',
            column: 0
        }
    })
    config.record[property] = window[property]
    if (booleansHeadingsAfter[property]) {
        config.fields.push(
            {
                type: 'html',
                html: {
                    html: `<h3 style = "margin-top:2rem;padding-top:.5rem;">${booleansHeadingsAfter[property]}</h3>`,
                    class: 'no-label',
                    column: 0
                }
            }
        )
    }
})

integers.forEach(property => {
    config.fields.push({
        field: property,
        type: 'int',
        html: {
            text: labels[property],
            class: 'no-label',
            column: 1,
        }
    })
    config.record[property] = window[property]
})

strings.forEach(property => {
    config.fields.push({
        field: property,
        type: 'text',
        html: {
            text: labels[property],
            class: 'no-label',
            column: 1
        }
    })
    config.record[property] = window[property]
})


let form = new w2form(config)

form.on('change', function(event) {
    handleGlobals(event, form)
})

export default form