<template>
    <div
        class="container-sm px-0 position-relative" style="background-color: lavender;"
    >
        <div class="container-fluid" style="background-color: lightblue;">
        <router-link
            to="/"
            style="text-decoration: none; color: inherit; display: block"
        >
            <div class="d-flex align-items-center mb-4" style="padding: 20px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="black" class="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                </svg>
                <span id="hint-btn-chevron-back">Home</span>
            </div>
        </router-link>
        </div>
        
        <div class="container-fluid pt-2 px-0 h-100" id="cart-container" style="background-color: lavender;">
            <h2 class="px-4">Cart Item</h2>
            <div
                class="container-sm px-3 rounded-1"
                id="grid-table-cart-container"
                style="background-color: lavender;"
            >
                <div class="row sep-shadow"></div>
                <div
                    id="header-table-cart"
                    class="row row-cols-2 fw-bold fs-5 py-2 px-2"
                >
                    <div class="col-6">Product</div>
                    <div class="col-2">Quantity</div>
                    <div class="col-2">Price</div>
                    <div class="col-2"></div>
                </div>
                <div class="row sep-shadow"></div>
                <div class="p-0" id="row-table-cart">
                    <div
                        class="row row-cols-2 row-item-cart py-2 px-2"
                        v-for="(item, id) in flatCart"
                        :key="id"
                    >
                        <div class="col-6">
                            <p>{{ item.name }}</p>
                        </div>
                        <div class="col-2">
                            <span class="my-auto"
                                >{{ item.qty }}</span
                            >
                        </div>
                        <div class="col-2">
                            <span class="my-auto"
                                >Rp.
                                {{
                                    (item.price * item.qty).toLocaleString(
                                        "id-ID"
                                    )
                                }}</span
                            >
                        </div>
                        <div class="col-2 text-end">
                            <button
                                    class="btn btn-danger"
                                    @click="removeItem(item)"
                                >delete
                                </button>
                        </div>
                    </div>
                </div>
                <div
                    class="row row-cols-2 py-2 px-2"
                    id="footer-table-cart"
                    :style="`border-top: ${
                        cart.total > 0 ? '2px solid rgb(164, 164, 164)' : 'none'
                    }`"
                >
                    <div class="col-6">Total &nbsp;</div>
                    <div class="col-2"></div>
                    <div class="col-2">
                        Rp. {{ cart.total.toLocaleString("id-ID") }}
                    </div>
                    
                </div>
                
            </div>
            <button
                        class="btn btn-success"
                        @click="emptyCart(cart)"
                    >
                        Pay Now!
                    </button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    data: function () {
        return {
            flatCart: [],
        };
    },
    watch: {
        cart: {
            handler: function () {
                this.flatCart = this.flattingCart();
            },
            deep: true,
        },
    },
    computed: {
        ...mapGetters({ cart: "cart/getCart" }),
        ...mapGetters("products", {
            itemsSize: "getItemsSize",
        }),
    },
    methods: {
        ...mapActions("cart", ["addToCart", "modifyCart"]),
        ...mapActions("products", [
            "modifyStock",
            "modifyOrigin",
            "fetchFoods",
        ]),
        removeItem({ id, qty, request }) {
            this.modifyCart({
                id,
                req: request,
                qty,
            });

            this.modifyStock({
                id,
                number: -1 * qty,
            });
            this.modifyOrigin({
                id,
            });
        },
        emptyCart(cart) {
            this.flatCart.forEach((item) => {
                this.removeItem(item);
            });
            alert("You Pay Rp."+ cart.total.toLocaleString("id-ID") + " Thank you For your purchase! :D");
        },
        flattingCart() {
            const flattenCart = [];
            Object.keys(this.cart["products"]).forEach((id) => {
                Object.keys(this.cart["products"][id]["request"]).forEach(
                    (req) => {
                        flattenCart.push({
                            id,
                            ...this.cart["products"][id],
                            request: req,
                            qty: this.cart["products"][id]["request"][req],
                        });
                    }
                );
            });
            return flattenCart;
        },
    },
    async mounted() {
        console.log("mounted cart component");
        // ensure all stock information is loaded

        if (this.foodsSize === 0) await this.fetchFoods();

        this.flatCart = this.flattingCart();
    },
};
</script>

<style>
#cart-container {
    background-color: #f5f5f5;
}

#grid-table-cart-container {
    --table-con-hg: calc(100vh - 70px - 200px);
    min-height: 100px;
    max-height: var(--table-con-hg) !important;
    overflow: hidden;
    background: white;
}

#btn-chevron-back {
    width: 24px;
    height: 24px;
}
#hint-btn-chevron-back {
    font-size: 1.25rem;
}
#buttons-control-container {
    gap: 1rem;
}
#buttons-control-container > * {
    width: fit-content;
    height: 40px;
}
/* 
#header-table-cart {
} */

.sep-shadow {
    border-bottom: 2px solid #a4a4a4;
    height: 0px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    -webkit-box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    -moz-box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
}

#row-table-cart {
    max-height: min(calc(var(--table-con-hg) - 90px), 700px) !important;
    overflow: hidden auto;
}

.row-item-cart {
    border-bottom: 1px solid #c5c5c5;
}

.row-item-cart p {
    margin-bottom: 0.25em;
}

#footer-table-cart {
    min-height: 50px !important;
}
</style>
