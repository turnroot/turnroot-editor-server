import { w2layout } from '../../lib/w2ui.es6.min.js'
import gameEditorBottom from './bottom.js'

import gameDetails from './tabs/gameDetails.js'

let layout = new w2layout({
    name: 'GameEditor',
    panels: [
        { type: 'main', content: 'main', html: gameDetails},
        { type: 'bottom', size: 30, resizable: false, content: 'bottom', html: gameEditorBottom, style: 'overflow-y: hidden;'},
    ]
})

export default layout