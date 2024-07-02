import {
    w2form
} from '../../../lib/w2ui.es6.min.js'

import handleEvent from '../functions/handleBasic.js'

import globalStats from '../functions/globals/getGlobalStats.js'

import statGrowthPopup from '../functions/modals/statGrowth.js'

import baseStatRandomizerPopup from '../functions/modals/randomizeBaseStats.js'

import balanceMeter from '../../utils/balanceMeter.js'

let baseStatsBalance = balanceMeter(0, globalStats.length, 'Edit base stats to see balance', '<small>Compares your base stat total against two existing-game examples.<br/>The left side is a bit lower than the avatar\'s base stats in <em>Fire Emblem: Awakening</em>, and the right side is a bit higher than the avatar\'s base stats in <em>Fire Emblem: Three Houses</em>. Most units should probably fall somewhere in between.<br/><br/>Mov is not included in the total</small>')

window.UnitEditorGlobalStats = globalStats

const handleStatGrowthPopup = (allStats, form) => {
    let stats = {}
    allStats.forEach((stat) => {
        stats[stat.field] = form.record[stat.field]
    })
    statGrowthPopup(stats, form)
}

const handleBaseStatRandomizerPopup = (allStats, form) => {
    let stats = {}
    allStats.forEach((stat) => {
        stats[stat.field] = form.record[stat.field]
    })
    baseStatRandomizerPopup(stats, form) 
}

window.unitEditorHandleStatsGrowthPopup = handleStatGrowthPopup
window.handleBaseStatRandomizerPopup = handleBaseStatRandomizerPopup


let config = {
    name: 'unit-editor-basic-fields',
    record: {
        id: '',
        name: 'New Unit',
        fullName: 'New Unit',
        title: '',
        pronouns: 'they/them/their/theirs',
        subtype: 'Avatar',
        notes: '',
        age: 18,
        canSSupport: true,
        canHaveChildren: true,
        height: 168,
        birthdayDay: 1,
        birthdayMonth: 1,
        shortBio: '',
        useAccentColors: false,
    },
    fields: [{
            field: '',
            type: 'html',
            html: {
                html: '<h2>Basic Info</h2>',
                column: 0,
            }
        },
        {
            field: 'id',
            type: 'text',
            html: {
                label: 'ID',
                attr: 'readonly',
                column: 0,
            },
            hidden: true
        },
        {
            field: 'name',
            type: 'text',
            html: {
                label: 'Familiar name',
                attr: '',
                column: 0,
            }
        },
        {
            field: 'fullName',
            type: 'text',
            html: {
                label: 'Full name',
                attr: '',
                column: 0,
            }
        },
        {
            field: 'title',
            type: 'text',
            html: {
                label: 'Title',
                attr: '',
                column: 0,
            }
        },
        {
            type:'html',
            html:{
                html: '<small>A unit can have a title, familiar name, and full name. The familiar name is the only required field; it appears above dialogue boxes. A unit could have "sir" as the title, "Fernand" as the familiar name, and "Sir Fernand van Ageer" as the full name. Some units, like "Rogue" or "Thief", may only need a familiar name.</small>'
            }
        },
        {
            field: 'pronouns',
            type: 'select',
            html: {
                label: 'Pronouns',
                attr: '',
                column: 0,
            },
            options: {
                items: ['he/him/his/his', 'she/her/her/hers', 'they/them/their/theirs']
            }
        },
        {
            field: 'subtype',
            type: 'radio',
            html: {
                label: 'Subtype',
                attr: 'style="max-width:200px;"',
                column: 0,
            },
            options: {
                items: ['Avatar', 'NPC', 'Friend', 'Enemy']
            }
        },
        {
            field: 'age',
            type: 'int',
            options: {
                min: 0
            },
            html: {
                label: 'Age',
                column: 0,
            }
        },
        {
            field: 'canSSupport',
            type: 'checkbox',
            disabled: false,
            html: {
                label: 'Can S-Support',
                column: 0,
            }
        },
        {
            field: "canHaveChildren",
            type: 'checkbox',
            html: {
                label: 'Can have children',
                column: 0,
            }
        },
        {
            field: 'isUnique',
            type: 'checkbox',
            hidden: true,
            html: {
                label: 'Unique (only one of this unit can exist in the game)',
                column: 0,
            }
        },
        {
            field: 'canRecruit',
            type: 'checkbox',
            hidden: true,
            html: {
                label: 'Can be recruited to join player\'s team',
                column: 0,
            }
        },
        {
            field: 'height',
            type: 'int',
            options: {
                min: 32,
                max: 214
            },
            html: {
                label: 'Height (cm)',
                column: 0,
            }
        },
        {
            field: 'base-stats-header',
            type: 'html',
            html: {
                class: 'no-label',
                html: '<h2>Base Stats</h2>',
                column: 1,
            }
        },
        {
            field: 'birthdayDay',
            type: 'int',
            options: {
                min: 1,
                max: 31
            },
            html: {
                label: 'Birthday Day',
                column: 0,
            }
        },
        {
            field: 'birthdayMonth',
            type: 'int',
            options: {
                min: 1,
                max: 12
            },
            html: {
                label: 'Birthday Month',
                column: 0,
            }
        },
    ],
}

globalStats.forEach((stat, index) => {
    if (stat.field === 'hp') {
        config.fields.push({
            field: stat.field,
            type: 'int',
            options: {
                min: 1,
                value: 20
            },
            html: {
                label: stat.html.label,
                attr: 'style="width:2rem"',
                column: 1,
            }
        }),
        config.record[stat.field] = 20
    } else {
    config.fields.push({
            field: stat.field,
            type: 'int',
            options: {
                min: 0,
                value: 5
            },
            html: {
                label: stat.html.label,
                attr: 'style="width:2rem"',
                column: 1,
            }
        }),
        config.record[stat.field] = 5}
})

config.fields.push({
    type: 'html',
    field: 'base-stats-balance',
    html: {
        class: 'no-label',
        html: baseStatsBalance.innerHTML,
        column: 1,
        attr: 'style="width:100%;margin-top:.5rem"'
    }
})

config.fields.push({
    type: 'html',
    field: 'growth-rates',
    class: 'no-label',
    html: {
        class: 'no-label',
        html: "<button id='growth-rates-button' onclick='window.unitEditorHandleStatsGrowthPopup(window.UnitEditorGlobalStats, window.unitEditorBasicFields)' class='w2ui-btn'>Growth Rates</button>",
        column: 1,
        attr: 'style="width:100%;margin-top:.5rem"'
    }
})

config.fields.push({
    type: 'html',
    field: 'randomize-base-stats',
    class: 'no-label',
    hidden: true,
    html: {
        class: 'no-label',
        html: "<button id='randomize-base-stats-button' onclick='window.handleBaseStatRandomizerPopup(window.UnitEditorGlobalStats, window.unitEditorBasicFields)' class='w2ui-btn'>Randomize Base Stats</button><br/><small>Non-unique units can have randomized base stats.</small>",
        column: 1,
        attr: 'style="width:100%;margin-top:.5rem"'
    }
}),

config.fields.push({
    type: 'textarea',
    field: 'notes',
    html: {
        label: 'Notes',
        attr: '',
        column: 2,
    },
})

config.fields.push({
    type: 'textarea',
    field: 'shortBio',
    html: {
        label: 'Short Bio',
        attr: '',
        column: 2,
    },
})

config.fields.push({
    type: 'html',
    html: {
        html: "<em><small>Color class sprites with unique unit colors</small></em>",
        column: 2,
        attr: 'style="width:100%;margin-top:.5rem"'
    }
})

config.fields.push({
    type: 'checkbox',
    field: 'useAccentColors',
    html: {
        label: 'Use accent colors',
        attr: '',
        column: 2,
    }
})

config.fields.push({
    type: 'html',
    field: 'unit-accent-color-1',
    hidden: true,
    html: {
        label: 'Accent color 1',
        attr: '',
        column: 2,
        html: '<input type="color" value="#000000">',
    },
})

config.fields.push({
    type: 'html',
    field: 'unit-accent-color-2',
    hidden: true,
    html: {

        label: 'Accent color 2',
        attr: '',
        column: 2,
        html: '<input type="color" value="#000000">',
    },
})

let form = new w2form(config)

form.on('change', (event) => {
    handleEvent(form, event)
})

form.updateGlobals = () => {
    if (!window.unitsCanHaveChildren) {
        form.fields.find(field => field.field === 'canHaveChildren').hidden = true
    } else {
        form.fields.find(field => field.field === 'canHaveChildren').hidden = false
    }
    form.refresh()
}

window.unitEditorBasicFields = form

form.updateGlobals()

export default form