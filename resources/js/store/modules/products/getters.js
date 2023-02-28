const getArts = (state) => state.arts;

const getArtsSize = (state) => state.arts.total || 0;

export default {
    getArts,
    getArtsSize,
};
