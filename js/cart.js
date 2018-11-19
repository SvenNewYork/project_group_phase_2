var itemCount = "";
var priceTotal = "";
var productId = "";
var productName ="";
var productPrice = "";
var productQty = "";

var shoppingCart = [];
var newItem = {};


function findProduct(productName) {
    for (var i = 0, len = shoppingCart.length; i < len; i++) {
        if (shoppingCart[i].productName === productName)
            return i; 
    }
    return -1;
}

function addQty(productName) {
    for (var i = 0, len = shoppingCart.length; i < len; i++) {
        if (shoppingCart[i].productName == productName){
            shoppingCart[i].productQty += 1;
            shoppingCart[i].productSubtotal = shoppingCart[i].productQty * shoppingCart[i].productPrice;
            return shoppingCart[i]; 
        }
    }
    return null;
}

function removeQty(productName) {
    for (var i = 0, len = shoppingCart.length; i < len; i++) {
        if (shoppingCart[i].productName == productName){
            shoppingCart[i].productQty -= 1;
            shoppingCart[i].productSubtotal = shoppingCart[i].productQty * shoppingCart[i].productPrice;
            return shoppingCart[i]; 
        }
    }
    return null;
}

function printCart()
{
    $('#cartItems').empty();
    
    itemCount = 0;
    priceTotal = 0;
    
    for (var i = 0; i < shoppingCart.length; i++) {
        itemCount += shoppingCart[i].productQty;
        priceTotal += (shoppingCart[i].productPrice * shoppingCart[i].productQty);
    }
    
    // Update cart count for large and small screens
    $('#itemCount').text(itemCount);
    $('#itemCountSm').text(itemCount);
    
    for (var i = 0; i < shoppingCart.length; i++) {
        $('#cartItems').append(
            '<tr>'+
            '<td>'+'<i class="fas fa-trash text-danger pr-2 removeItem"></i>'+'</td>'+
            '<td>'+shoppingCart[i].productName+'</td>'+
            '<td>'+shoppingCart[i].productPrice+'</td>'+
            '<td>'+shoppingCart[i].productQty+'</td>'+
            '<td class="text-right">'+shoppingCart[i].productSubtotal+'</td>'+
            '</tr>');
    }

    // Update total price text with new total price
    $('#cartTotal').text("Total: $" + priceTotal.toFixed(2));
    
    if(itemCount==0){
        $('#cartTotal').text('');
    }
}

// Add Item to Cart
$('.addItem').click(function(){
    itemCount ++;
    
    productName = $(this).siblings('.itemName').clone().children().remove().end().text();
    productPrice = parseFloat($(this).siblings().find('.price').text().replace(/[^0-9.-]+/g,""));
    
    if(findProduct(productName) != -1){
        addQty(productName)
    }
    else{
        newItem = {
            'productName': productName,
            'productPrice': productPrice,
            'productQty': 1,
            'productSubtotal': productPrice
        }

        shoppingCart.push(newItem);
    }
    
    printCart(); 
});

// Remove Item from Cart
$('#shoppingCart').on('click', '.removeItem', function(){
    
    productName = $(this).closest('tr').find('td:eq(1)').text();
    productPrice = $(this).closest('tr').find('td:eq(2)').text();
    productQty = $(this).closest('tr').find('td:eq(3)').text();
    
    if(productQty == 1){
        productLoc = findProduct(productName);
        shoppingCart.splice(productLoc,1);
    }
    else{
        removeQty(productName);
    }
    
    printCart();
});

// Clear Cart
$('#clearCart').click(function() {
    shoppingCart = [];
    
    // Clear appropriate text and update values
    printCart();
}); 