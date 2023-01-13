<template>
    <div class="product-page">
        <div class="product-page__container">
            <div class="product-page__layout">
                <div class="product-page__wrapper">
                    <div v-if="hasBadges" class="product-page__badges">
                        <ShcUiProductBadges
                            :product-badges="props.product.badges"
                            :size="PRODUCT_BADGE_SIZE.large"
                        />
                    </div>
                    <ShcUiProductGallery :images="props.product.images" />
                </div>
                <div class="product-page__info">
                    <ShcUiHeading
                        :tag="HEADING_TAG.h1"
                        class="product-page__title"
                    >
                        {{ props.product.name }}
                    </ShcUiHeading>
                    <ShcUiParagraph :theme="PARAGRAPH_THEME.secondary">
                        {{ $t("product.card.sku") }} #{{ props.product.sku }}
                    </ShcUiParagraph>
                    <div class="product-page__rating">
                        <div class="product-page__rating-style">
                            <ShcUiRatingStars
                                :score="props.product.rating"
                                :review-count="props.product.reviewCount"
                                :size="RATING_STARS_SIZE.large"
                                class="product-page__rating-stars"
                            />
                        </div>
                    </div>
                    <div class="product-page__description">
                        <ShcUiCmsContent :content="props.product.description" />
                        <ShcUiCmsContent
                            :content="props.product.shortDescription"
                            class="product-page__description--short"
                        />
                    </div>
                    <div class="product-page__price-wrapper">
                        <ShcUiPrice
                            v-if="props.product.priceOld"
                            :price="props.product.priceOld"
                            :size="PRICE_SIZE.large"
                            :price-old="true"
                        />
                        <ShcUiPrice
                            :price="props.product.price"
                            :size="PRICE_SIZE.jumbo"
                        />
                    </div>
                    <form class="product-page__form">
                        <div class="product-page__button-wrapper">
                            <ShcUiButton
                                full
                                class="product-page__button-add-to-cart"
                                @click="cartProductAdd(props.product.id)"
                            >
                                {{ $t("product.card.addToCart") }}
                            </ShcUiButton>
                        </div>
                    </form>
                    <ShcUiOfferParameter />
                </div>
            </div>
            <section aria-labelledby="details" class="product-page__details">
                <ShcUiList
                    :list="props.product.details"
                    :theme="LIST_THEME.secondary"
                    class="product-page__details-list"
                >
                    <template #item="{ item }">
                        <div>
                            <ShcUiLink
                                :to="`#${item.id}`"
                                class="product-page__details-headers"
                            >
                                {{ item.name }}
                            </ShcUiLink>
                        </div>
                    </template>
                </ShcUiList>
                <ShcUiList :list="props.product.details">
                    <template #item="{ item }">
                        <div>
                            <ShcUiHeading
                                :id="item.id"
                                :tag="HEADING_TAG.h2"
                                class="product-page__details-heading"
                            >
                                {{ item.name }}
                            </ShcUiHeading>
                            <div class="product-page__details-description">
                                <ShcUiList :list="item.items" />
                            </div>
                        </div>
                    </template>
                </ShcUiList>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { PRICE_SIZE } from "@shc/nuxt-shc-ui-layer/components/Price/price";
import { HEADING_TAG } from "@shc/nuxt-shc-ui-layer/components/Heading/heading";
import { LIST_THEME } from "@shc/nuxt-shc-ui-layer/components/List/list";
import { PARAGRAPH_THEME } from "@shc/nuxt-shc-ui-layer/components/Paragraph/paragraph";
import { RATING_STARS_SIZE } from "@shc/nuxt-shc-ui-layer/components/Rating/Stars/ratingStars";
import { PRODUCT_BADGE_SIZE } from "@shc/nuxt-shc-ui-layer/components/Product/Badges/productBadges";
import type { Product } from "./product";
import { useNuxtApp } from "#app";

// @todo import interfaces
// import type { Props } from '../props'

interface Props {
    product: Product;
}

const props = defineProps<Props>();
const { $bus } = useNuxtApp();

const cartProductAdd = (productId: string): void => {
    $bus.$emit("cartProductAdd", { productId });
};

const hasBadges = computed((): boolean => {
    return !!props.product.badges.length;
});
</script>

<style lang="scss" scoped>
.product-page {
    @apply bg-white;

    &__container {
        @apply max-w-2xl mx-auto py-16 px-4 flex flex-col;

        @screen sm {
            @apply py-24 px-6;
        }

        @screen lg {
            @apply max-w-7xl px-8;
        }
    }

    &__layout {
        @screen lg {
            @apply grid grid-cols-2 gap-x-8 items-start;
        }
    }

    &__wrapper {
        @apply relative;
    }

    &__badges {
        @apply absolute top-0 z-5 uppercase;

        &-space {
            @apply mx-2;
        }
    }

    &__info {
        @apply mt-10 px-4;

        @screen sm {
            @apply px-0 mt-16;
        }

        @screen lg {
            @apply mt-0;
        }
    }

    &__title {
        @apply mb-2;
    }

    &__price-wrapper {
        @apply mt-12;
    }

    &__rating {
        @apply flex items-center mt-4;

        &-score {
            @apply font-extrabold text-neutral-10 mx-2;
        }

        &-style {
            @apply flex-shrink-0;
        }

        &-stars {
            @apply text-neutral-10;
        }
    }

    &__description {
        @apply mt-4;

        &--short {
            @apply mt-4;
        }
    }

    &__form {
        @apply mt-6;
    }

    &__button-wrapper {
        @apply my-8 w-56 flex;
    }

    &__button-add-to-cart {
        @apply max-w-xs flex-1 border border-transparent rounded-md py-3 px-8 flex items-center
    justify-center text-base focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50
    focus:ring-indigo-500 sm:w-full;
    }

    &__details {
        @apply max-w-container w-full self-center text-neutral-10;

        &-list {
            @apply mt-20 justify-center;
        }

        &-headers {
            @apply text-2xl text-primary-600 underline;
        }

        &-heading {
            @apply mb-10 mt-20 text-3xl font-extrabold;
        }

        &-description {
            @apply text-base;
        }
    }
}
</style>
