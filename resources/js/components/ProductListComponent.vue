<template>
    <div>
        <h2 class="mt-4 mb-3" v-if="productType == 'tile'">
            {{ title.tile }}
        </h2>
        <div class="mb-3 d-flex justify-content-center">
            <div
                class="d-flex flex-wrap justify-content-between"
                style="gap: 1.2rem; max-width: 950px"
                v-if="productType == 'tile'"
            >
                <product-card
                    v-for="(product, index) in products.items"
                    :product="product"
                    :key="index"
                    @productClicked="triggerToParent"
                ></product-card>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: Object,
        products: Object,
        productType: String,
    },
    methods: {
        triggerToParent(data) {
            this.$emit("productClicked", data);
        },
    },
};
</script>

<style></style>
