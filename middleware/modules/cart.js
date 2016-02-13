/**
 * Created by jacob on 12/02/16.
 */

var carts = {};

var operations ={
    createCart: function (session_id) {
        carts[session_id] = [];
    },
    deleteCart: function(session_id){
        carts[session_id] = '';
    },
    addItemToCart: function(session_id, item){
        carts[session_id].push(item);
    },
    deleteItemFromCart: function(session_id, item){

        for (var i = 0; i < carts[session_id].length; i++){
            if (carts[session_id][i] == item){
                carts[session_id].splice(i,1);
            }
        }

    },
    getItemsFromCart: function( session_id){
        return carts[session_id];
    }
};

module.exports = operations;