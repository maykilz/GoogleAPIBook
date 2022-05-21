let bookname; 

bookname = document.getElementsByClassName('bookname')[0];
var getHTTTP = new XMLHttpRequest(); 
var searchbook = document.getElementsByClassName('booksearch')[0];  
let bookslist = document.getElementsByClassName('bookslist')[0]; 
console.log(bookslist); 
let responseBook; 
let bookHTML;

let Search = function( ) { 
        bookname = document.getElementsByClassName('bookname')[0];

        getHTTTP.open("GET", "https://www.googleapis.com/books/v1/volumes?q=" + bookname.value, true); 
        getHTTTP.onreadystatechange =() => {
             if (getHTTTP.readyState ==4)  {
                responseBook  = getHTTTP.responseText; 
                let mytext = JSON.parse(responseBook);  
                for (let i=0; i< 10; i++) {  
                    if (mytext.items[i].volumeInfo.imageLinks.smallThumbnail.lenght !="" ) {
                        bookHTML= `    <div class="book"> <br> <img src=" ${mytext.items[i].volumeInfo.imageLinks.smallThumbnail}" alt=""></img> `; 
                    }
                    else {
                        bookHTML= `    <div class="book"> <span>Картинка не прогрузилась </span> `; 
                 }
                    bookslist.innerHTML +=  bookHTML+ `<br> <span>${mytext.items[i].volumeInfo.title}</span>  <br> <a href="${mytext.items[i].volumeInfo.previewLink}" target="_blank">Посмотреть книгу</a>             </div>`; 
              
                }
             }
        }
        getHTTTP.send();  
    
}

searchbook.addEventListener('click',function() {
    Search(); 
}); 

bookname.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
      Search()
    }
})