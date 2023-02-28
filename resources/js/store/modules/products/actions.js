const fetchArts = async function ({ commit }) {
    const response = await axios.get("api/list-art?category=art");
    commit("setArts", response.data);
};

const fetchAllProducts = async function ({ commit }) {

    await fetchArts({ commit });
};

const modifyStock = function ({ commit }, payload) {
    commit("modifyStock", payload);
};

const modifyOrigin = function ({ commit }, payload) {
    commit("modifyOrigin", payload);
};

const rebootStock = function ({ commit }, payload) {
    commit("rebootStock", payload);
};

export default {
    fetchArts,
    fetchAllProducts,
    modifyStock,
    modifyOrigin,
    rebootStock,
};
