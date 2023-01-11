var book_name = document.getElementById("book_name");
var book_cat = document.getElementById("book_cat");
var user_name = document.getElementById("user_name");
var book_price = document.getElementById("book_price");
var book_vol = document.getElementById("book_vol");
var borrowing_date = document.getElementById("borrowing_date");
var return_date = document.getElementById("return_date");
var add = document.getElementById("add");
var data = document.getElementById("input_data");
var delete_all = document.getElementById("delete_all");
var search = document.getElementById("search");
var books;
if (JSON.parse(localStorage.getItem("BOOKS")) == null) {
    books = [];
}
else {
    books = JSON.parse(localStorage.getItem("BOOKS"));
    dis_data();
}
var current_index=0;


//done when click on the add button.
add.onclick = function (e) {
    e.preventDefault();
    if (add.value == "Add Book") {
        make_ob();
        empty_val();
        dis_data();
    }
    else {
        update_book();
    }

    book_name.classList.remove("is-valid");
    book_cat.classList.remove("is-valid");
    user_name.classList.remove("is-valid");
    book_price.classList.remove("is-valid");
    book_vol.classList.remove("is-valid");

};

// put all specifications in one object then put the object in array.
function make_ob() {
    var book = {
        book_name: book_name.value,
        book_cat: book_cat.value,
        user_name: user_name.value,
        book_price: book_price.value,
        book_vol: book_vol.value,
        borrowing_date: borrowing_date.value,
        return_date: return_date.value
    };
    books.push(book); // array of objects. 
    console.log(books);
    localStorage.setItem("BOOKS", JSON.stringify(books));
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your book has been saved',
        showConfirmButton: false,
        timer: 1500
    });
};

// to empty the input values after adding the object.
function empty_val() {
    book_name.value = "";
    book_cat.value = "";
    user_name.value = "";
    book_price.value = "";
    book_vol.value = "";
    borrowing_date.value = "";
    return_date.value = "";
}

// to display data in table
function dis_data() {
    var result = '';
    for (var i = 0; i < books.length; i++) {
        result += `
     <tr>
          <td>${i + 1}</td>
          <td>${books[i].book_name}</td>
          <td>${books[i].book_cat}</td>
          <td>${books[i].user_name}</td>
          <td>${books[i].book_price}</td>
          <td>${books[i].book_vol}</td>
          <td>${books[i].borrowing_date}</td>
          <td>${books[i].return_date}</td>
          <td><button class="btn btn-outline-info" onclick="up_book(${i})">Update</button></td>
          <td><button class="btn btn-outline-danger" onclick="del_book(${i})">Delete</button></td>
     </tr>
     `
    }
    data.innerHTML = result;
};
// to delete data from table
function del_book(index) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'

    }).then((result) => {
        if (result.isConfirmed) {
            books.splice(index, 1);
            localStorage.setItem("BOOKS", JSON.stringify(books));
            dis_data();
            Swal.fire(
                'Deleted!',
                'Your book has been deleted.',
                'success'
            )
        }
    })
};

// to delete all data in table
delete_all.onclick = function () {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'

    }).then((result) => {
        if (result.isConfirmed) {
            books = [];
            data.innerHTML = '';
            localStorage.setItem("BOOKS", JSON.stringify(books));
            Swal.fire(
                'Deleted!',
                'Your books have been deleted.',
                'success'
            )
        }
    })
};

// search
search.onkeyup = function () {
    var result = '';
    for (var i = 0; i < books.length; i++) {
        if (books[i].book_name.toLowerCase().includes(search.value.toLowerCase()))
            result += `
     <tr>
          <td>${i + 1}</td>
          <td>${books[i].book_name}</td>
          <td>${books[i].book_cat}</td>
          <td>${books[i].user_name}</td>
          <td>${books[i].book_price}</td>
          <td>${books[i].book_vol}</td>
          <td>${books[i].borrowing_date}</td>
          <td>${books[i].return_date}</td>
          <td><button class="btn btn-outline-info">Update</button></td>
          <td><button class="btn btn-outline-danger" onclick="del_book(${i})">Delete</button></td>
     </tr>
     `
    }
    data.innerHTML = result;

};

// when click on update button the data will display in the form
function up_book(index) {
    var book = books[index];
    book_name.value = book.book_name;
    book_cat.value = book.book_cat;
    user_name.value = book.user_name;
    book_price.value = book.book_price;
    book_vol.value = book.book_vol;
    borrowing_date.value = book.borrowing_date;
    return_date.value = book.return_date;
    add.value = "Update Book";
    add.classList.add("btn-info");
    current_index = index;
};

// update
function update_book() {
    var book = {
        book_name: book_name.value,
        book_cat: book_cat.value,
        user_name: user_name.value,
        book_price: book_price.value,
        book_vol: book_vol.value,
        borrowing_date: borrowing_date.value,
        return_date: return_date.value
    }
    books[current_index].book_name = book.book_name;
    books[current_index].book_cat = book.book_cat;
    books[current_index].user_name = book.user_name;
    books[current_index].book_price = book.book_price;
    books[current_index].book_vol = book.book_vol;
    books[current_index].borrowing_date = book.borrowing_date;
    books[current_index].return_date = book.return_date;

    
    localStorage.setItem("BOOKS", JSON.stringify(books));
    add.value = "Add Book";
    add.classList.remove("btn-info");
    dis_data();
    empty_val();
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your book has been updated',
        showConfirmButton: false,
        timer: 1500
    })

}
// Creat Read Update Delete is done!
// CRUD is Done
/**********************************/

// validation

//book_name validation
book_name.onkeyup = function () {
    var pattern = /^[A-Z][a-z]{2,10}$/;

    if (pattern.test(book_name.value)) {
        if (book_name.classList.contains("is-invalid")) {
            book_name.classList.replace("is-invalid", "is-valid");
        }
        else {
            add.removeAttribute("disabled");
            book_name.classList.add("is-valid");
        }
    }
    else {
        if (book_name.classList.contains("is-valid")) {
            book_name.classList.replace("is-valid", "is-invalid");
        }
        else {
            add.setAttribute("disabled", "disabled");
            book_name.classList.add("is-invalid");
        }
    };
};
//end

//book_cat validation
book_cat.onkeyup = function () {
    var pattern = /^[A-Z][a-z]{2,10}$/;

    if (pattern.test(book_cat.value)) {
        if (book_cat.classList.contains("is-invalid")) {
            book_cat.classList.replace("is-invalid", "is-valid");
        }
        else {
            add.removeAttribute("disabled");
            book_cat.classList.add("is-valid");
        }
    }
    else {
        if (book_cat.classList.contains("is-valid")) {
            book_cat.classList.replace("is-valid", "is-invalid");
        }
        else {
            add.setAttribute("disabled", "disabled");
            book_cat.classList.add("is-invalid");
        }
    };
};
//end

//user_name validation
user_name.onkeyup = function () {
    var pattern = /^[A-Za-z]+([\ A-Za-z]+)$/;

    if (pattern.test(user_name.value)) {
        if (user_name.classList.contains("is-invalid")) {
            user_name.classList.replace("is-invalid", "is-valid");
        }
        else {
            add.removeAttribute("disabled");
            user_name.classList.add("is-valid");
        }
    }
    else {
        if (user_name.classList.contains("is-valid")) {
            user_name.classList.replace("is-valid", "is-invalid");
        }
        else {
            add.setAttribute("disabled", "disabled");
            user_name.classList.add("is-invalid");
        }
    };
};
//end

//book_price validation
book_price.onkeyup = function () {
    var pattern = /^[0-9]{1,3}$/;

    if (pattern.test(book_price.value)) {
        if (book_price.classList.contains("is-invalid")) {
            book_price.classList.replace("is-invalid", "is-valid");
        }
        else {
            add.removeAttribute("disabled");
            book_price.classList.add("is-valid");
        }
    }
    else {
        if (book_price.classList.contains("is-valid")) {
            book_price.classList.replace("is-valid", "is-invalid");
        }
        else {
            add.setAttribute("disabled", "disabled");
            book_price.classList.add("is-invalid");
        }
    };
};
//end
//book_vol validation
book_vol.onkeyup = function () {
    var pattern = /^[0-9]{1,4}$/;

    if (pattern.test(book_vol.value)) {
        if (book_vol.classList.contains("is-invalid")) {
            book_vol.classList.replace("is-invalid", "is-valid");
        }
        else {
            add.removeAttribute("disabled");
            book_vol.classList.add("is-valid");
        }
    }
    else {
        if (book_vol.classList.contains("is-valid")) {
            book_vol.classList.replace("is-valid", "is-invalid");
        }
        else {
            add.setAttribute("disabled", "disabled");
            book_vol.classList.add("is-invalid");
         }
        };
    };
//end

