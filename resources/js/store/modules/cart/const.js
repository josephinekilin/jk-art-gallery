/*
 *  cart = {
 *       products:{
 *          idProduk1:{
 *              name
 *              price
 *              total
 *              request: {req1: qty1. req2: qty2}
 *          idProduk2
 *          ...
 *          ..
 *          }.
 *       total
 *      }
 */

const getAllDefaultState = () => ({
    cart: {
        products: {},
        total: 0,
    },
});

const defaultState = getAllDefaultState();

export { defaultState };
