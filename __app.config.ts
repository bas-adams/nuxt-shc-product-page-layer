export default defineAppConfig({
  myProject: {
    name: 'Nuxt Shc Product Page Layer'
  }
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    NuxtShcProductPageLayer?: {
      /** Project name */
      name?: string
    }
  }
}
