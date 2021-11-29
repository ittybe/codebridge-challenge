import './App.css';
import { getListOfNewReleasedBooks } from "../api/itbookApi.js"
import BookSummary from './BookSummary';
import React, { useState } from 'react';
import { TextField } from '@mui/material';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      booksSummaries: [],
      booksToDisplay: undefined, // contains id and search matches index 
      searchQuery: ""
    }
  }
  componentDidMount() {
    getListOfNewReleasedBooks()
      .then((res) => {
        this.setState({ booksSummaries: res })
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  handleSubmit(e) {
    e.preventDefault();
    const countOfMatches = (word, str) => {
      const re = new RegExp(`\\b${word}\\b`, "gi");
      return ((str || '').match(re) || []).length
    }
    // split search query by words
    const q = this.state.searchQuery;
    const words = q.split(" ").filter((word) => word !== "");
    let result = []
    // go through books Summaries array
    for (let i = 0; i < this.state.booksSummaries.length; i++) {
      const bookSummary = this.state.booksSummaries[i];
      let index = 0;
      // check book summary title for having keywords (each keyword in title gives plus 2)
      let indexTitle = 0;
      words.forEach(word => {
        indexTitle += countOfMatches(word, bookSummary.title)
      });
      // check book summary description for having keywords (each keyword in title gives plus 1)
      let indexDesc = 0;
      words.forEach(word => {
        indexDesc += countOfMatches(word, bookSummary.desc.slice(0, 101))
      });
      // save search matches index with Id 
      index += indexDesc + (indexTitle * 2)
      // after checking add [id, index] pair into state
      result.push({
        "isbn13": bookSummary.isbn13,
        "index": index
      })
    }
    // sort by index value 
    result.sort((a, b) => b.index - a.index)
    result = result.filter((elem) => {
      return elem.index > 0;
    })
    this.setState({
      booksToDisplay: result
    })
  }
  handleChange(e) {
    this.setState({
      searchQuery: e.target.value
    })
  }
  getBookSummaries() {
    if (this.state.booksToDisplay === undefined) {
      return this.state.booksSummaries
    }
    else {
      const result = []
      const booksSummaries = this.state.booksSummaries;
      this.state.booksToDisplay.forEach(bookIndex => {
        const bookSummary = booksSummaries.find(elem => elem.isbn13 === bookIndex.isbn13)
        result.push(bookSummary)
      });
      return result;
    }
  }
  render() {
    return (
      <div className="app">
        <div className="app__search">
          <form action="" onSubmit={(e) => this.handleSubmit(e)} className="app-form">
            <TextField className="app-form__text-field" sx={{width: "40%", boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'}} label="search for keywords" color="primary" variant="outlined" onChange={(e) => this.handleChange(e)} />
          </form>
        </div>
        <div className="app__results-count">
          Results: {this.getBookSummaries().length}
        </div>
        <div className="app__books-summaries">
          {
            this.getBookSummaries().map((book, i) => {
              return <BookSummary
                key={book.isbn13}
                searchQuery={this.state.searchQuery}
                title={book.title}
                imageUrl={book.imageUrl}
                year={book.year}
                desc={book.desc.slice(0, 101)}
                isbn13={book.isbn13} />
            })
          }
        </div>
      </div>
    )
  }
}

export default App;
