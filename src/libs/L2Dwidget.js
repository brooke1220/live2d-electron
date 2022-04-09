import L2Dwidget from 'L2Dwidget'
import defaultConfig from '../config/defaultConfig'
import _ from 'lodash'

let currConfig = {}
let L2DwidgetInit = L2Dwidget.init.bind(L2Dwidget)

L2Dwidget.init = (userConfig) => {
    currConfig = _.merge(defaultConfig, userConfig)
    L2DwidgetInit(currConfig)
}

export {
    currConfig,
    L2Dwidget
}