import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


class BookComponent extends Component {
  static propTypes = {
    backgroundImageURI: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.array.isRequired,
  }
  state = {
    bookShelfState: ''
  }

  render() {
    const { backgroundImageURI,title,author } = this.props

    console.log(backgroundImageURI)

    return (
    <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${backgroundImageURI})` }}></div>
          <div className="book-shelf-changer">
            <select>
                {/* each value of these will  change the state */}
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