{
  'use strict';

  class BooksList {

    constructor(){
      this.initData();
      this.getElements();
      this.render();
      this.initActions();
    }

    initData(){
      this.data = dataSource.books;
      this.favoriteBook = [];
      this.filters = [];
    }

    getElements(){
      this.html_books = document.querySelector('.books-list');
      this.html_filters = document.querySelector('.filters');
    }

    render(){
      for(let book of this.data){
        book.ratingColor = this.ratingBooks(book.rating);
        book.ratingWidth = book.rating * 10;
        const generatedHTMLstring = Handlebars.compile(document.querySelector('#template-book').innerHTML)(book);
        const elementDomHTML = utils.createDOMFromHTML(generatedHTMLstring);
        this.html_books.appendChild(elementDomHTML);
      }
    }

    ratingBooks(rating){
      if(rating <= 6){return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';}
      if(rating > 6 && rating <=8){return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';}
      if(rating > 8 && rating <=9){return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';}
      if(rating > 9){return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';}
    }

    initActions(){
      const thisObj = this;

      this.html_books.addEventListener('dblclick', function(event){
        event.preventDefault();
        thisObj.favouriteBooks(event.target.offsetParent);
      });

      this.html_filters.addEventListener('click', function(event){
        thisObj.filterBooks(event.target);
      });
    }

    favouriteBooks(clickedElem){
      if(clickedElem.classList.contains('book__image')){
        const favoriteOnOff = clickedElem.classList.toggle('favorite');
        if (favoriteOnOff) {
          this.favoriteBook.push(clickedElem.getAttribute('data-id'));
        }else{
          this.favoriteBook.splice(this.favoriteBook.indexOf(clickedElem.getAttribute('data-id'),1));
        }
      }
    }

    filterBooks(clickedElem){
      if(clickedElem.tagName === 'INPUT' && clickedElem.type === 'checkbox' && event.target.name === 'filter'){
        if(clickedElem.checked){
          this.filters.push(clickedElem.value);
        }else{
          this.filters.splice(this.filters.indexOf(clickedElem.value, 1));
        }
        for(let book of this.data){
          let shouldBeHidden = false;
          for(let filter of this.filters){
            if (book.details[filter]){
              shouldBeHidden = true;
            }
          }
          const findBook = this.html_books.querySelector('a[data-id="' + book.id + '"]');
          if (shouldBeHidden){
            findBook.classList.add('hidden');
          }else{
            findBook.classList.remove('hidden');
          }
        }
      }
    }

  }

  const app = new BooksList();
}
