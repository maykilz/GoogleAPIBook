let bookname; 

bookname = document.getElementsByClassName('bookname')[0];
var getHTTTP = new XMLHttpRequest(); 
var searchbook = document.getElementById('booksearch');  
let bookslist = document.getElementsByClassName('bookslist')[0];  
let bookclear = document.getElementById('bookclear');  
let responseBook; 
let bookHTML;

let Search = function( ) { 
        bookname = document.getElementsByClassName('bookname')[0];
        if (bookname.value.length > 0) { 
            getHTTTP.open("GET", "https://www.googleapis.com/books/v1/volumes?q=" + bookname.value, true); 
            getHTTTP.onreadystatechange =() => {
                 if (getHTTTP.readyState ==4)  {
                    responseBook  = getHTTTP.responseText; 
                    let mytext = JSON.parse(responseBook);   
                    for (let i=0; i< 10; i++) {  
                        if (mytext.items[1].volumeInfo.imageLinks.smallThumbnail.length> 0 ) {
                            bookHTML= `    <div class="book"> <br> <img src=" ${mytext.items[i].volumeInfo.imageLinks.smallThumbnail}" alt=""></img> `; 
                            bookslist.innerHTML +=  bookHTML+ `<br> <span>${mytext.items[i].volumeInfo.title}</span>  <br> <a href="${mytext.items[i].volumeInfo.previewLink}" target="_blank">Посмотреть книгу</a>             </div>`; 
                              
                                } 
                                else {  
                                 bookHTML= "Картинка  не найдена"; 
                                 bookslist.innerHTML +=  bookHTML+ `<br> <span>${mytext.items[i].volumeInfo.title}</span>  <br> <a href="${mytext.items[i].volumeInfo.previewLink}" target="_blank">Посмотреть книгу</a>             </div>`; 
                              
                            }  
                    }
                 }
            }
            getHTTTP.send();  
        }
        else  {
            alert('Ошибка введите корректное имя книги'); 
        }
    
}

searchbook.addEventListener('click',function() {
    Search(); 
}); 

bookname.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
      Search()
    }
})


bookclear.addEventListener('click', function() {
    bookHTML = ""; 
    bookslist.innerHTML = "";
    responseBook= "";  
})