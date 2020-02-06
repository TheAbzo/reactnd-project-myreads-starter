import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookComponent from './BookComponent'



class ShelfComponent extends Component {
  static propTypes = {
    bookShelfTitle: PropTypes.string.isRequired,
    shelfType: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
  }
//   state = {
//     bookShelfState: ''
//   }

  render() {
    const { bookShelfTitle,shelfType,books } = this.props
 

    return (
        <div className="bookshelf">
        <h2 className="bookshelf-title">{bookShelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">

          {books.filter((category) =>  { console.log (category.shelf) 
          return category.shelf === shelfType})
            .map((book) => (
             <li key={book.id}>
              <BookComponent
                title = {book.title}
                author = {book.authors}
                backgroundImageURI = {book.imageLinks.smallThumbnail}
              />     
             </li> 
          ))}
          </ol>
        </div>
        </div> 
    )
  }
}
export default ShelfComponent
