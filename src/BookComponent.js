import React, { Component } from 'react'
import PropTypes from 'prop-types'


class BookComponent extends Component {
  static propTypes = {
    backgroundImageURI: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.array,
    shelf:  PropTypes.string.isRequired,
    updateParent: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
  }


    handleChange(event){
        const myObject = {
          id: this.props.id
      };
      this.props.updateParent(myObject,event.target.value)
  }


  render() {
    const { backgroundImageURI,title,author,shelf } = this.props

    
    return (
    <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${backgroundImageURI})` }}></div>
          <div className="book-shelf-changer">
            <select value = {shelf} onChange={this.handleChange.bind(this)}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{author.join(' & ')}</div>
    </div>
    )
  }
}
export default BookComponent