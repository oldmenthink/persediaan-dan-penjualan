document.addEventListener("DOMContentLoaded", function () {
    const stock = []; 
    const sales = []; 

    // Ambil elemen HTML
    const productForm = document.getElementById("product-form");
    const stockTableBody = document.querySelector("#stock-table tbody");
    const productSelect = document.getElementById("product-select");
    const salesForm = document.getElementById("sales-form");
    const salesTableBody = document.querySelector("#sales-table tbody");

    // Fungsi update tabel stok
    function updateStockTable() {
        stockTableBody.innerHTML = "";
        productSelect.innerHTML = "";
        
        stock.forEach((product, index) => {
            const row = `<tr>
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>Rp ${product.price.toLocaleString()}</td>
                <td><button onclick="deleteProduct(${index})">❌ Hapus</button></td>
            </tr>`;
            stockTableBody.innerHTML += row;

            productSelect.innerHTML += `<option value="${index}">${product.name}</option>`;
        });
    }

    // Fungsi menambah produk ke stok
    productForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const name = document.getElementById("product-name").value;
        const quantity = parseInt(document.getElementById("product-quantity").value);
        const price = parseInt(document.getElementById("product-price").value);

        stock.push({ name, quantity, price });
        updateStockTable();
        productForm.reset();
    });

    // Fungsi menghapus produk
    window.deleteProduct = function (index) {
        stock.splice(index, 1);
        updateStockTable();
    };

    // Fungsi melakukan penjualan
    salesForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const productIndex = parseInt(productSelect.value);
        const sellQuantity = parseInt(document.getElementById("sell-quantity").value);

        if (stock[productIndex].quantity >= sellQuantity) {
            stock[productIndex].quantity -= sellQuantity;

            const totalPrice = sellQuantity * stock[productIndex].price;
            sales.push({ name: stock[productIndex].name, quantity: sellQuantity, totalPrice });

            updateStockTable();
            updateSalesTable();
        } else {
            alert("Stok tidak cukup!");
        }
    });

    // Fungsi update tabel penjualan
    function updateSalesTable() {
        salesTableBody.innerHTML = "";
        sales.forEach(sale => {
            const row = `<tr>
                <td>${sale.name}</td>
                <td>${sale.quantity}</td>
                <td>Rp ${sale.totalPrice.toLocaleString()}</td>
            </tr>`;
            salesTableBody.innerHTML += row;
        });
    }
});
