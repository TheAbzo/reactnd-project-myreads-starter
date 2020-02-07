import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ShelfComponent from './ShelfComponent'
import SearchComponent from './SearchComponent'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
    books: [],
  }


  componentDidMount() {
    BooksAPI.getAll()
      .then((booksResponse) => { 
        this.setState(() => ({  books: booksResponse }))
  })}


  updateApp(book,shelf){
    BooksAPI.update(book,shelf)
    .then((booksResponse) => { 
      BooksAPI.getAll()
      .then((booksResponse) => { 
        this.setState(() => ({  books: booksResponse }))
      })
  })}
      

  render() {

    return (
    <div className="app">
      <Route exact path='/search' render={() => (
        <SearchComponent
        booksOnShelves = {this.state.books}
        updateGrandParent = {this.updateApp.bind(this)}/>
      )} />

      <Route exact path='/' render={() => (
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
          <Link 
            className="open-search-button"
            to='/search' > Add a book
          </Link>      
        </div>
      )}
      />    
    </div>
    )
  }
}
export default BooksApp
