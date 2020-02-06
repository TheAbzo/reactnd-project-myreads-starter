import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookComponent from './BookComponent'


class SearchComponent extends Component {
  static propTypes = {
    // bookShelfTitle: PropTypes.string.isRequired,
    
  }
  state = {
    query: '',
    books:[],
  }


  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim(),
    })
    )
    if(query !== ""){
        // console.log("hiiii",query, "a ",query.length)
        BooksAPI.search(query)
      .then((booksResponse) => { //success message, has property called shelf
        if(query !== "" && query.length >= 1){
            this.setState(() => ({ 
                books: booksResponse }))
        }       
      })
      }else{
        this.setState(() => ({ 
            books: null }))
      }
      
  }


  updateParent(book,shelf){
    // this.props.updateGrandParent(book,shelf)
}


  render() {
    const { query,books } = this.state

    console.log(books)
    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to='/'>Close</Link>
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author"
                    onChange={(event) => this.updateQuery(event.target.value)}  />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {
                          (query !== "") &&(books != null) && !(books.hasOwnProperty('error'))&&
                         books.map((book) => (
                            <li key={book.id}>
                             <BookComponent
                               title = {book.title}
                               author =  {book.hasOwnProperty('authors')? book.authors:[]}
                               backgroundImageURI = {book.hasOwnProperty('imageLinks')? book.imageLinks.thumbnail:""}
                               shelf = "none"
                               updateParent ={this.updateParent.bind(this)}
                               id = {book.id}   
                             />     
                            </li> 
                         ))               
                    }                 
                </ol>
            </div>
        </div>
    )
  }
}
export default SearchComponent
