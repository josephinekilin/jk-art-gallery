<template>
    <div class="row">
        <div class="col-4">
            <span>Tambahkan ke Keranjang</span>
        </div>
        <div class="col-5">
            <div class="input-group h-100">
                <button
                    class="btn btn-secondary"
                    @click="reduce"
                    v-bind:disabled="qty < 1"
                >
                    -
                </button>
                <input
                    class="h-100 d-block mx-auto text-center form-control"
                    type="number"
                    v-model="qty"
                    readonly
                />
                <button
                    class="btn btn-secondary"
                    @click="add"
                    v-bind:disabled="qty >= data.origin"
                >
                    +
                </button>
            </div>
        </div>
        <div class="col-3 px-0">
            <button
                class="btn custom-btn-primary h-100 w-100"
                style="padding: 0.5em 0.75em"
                @click="reduceStock"
                data-bs-dismiss="modal"
                v-bind:disabled="qty > data.origin || qty <= 0"
            >
                Tambah
            </button>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    data: function () {
        return {
            qty: 0,
        };
    },
    props: {
        data: {
            type: Object,
            required: true,
        },
        state: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        ...mapActions("products", ["modifyStock", "modifyOrigin"]),
        setDefault() {
            this.qty = 0;
        },
        add() {
            this.qty += 1;
        },
        reduce() {
            this.qty -= 1;
        },
        /*
         *   Flow adding to cart:
         *
         *   1. User plays with {stock} (model: qty) by decreasing/increasing qty with button control
         *   2. Any {stock} changes on step 1 watched and applied to vuex
         *   3. Only if user click "PESAN", the {origin} will be set equal to stock
         *   4. If user close the Modal without clicking the "PESAN", stock will be      readjusted to origin again
         *
         */
        reduceStock: function () {
            console.log(`stock would be modified by ${this.qty}`);
            this.$emit("data-callback-footer", this.qty); // trigger changes on parent pool
            this.$emit("submit-action"); // trigger addToCart using the Modal Pool

            // changes the origin to equal to stock
            this.modifyOrigin({
                id: this.data.id,
            });
        },
        isStockEmpty() {
            return this.data.stock <= 0 ? "true" : "false";
        },
    },
    watch: {
        qty() {
            this.modifyStock({
                // use stock as temporary quantity that can be rebooted to origin
                id: this.data.id,
                number: this.qty,
            });
        },
        state() {
            //trigger default every state changes
            console.log("modal state changes");
            this.setDefault();
        },
    },
};
</script>

<style></style>
