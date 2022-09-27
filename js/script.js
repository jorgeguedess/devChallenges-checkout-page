/* PRICE-CONTAINER */ 
const priceCurrent = document.querySelectorAll('.price-current');
const priceOld = document.querySelectorAll('.price-old');
const quantityItems = document.querySelectorAll('.quantity');
const quantityButtons = document.querySelectorAll('[data-operator]');
const shipping = document.querySelector('#shipping');
const total = document.querySelector('[data-total]');

function updatesValues() {
    let newTotal = parseInt(shipping.dataset.price);
    priceCurrent.forEach((item) => {
        let index = Array.from(priceCurrent).indexOf(item);
        let newQuantity = quantityItems[index].dataset.quantity;
        let newPrice = (item.dataset.price * newQuantity).toFixed(2);
        quantityItems[index].innerHTML = newQuantity;
        item.innerHTML = `$${newPrice}`;
        priceOld[index].innerHTML = `$${(
            priceOld[index].dataset.price * newQuantity
        ).toFixed(2)}`;
        newTotal += parseFloat(newPrice);
    });
    total.innerHTML = `$${newTotal.toFixed(2)}`;
}

quantityButtons.forEach(button => {
    button.addEventListener('click', () => {
        let index = Array.from(quantityButtons).indexOf(button) <= 1 ? 0 : 1;
        let newQuantity = eval(
            quantityItems[index].dataset.quantity + button.dataset.operator + "1"
        );
        if (newQuantity >= 1) {
            quantityItems[index].dataset.quantity = newQuantity;
            updatesValues();
        }
    })
});
