//ELEMENTLER
const urun = document.querySelector(".card-title");
const sepetEkle = document.querySelectorAll(".ekle");
const card = document.querySelector("#card-card");
const urunList = document.querySelector(".deniziz");
const clearButton = document.querySelector("#clear-items");
const filter = document.querySelector("#filter");
const alerturun = document.querySelector(".deniz");
eventListeners(); //Sayfa Başı eventleri

function eventListeners() {

    document.addEventListener("DOMContentLoaded", loadAllItemsToUI);


    sepetEkle[0].addEventListener("click", addItemStorage);
    sepetEkle[1].addEventListener("click", addItemStorage);
    sepetEkle[2].addEventListener("click", addItemStorage);
    sepetEkle[3].addEventListener("click", addItemStorage);
    sepetEkle[4].addEventListener("click", addItemStorage);
    sepetEkle[5].addEventListener("click", addItemStorage);
    sepetEkle[6].addEventListener("click", addItemStorage);
    sepetEkle[7].addEventListener("click", addItemStorage);
    sepetEkle[8].addEventListener("click", addItemStorage);
    sepetEkle[9].addEventListener("click", addItemStorage);
    sepetEkle[10].addEventListener("click", addItemStorage);
    sepetEkle[11].addEventListener("click", addItemStorage);
    sepetEkle[12].addEventListener("click", addItemStorage);
    sepetEkle[13].addEventListener("click", addItemStorage);
    sepetEkle[14].addEventListener("click", addItemStorage);
    sepetEkle[15].addEventListener("click", addItemStorage);
    sepetEkle[16].addEventListener("click", addItemStorage);
    sepetEkle[17].addEventListener("click", addItemStorage);
    sepetEkle[18].addEventListener("click", addItemStorage);
    sepetEkle[19].addEventListener("click", addItemStorage);
    sepetEkle[20].addEventListener("click", addItemStorage);
    sepetEkle[21].addEventListener("click", addItemStorage);
    sepetEkle[22].addEventListener("click", addItemStorage);
    sepetEkle[23].addEventListener("click", addItemStorage);
    sepetEkle[24].addEventListener("click", addItemStorage);
    sepetEkle[25].addEventListener("click", addItemStorage);
    sepetEkle[26].addEventListener("click", addItemStorage);
    sepetEkle[27].addEventListener("click", addItemStorage);
    sepetEkle[28].addEventListener("click", addItemStorage);
    sepetEkle[29].addEventListener("click", addItemStorage);
    sepetEkle[30].addEventListener("click", addItemStorage);

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
    if (confirm("Bu ürünü sepetten çıkarmak istediğinize emin misiniz?")) {
        while (urunList.firstChild !== null) {
            urunList.removeChild(urunList.firstChild);
        }
        localStorage.removeItem("items");
    }
}

function deleteItem(e) {
    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deleteItemsStorage(e.target.parentElement.parentElement.textContent.trim());
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
    showAlert("success", "Ürün Sepete Eklendi");
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

    alerturun.appendChild(alert);

    // setTimeout
    setTimeout(function () {
        alert.remove();
    }, 800);

}
