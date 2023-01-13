import { mount } from '@vue/test-utils'
import { PRODUCT_DATA } from './product.mock'
import Product from './Product.vue'

describe('Product', () => {
    const isFavouriteProduct = false
    const factory = () => {
        return mount(Product, {
            propsData: {
                product: PRODUCT_DATA,
                isFavouriteProduct,
            },
        })
    }

    it('correct HTML markup', () => {
        const wrapper = factory()

        expect(wrapper.element).toMatchSnapshot()
    })
})
