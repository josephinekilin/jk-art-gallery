const addToCart = function ({ commit }, payload) {
    commit("addItem", payload);
};

const modifyCart = function ({ commit }, payload) {
    commit("modifyCart", payload);
};

const emptyCart = function ({ commit }) {
    commit("emptyCart");
};

export default {
    addToCart,
    modifyCart,
    emptyCart,
};
