const setArts = (state, payload) => {
    state.arts = payload;
};

// Changes based on origin
const modifyStock = (state, payload) => {
    console.log("modify stock requested");
    if (payload.id[0] === "f") {
        for (let i = 0; i < state.arts.total; i++)
            if (state.arts.items[i].id === payload.id) {
                state.arts.items[i].stock =
                    state.arts.items[i].origin - payload.number;
                break;
            }
    } else {
        console.log("[MUTATION ERROR] ID NOT FOUND on modifyStock");
    }
    console.log("modify stock ended");
};

// Only be executed if user has added product to cart OR product has been ordered (by generating QRcode)
const modifyOrigin = (state, payload) => {
    console.log("modify origin requested");
    if (payload.id[0] === "f") {
        for (let i = 0; i < state.arts.total; i++)
            if (state.arts.items[i].id === payload.id) {
                state.arts.items[i].origin = state.arts.items[i].stock;
                break;
            }
    } else {
        console.log("[MUTATION ERROR] ID NOT FOUND on modifyOrigin");
    }
    console.log("modify origin ended");
};

// when user didnt add to cart, any change to stock will be reset to origin
const rebootStock = (state, payload) => {
    console.log("reboot stock requested");
    if (payload.id[0] === "f") {
        for (let i = 0; i < state.arts.total; i++)
            if (state.arts.items[i].id === payload.id) {
                state.arts.items[i].stock = state.arts.items[i].origin;
                break;
            }
    } else {
        console.log("[MUTATION ERROR] ID NOT FOUND on rebootStock");
    }
    console.log("reboot stock ended");
};

export default {
    setArts,
    modifyStock,
    modifyOrigin,
    rebootStock,
};
