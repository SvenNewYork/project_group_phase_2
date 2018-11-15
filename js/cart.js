var itemCount = 0;
var priceTotal = 0.0;

// Add Item to Cart
$('.addItem').click(function(){
    itemCount ++;    
    
    // Update cart count for large and small screens
    $('#itemCount').text(itemCount);
    $('#itemCountSm').text(itemCount);
    
    // Add item name and price to cart and append trash can
    $(this).siblings(".itemName")
        .clone()
        .appendTo('#cartItems')
        .prepend('<i class="fas fa-trash text-danger pr-2 removeItem"></i>')
        .append('<br>'); 

    // Calculate Total Price
    var price = parseFloat(
        $(this).siblings().find('.price')
        .text()
        .replace(/[^0-9.-]+/g,"")
    ); 
    
    console.log('price added:'+price);
    
    // Add item price to total price
    priceTotal += price;
    
    // Update total price text with new total price
    $('#cartTotal').text("Total: $" + priceTotal.toFixed(2)).prepend('<hr>');
});

// Remove Item from Cart
$('#shoppingCart').on('click', '.removeItem', function(){
    
    // Parse item price and strip non-numbers
    var price = parseFloat(
        $(this).parent().find('.price')
        .text()
        .replace(/[^0-9.-]+/g,"")
    );
    
    console.log('price removed:'+price);
    
    // Remove item price from total price
    priceTotal -= price;
    
    // Update total price with new total price
    $('#cartTotal').text("Total: $" + priceTotal.toFixed(2)).prepend('<hr>');

    // Remove item from cart
    $(this).parent().remove();
  
    itemCount --;
    
    // Update cart count for large and small screens
    $('#itemCount').text(itemCount);
    $('#itemCountSm').text(itemCount);
    
    // If cart count equals zero, hide total price
    if (itemCount == 0) {
        $('#cartTotal').text("");
    }

});

// Clear Cart
$('#clearCart').click(function() {
    
    // Set item count and total price to zero
    itemCount = 0;
    priceTotal = 0.0;

    // Clear appropriate text and update values
    $('#cartItems').text('');
    $('#itemCount').text(itemCount);
    $('#itemCountSm').text(itemCount);
    $('#cartTotal').text('');
}); 