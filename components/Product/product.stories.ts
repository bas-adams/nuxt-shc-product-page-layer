import type { Meta, StoryFn } from '@storybook/vue3'
import { PRODUCT_DATA } from './product.mock'
import Product from './Product.vue'

export default {
    title: 'components/Product',
    args: {
        product: PRODUCT_DATA,
    },
    argTypes: {
        onAddToCard: {
            action: 'addToCard',
        },
    },
} as Meta<typeof Product>

const Template: StoryFn<typeof Product> = (args) => ({
    components: {
        Product,
    },
    setup() {
        return {
            args,
        }
    },
    template: `
      <Product
          v-bind="args"
      />
    `,
})

export const Default = Template.bind({})
