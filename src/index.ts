import 'core-js/stable'
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter'
// @ts-ignore
import '@webcomponents/webcomponentsjs/webcomponents-loader'

// @ts-ignore
WebComponents.waitFor(() => {
    return import('./components/index')
})
