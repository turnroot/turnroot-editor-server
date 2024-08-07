import {
    w2form
} from '../../../lib/w2ui.es6.min.js'

import handleEvent from '../functions/handleFriend.js'

import globalExperiences from '../functions/globals/getGlobalExperiences.js'

let config = {
    name: 'unit-editor-friend-fields',
    record: {},
    fields: [{
            type: 'html',
            html: {
                html: '<div><h2>Uniques</h2><small>Set classes, items, and skills only this unit (or their children, if inheritance is on), can have. Personal skills and classes are set here.</br></br>If there are no classes, items, or skills available to select, you can create them by clicking Skills, Items, or Classes on the left sidebar.</small></div>'
            }
        },
        {
            type: 'html',
            html: {
                html: '<h3>Unique skills</h3>',
            }
        },
        {
            field: 'unique-skills',
            type: 'enum',
            html: {
                class: 'no-label',
                attr: 'style="width:10rem"',
                column: 0,
            },
            options: {
                max: 3,
                items: ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5']
            }
        },
        {
            type: 'html',
            html: {
                html: '<h3>Unique classes</h3>',
            }
        },
        {
            field: 'unique-classes',
            type: 'enum',
            html: {
                class: 'no-label',
                attr: 'style="width:10rem"',
                column: 0,
            },
            options: {
                max: 3,
                items: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5']
            }
        },
        {
            type: 'html',
            html: {
                html: '<h3>Unique items</h3>',
            }
        },
        {
            field: 'unique-items',
            type: 'enum',
            html: {
                class: 'no-label',
                attr: 'style="width:10rem"',
                column: 0,
            },
            options: {
                max: 3,
                items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']
            }
        },
        {
            type: 'html',
            html: {
                html: '<h2>Base aptitudes</h2>',
                column: 0
            }
        },
    ],
}

config.fields.push({
    type: 'html',
    html: {
        html: window.useExperienceAptitudes ? '<small>Set this unit\'s starting aptitudes, as well as their affinity for them (positive, negative, or neutral).</br>A positive affinity means this unit will learn it faster, a negative means slower.</small>' : '<small>Set this unit\'s starting aptitudes.</small>',
        column: 0
    }
})

globalExperiences.forEach((experience, index) => {
    experience.field = 'friend-base-aptitudes-' + experience.field.toLowerCase()
    experience.html.group = experience.field
    experience.html.class = 'group-flex'
    config.fields.push(
        experience
    )

    config.fields.push({
        type: 'html',
        field: experience.field + '-affinity-friend',
        html: {
            class: 'no-label',
            attr: 'style="width:max-content"',
            column: 0,
            html: `<div style = "display:flex;align-items:center;flex-wrap:wrap;width:100%;"><p style = "margin-right:.25rem;">Affinity:</p><input type = "radio" name = "${experience.field + '-affinity-radio'}" class="w2ui-input"><label style = "font-size:1.5rem;margin-right:.5rem;">-</label></input><input name = "${experience.field + '-affinity-radio'}" type = "radio" class="w2ui-input" checked><label style = "font-size:1rem;margin-right:.5rem;">None</label></input><input name = "${experience.field + '-affinity-radio'}" type = "radio" class="w2ui-input"><label style = "font-size:1.5rem;margin-right:.5rem;">+</label></input></div>`
        }
    })
    config.record[experience.field + '-affinity-friend'] = 'None'
    config.record[experience.field] = 'E'
})

let form = new w2form(config)

form.updateGlobals = () => {
    let toHide
    if (!window.useExperienceAptitudes) {
        toHide = form.fields.filter(field => field.field?.includes('affinity'))
        toHide.forEach(field => field.html.hidden = true)
    } else {
        toHide = form.fields.filter(field => field.field?.includes('affinity'))
        toHide.forEach(field => field.html.hidden = false)
    }
    form.refresh()
}

form.updateGlobals()

form.on('change', function (event) {
    handleEvent(event, form)
})

export default form