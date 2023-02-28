<template>
    <div
        class="container-sm px-0 position-relative"
    >
        <div class="container-fluid" style="background-color: lightblue;">
            <router-link to="/cart">
                <button
                        class="btn"
                        style="padding: 25px;float: right;margin-right: 100px;"
                ><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
                </button>
            </router-link>
            <a class="navbar-brand" href="#" style="padding:15px;">
                <h2 style="font-family: fantasy;">JK Art Gallery</h2>
            </a>
        
            
        </div>
        <div
            class="container-sm"
            style="overflow: hidden auto;background-color: lavender;"
        >
            <product-section
                :productType="'tile'"
                :products="product"
                :title="currentTitle"
                @productClicked="toggleModalProduct"
            ></product-section>
        </div>
        <centered-modal
            :id="modalId"
            :header="modalData.header"
            :body="modalData.body"
            :footer="modalData.footer"
            :state="modalState"
            @submit-action="handleProductModalSubmit"
        ></centered-modal>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import ProdModalBodyVue from "./ModalComponent/ProductPage/ProdModalBody.vue";
import ProdModalFooterVue from "./ModalComponent/ProductPage/ProdModalFooter.vue";
import ProdModalHeaderVue from "./ModalComponent/ProductPage/ProdModalHeader.vue";
export default {
    data: function () {
        return {
            products: {}, // current product on category
            currentTitle: {},
            product: {}, // selected product on toggling modal
            titles: {
                arts: {
                    tile: "All Products"
                }
            },
            modalId: "productModal",
            modalData: {
                header: {
                    component: ProdModalHeaderVue,
                    data: {
                        title: "",
                    },
                },
                body: {
                    component: ProdModalBodyVue,
                    data: {
                        // img: "",
                        desc: "",
                        // ph: "",
                        stock: "",
                        origin: "",
                    },
                },
                footer: {
                    component: ProdModalFooterVue,
                    data: {
                        id: "",
                        stock: "",
                    },
                },
            },
            modalState: false,
        };
    },
    watch: {
        product: {
            handler: function () {
                this.modalData.body.data.stock = this.product.stock;
                this.modalData.footer.data.stock = this.product.stock;
            },
            deep: true,
        },
    },
    computed: {
        ...mapGetters("products", {
            arts: "getArts",
            artsSize: "getArtsSize",
        }),
        searchProductById() {
            return (id) => {
                for (let i = 0; i < this.products.total; i++)
                    if (this.products.items[i].id === id) {
                        return this.products.items[i];
                    }
            };
        },
    },
    methods: {
        ...mapActions("products", [
            "fetchArts",
            "rebootStock",
        ]),
        ...mapActions("cart", ["addToCart"]),

        fetchIfNotLoaded: async function (product) {
            // if (this.artsSize === 0)
                await this.fetchArts();
        },
        setCategory: async function (product) {
            await this.fetchIfNotLoaded(product);
                this.products = this.arts;
                this.currentTitle = this.titles.arts;
        },
        toggleModalProduct: function (id) {
            this.product = this.searchProductById(id);

            this.modalData.header.data.title = this.product.name;

            this.modalData.body.data.desc = this.product.desc;
            this.modalData.body.data.img = this.product.img;
            this.modalData.body.data.ph = this.product.custom.requestPh;
            this.modalData.body.data.stock = this.product.stock;

            this.modalData.footer.data.id = this.product.id;
            this.modalData.footer.data.stock = this.product.stock;
            this.modalData.footer.data.origin = this.product.origin;

            console.log(`toggling modal with product id: ${id}`);
            this.modalState = !this.modalState;
            $("#" + this.modalId).modal("toggle");
            $("#" + this.modalId).on("hidden.bs.modal", () => {
                this.rebootStock({
                    id,
                });
            });
        },
        handleProductModalSubmit(data) {
            const payload = {
                id: this.product.id,
                req: data.body.toString(),
                name: this.product.name,
                price: this.product.price - this.product.discount,
                qty: Number(data.footer),
            };
            this.addToCart(payload);
        },
    },
    mounted: async function () {
        console.log("mounted product page");
        await this.setCategory("ARTS");
    },
};
</script>

<style>
input[type="radio"] {
    display: none;
}
#btn-right-bot {
    position: fixed;
    bottom: 2rem;
    right: 1rem;
    display: inline-block;
    width: 65px;
    height: 65px;
    z-index: 999;
}

#category-buttons {
    padding-block: 1rem;
    background-color: white;
    border-bottom: 1px solid #a4a4a4;
}

#category-buttons label {
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

#category-buttons > * {
    transition: all 100ms ease-in;
    font-weight: 400;
    font-size: 0.97rem;
    color: rgba(255, 255, 255, 0.75);
    position: relative;
    overflow: hidden;
    width: 100px;
    height: 50px;
}

#category-buttons span {
    display: inline-block;
    line-height: 100%;
}

#category-buttons input:checked + label {
    font-weight: 500;
    color: white;
    font-size: 1rem !important;
}
</style>
