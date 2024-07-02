const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}
let c = capitalizeFirstLetter

import handleEvent from '../handleBasic.js'

const updateCurrentUnitRecord = (n) => {
    window.unitEditorBasicFields.record['fullName'] = n.fullName
    window.unitEditorBasicFields.record['title'] = n.title
    window.unitEditorBasicFields.record['name'] = n.name
    window.unitEditorBasicFields.record['id'] = n.id
    window.unitEditorBasicFields.record['subtype'] = c(n.which)

    handleEvent(window.unitEditorBasicFields, {detail: {field: 'subtype', value: {current: c(n.which)}}}, true)

    window.unitEditorBasicFields.record['pronouns'] = n.pronouns.singular + '/' + n.pronouns.object + '/' + n.pronouns.possessive + '/' + n.pronouns.possessives

    window.unitEditorBasicFields.record['age'] = n.age
    window.unitEditorBasicFields.record['height'] = n.height
    window.unitEditorBasicFields.record['canSSupport'] = n.canSSupport
    window.unitEditorBasicFields.record['canHaveChildren'] = n.canHaveChildren
    window.unitEditorBasicFields.record['isUnique'] = n.isUnique
    window.unitEditorBasicFields.record['canRecruit'] = n.isRecruitable

    window.unitEditorBasicFields.record['birthdayDay'] = n.birthday.day
    window.unitEditorBasicFields.record['birthdayMonth'] = n.birthday.month

    window.unitEditorBasicFields.record['notes'] = n.Notes
    window.unitEditorBasicFields.record['shortBio'] = n.shortDescription

    window.unitEditorBasicFields.record['useAccentColors'] = n.useAccentColors

    window.unitEditorBasicFields.record['unit-accent-color-1'] = n.accentColor1
    window.unitEditorBasicFields.record['unit-accent-color-2'] = n.accentColor2

    
    window.unitEditorBasicFields.refresh()
}

export default updateCurrentUnitRecord