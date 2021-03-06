import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookComponent from './BookComponent'


class ShelfComponent extends Component {
	static propTypes = {
		bookShelfTitle: PropTypes.string.isRequired,
		shelfType: PropTypes.string.isRequired,
		books: PropTypes.array.isRequired,
		updateGrandParent:PropTypes.func.isRequired,
	}


	updateParent(book,shelf){
		this.props.updateGrandParent(book,shelf)
	}


	render() {
		const { bookShelfTitle,shelfType,books } = this.props

		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{bookShelfTitle}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
					{books.filter((category) =>  {
					return category.shelf === shelfType})
						.map((book) => (
						<li key={book.id}>
							<BookComponent
								title = {book.title}
								author = {book.authors}
								backgroundImageURI = {book.imageLinks.smallThumbnail}
								shelf = {shelfType}
								updateParent ={this.updateParent.bind(this)}
								id = {book.id}   
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
