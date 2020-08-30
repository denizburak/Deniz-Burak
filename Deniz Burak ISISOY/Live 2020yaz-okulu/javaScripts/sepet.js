//ELEMENTLER
const urun = document.querySelector(".card-title");
const sepetEkle = document.querySelectorAll(".ekle");
const card = document.querySelector("#card-card");
const urunList = document.querySelector(".deniziz");
const clearButton = document.querySelector("#clear-items");
const filter = document.querySelector("#filter");
const alertsepet = document.querySelector("#form-roow");
eventListeners(); //Sayfa Başı eventleri

function eventListeners() {

    document.addEventListener("DOMContentLoaded", loadAllItemsToUI);
    card.addEventListener("click", deleteItem);
    clearButton.addEventListener("click", clearAllItems);
    filter.addEventListener("keyup", filterItems);

}





function filterItems(e) {
    console.log(e.target.value);
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function (listItem) {
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1) {
            listItem.setAttribute("style", "display: none !important");
        }
        else {
            listItem.setAttribute("style", "display: block");
        }
    });
}

function clearAllItems(e) {
    if (confirm("Tüm ürünleri sepetten çıkarmak istediğinize emin misiniz?")) {
        while (urunList.firstChild !== null) {
            urunList.removeChild(urunList.firstChild);
        }
        localStorage.removeItem("items");
        showAlert("danger","Tüm ürünler silindi.!");

    }
}

function deleteItem(e) {
    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deleteItemsStorage(e.target.parentElement.parentElement.textContent.trim());
        showAlert("danger","Ürün Silindi");
    }

}

function deleteItemsStorage(deleteitem) {
    let items = getItemFromStorage();

    items.forEach(function (item, index) {
        if (item === deleteitem) {
            items.splice(index, 1);
        };
    });
    localStorage.setItem("items", JSON.stringify(items));
}

function loadAllItemsToUI() {
    let items = getItemFromStorage();

    items.forEach(function (item) {
        addItemToUI(item);
    });

}

function getItemFromStorage() { //Storagedan item almak için
    let items;
    if (localStorage.getItem("items") === null) {
        items = [];
    }
    else {
        items = JSON.parse(localStorage.getItem("items"));
    }
    return items;
}

function addItemStorage(e) {
    console.log(e.target);
    let items = getItemFromStorage();
    items.push(e.target.parentElement.firstElementChild.textContent);

    localStorage.setItem("items", JSON.stringify(items));
}

function addItemToUI(item) {//String Değerini list item ularak UI"ya ekleme

    // LİST İTEM OLUŞTURMA
    const listItem = document.createElement("li");

    // Link Oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'>  </i>";

    listItem.className = "list-group-item d-flex justify-content-between";

    // TEXT NODE
    listItem.appendChild(document.createTextNode(item)); ////

    listItem.appendChild(link);
    // Todo list'e List Item'i ekleme
    urunList.appendChild(listItem);
}

function showAlert(type, message) {
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;

    alert.textContent = message;

    alertsepet.appendChild(alert);

    // setTimeout
    setTimeout(function () {
        alert.remove();
    }, 800);

}
