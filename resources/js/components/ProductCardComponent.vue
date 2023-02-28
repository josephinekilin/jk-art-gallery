<template>
    <div
        id="product-card"
        class="card"
        style="width: 160px"
        @click="handleClick"
    >
        <!-- <img :src="product.img" class="card-img-top" alt="..." /> -->
        <div class="card-body">
            <h3 class="card-title">{{ product.name }}</h3>
            <p class="cart-text fw-bold">
                <span class="price"
                    >Rp. {{ product.price.toLocaleString("id-ID") }}</span
                >
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        product: Object,
    },
    mounted() {},
    methods: {
        handleClick() {
            this.$emit("productClicked", this.product.id);
        },
    },
};
</script>

<style>
.card {
    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.15));
}

#product-tile img {
    width: 100%;
    max-height: 150px;
    object-fit: cover;
    object-position: center;
}

#product-tile .card-title {
    font-weight: 400;
    font-size: 0.9rem;
}


#product-tile .price {
    font-size: 0.85rem;
    color: black;
}
</style>
