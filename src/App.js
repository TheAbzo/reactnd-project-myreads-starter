import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ShelfComponent from './ShelfComponent'
import SearchComponent from './SearchComponent'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'



class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
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

    return (
      <div className="app">
      

      <Route exact path='/search' render={() => (
        <SearchComponent/>
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
           className="open-search"
           to='/search' > Add a book</Link>
         
         </div>
       )}
        />
     
       
        
      </div>
    )
  }
}

export default BooksApp
