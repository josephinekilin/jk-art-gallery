const helper = {
    calItemTotal: (request, price) => {
        const qty = Object.values(request).reduce((s, v) => s + v);
        return price * qty;
    },
    calCartTotal: (products) => {
        return Object.values(products)
            .map((it) => it["total"])
            .reduce((s, v) => s + v);
    },
};

const addItem = (state, { id, req, name, price, qty }) => {
    if (state.cart["products"].hasOwnProperty(id)) {
        if (state.cart["products"][id]["request"].hasOwnProperty(req))
            state.cart["products"][id]["request"][req] += qty;
        else state.cart["products"][id]["request"][req] = qty;

        state.cart["products"][id]["total"] = helper.calItemTotal(
            state.cart["products"][id]["request"],
            price
        );
    } else {
        state.cart["products"][id] = {
            name,
            price,
            total: price * qty,
            request: {},
        };
        state.cart["products"][id]["request"][req] = qty;
    }

    state.cart["total"] = helper.calCartTotal(state.cart["products"]);
};

const modifyCart = (state, { id, req, qty }) => {
    if (!state.cart.products[id]){
        //nothing
    }
    else {
        if (state.cart.products[id].request[req] == undefined){
            
        }
        else {
            state.cart.products[id].request[req] -= qty;

            if (state.cart.products[id].request[req] == 0)
                delete state.cart.products[id].request[req];

            if (Object.keys(state.cart.products[id].request).length == 0)
                delete state.cart.products[id];
            else
                state.cart.products[id].total = helper.calItemTotal(
                    state.cart.products[id].request,
                    state.cart.products[id].price
                );

            state.cart.total =
                Object.keys(state.cart.products).length != 0
                    ? helper.calCartTotal(state.cart.products)
                    : 0;
        }
    }
};

export default {
    addItem,
    modifyCart,
};
