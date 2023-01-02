var book_name = document.getElementById("book_name");
var book_cat = document.getElementById("book_cat");
var book_price = document.getElementById("book_price");
var book_vol = document.getElementById("book_vol");
var borrowing_date = document.getElementById("borrowing_date");
var return_date = document.getElementById("return_date");
var add = document.getElementById("add");
var data = document.getElementById("input_data");
var delete_all = document.getElementById("delete_all");
var search = document.getElementById("search");
var books = [];

//done when click on the add button.
add.onclick = function (e) {
    e.preventDefault();
    make_ob();
    empty_val();
    dis_data();

};

// put all specifications in one object then put the object in array.
function make_ob() {
    var book = {
        book_name: book_name.value,
        book_cat: book_cat.value,
        book_price: book_price.value,
        book_vol: book_vol.value,
        borrowing_date: borrowing_date.value,
        return_date: return_date.value
    };
    books.push(book); // array of objects. 
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your book has been saved',
        showConfirmButton: false,
        timer: 1500
    })
};

// to empty the input values after adding the object.
function empty_val() {
    book_name.value = "";
    book_cat.value = "";
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
            Swal.fire(
                'Deleted!',
                'Your books have been deleted.',
                'success'
            )
        }
    })
};

// search
search.onkeyup = function(){
    var result = '';
    for (var i = 0; i < books.length; i++) {
        if (books[i].book_name.toLowerCase().includes(search.value.toLowerCase()))
        result += `
     <tr>
          <td>${i + 1}</td>
          <td>${books[i].book_name}</td>
          <td>${books[i].book_cat}</td>
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

}
