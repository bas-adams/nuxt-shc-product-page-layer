<template>
    <div>
        <NuxtLayout>
            <div v-if="isProductExist">
                <ShcPPProduct v-if="!productLoading" :product="productData" />
            </div>
            <div v-else>
                <p>{{ $t("Product not exist") }}</p>
                <div v-if="productError">Error: {{ productError.message }}</div>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import getProduct from "../graphql/queries/getProduct.graphql";
import { useHead, useRoute } from "#app";
import { useAsyncQuery } from "#imports";

const route = useRoute();

const {
    data: product,
    pending: productLoading,
    error: productError,
} = await useAsyncQuery(getProduct, {
    filter: {
        urlKey: {
            eq: route.params.id as string,
        },
    },
});

if (productError?.value) {
    console.error({ productError: productError.value });
}

const isProductExist = computed(() => {
    return productLoading ? true : product.value?.products?.items.length > 0;
});

const productData = computed(() => {
    const {
        badges,
        description,
        details,
        id,
        images,
        metaDescription,
        metaKeywords,
        metaTitle,
        name,
        priceRange,
        rating,
        reviews,
        shortDescription,
        sku,
        stock,
    } = product?.value?.products?.items[0] ?? {};

    const reviewsTotalCount = reviews?.totalCount;

    // @todo wartość z id powinna przychodzi z bridge
    const detailsDate = details?.map((detail, index) => {
        return {
            id: `detail-${index}`,
            ...detail,
        };
    });

    const price = priceRange?.minimumPrice.finalPrice;
    const priceOld = priceRange?.maximumPrice.finalPrice;

    return {
        badges, // @todo no data from bridge on shopware
        description,
        details: detailsDate,
        id,
        images,
        metaDescription,
        metaKeywords,
        metaTitle,
        name,
        price,
        priceOld,
        rating,
        reviewCount: reviewsTotalCount,
        shortDescription,
        sku,
        stock,
    };
});

useHead({
    title: productData.value.metaTitle,
    meta: [
        {
            name: "description",
            content: productData.value?.metaDescription || "",
        },
        {
            name: "keywords",
            content: productData.value?.metaKeywords || "",
        },
    ],
});
</script>
