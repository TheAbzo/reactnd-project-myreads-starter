import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookComponent from './BookComponent'
import ShelfComponent from './ShelfComponent';


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    updateApp: {},
    showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((booksResponse) => { //success message, has property called shelf
        this.setState(() => ({  books: booksResponse }))
      })}

      // function in parent that will make ajax request and change it's state
  updateApp(book,shelf){
    BooksAPI.update(book,shelf)
    .then((booksResponse) => { //success message, has property called shelf
      BooksAPI.getAll()
      .then((booksResponse) => { //success message, has property called shelf
        this.setState(() => ({  books: booksResponse }))
      })
    })}
      
  render() {
      // console.log(this.state.books)

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
               
              <ShelfComponent
              bookShelfTitle = "Currently Reading"
              books = {this.state.books}
              shelfType = "currentlyReading"
              updateGrandParent = {this.updateApp.bind(this)}
              />
              <ShelfComponent
              bookShelfTitle = "Want to Read"
              books ={this.state.books}
              shelfType ="wantToRead"
              updateGrandParent = {this.updateApp.bind(this)}
              />
              <ShelfComponent
                bookShelfTitle = "Read"
                books = {this.state.books}
                shelfType = "read" 
                updateGrandParent = {this.updateApp.bind(this)}
              />
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
