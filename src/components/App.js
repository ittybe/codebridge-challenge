import './App.css';
import {getListOfNewReleasedBooks} from "../api/itbookApi.js"
import BookSummary from './BookSummary';
import React, { useState } from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      booksSummaries: []
    }
    
  }
  componentDidMount() {
    getListOfNewReleasedBooks()
    .then((res) => {
      this.setState({booksSummaries: res})
      console.log(res)
    })
    .catch((error) => {
      console.log(error)
    }) 
  }
  render() {
    return (
      <div className="App">
      <div>
        <input type="text"/>
      </div>
      <div>
        {
          this.state.booksSummaries.map((book, i) => {
            return <BookSummary key={book.isbn13} imageUrl={book.imageUrl} year={book.year} desc={book.desc.slice(0, 101)} isbn13={book.isbn13}/>
          })
        }
      </div>
    </div>
    )
  }
}

export default App;
