import type { ProductBadges } from '@shc/nuxt-shc-ui-layer/components/Product/Badges/productBadges'
import type {
    ProductDetails,
    ProductImages,
} from '@shc/nuxt-shc-ui-layer/components/Product/product'
import type { Price } from '@shc/nuxt-shc-ui-layer/components/Price/price'

export interface Product {
    badges: ProductBadges
    description: string
    details: ProductDetails
    id: string
    images: ProductImages
    name: string
    price: Price
    priceOld?: Price | null
    rating: number
    reviewCount: number
    shortDescription: string
    sku: string
    stock?: boolean
}
