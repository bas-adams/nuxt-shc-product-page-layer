// https://v3.nuxtjs.org/api/configuration/nuxt.config
import { logger } from '@nuxt/kit'
import { componentPrefix } from './moduleConfig.json'

import { version } from './package.json'

logger.success(`SHC Catalog Page Layer ${version}`)

export default defineNuxtConfig({
    components: [
        { path: './components', prefix: componentPrefix, extensions: ['vue'] },
    ],
})
