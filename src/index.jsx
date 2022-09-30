import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Book from './components/Book'
import './style.css';


const url = 'https://gist.githubusercontent.com/MathisDYKDan/76bc73ec77481ccb82677cc7c0d8b524/raw/a23c99027b9bfc1bfdb22e22ddcb4301a5f870ee/books.json'

const App = () => {

  const [booksArray, setBooksArray] = useState([])
  const [lastBookArray, setLastBookArray] = useState([])

  const [favorites, setFavorites] = useState([])
  const [read, setRead] = useState([])
  const [searchInput, setSearchInput] = useState([])

  const [searchedByFavorites, setSearchedByFavorites] = useState(false)
  const [searchedByToRead, setSearchedByToRead] = useState(false)
  

  const getData = async () => {
    const response = await fetch(url)
    const data = await response.json()
    return data.books[0]
  }

  const bookToRead = (e) => {
    let res = booksArray[e.target.dataset.index]
    if  ( booksArray[e.target.dataset.index].toRead === false )
      res.toRead = true
    else 
    res.toRead = false
    setRead([...read, e.target.dataset.index])
  }

  const toFavorites = (e) => {
    let res = booksArray[e.target.dataset.index]
    if  ( booksArray[e.target.dataset.index].favorite === false )
      res.favorite = true
    else 
    res.favorite = false
    setFavorites([...favorites, e.target.dataset.index])
  }

  useEffect(() => {
  }, [setFavorites, setRead])



 

  useEffect(() => {
    getData().then((books) => {
      let results = [];
      books.forEach((book) => {
        results.push({
          title: book.title,
          descLong: book.longDescription,
          descShort: book.shortDescription,
          thumb: book.thumbnailUrl,
          favorite: false,
          toRead: false
        })
      })

      setBooksArray(results)
      setLastBookArray(results)
    })
  }, [])
  






  useEffect(() => {
    console.log('hi')
    console.log(searchInput)

    let res = []

    booksArray.forEach((book) => {
      if (book.title.includes(searchInput) || book.title.includes(capitalizeFirstLetter(searchInput)))
        res.push(book)
    })

    console.log(res)

    setLastBookArray(res)
    //setSearchArray()

    
  }, [searchInput])

  
  const displayFavorites = (e) => {
    if (searchedByFavorites === false) {
      setSearchedByFavorites(true)
      e.target.classList.toggle('active')
    }
    else {
      setSearchedByFavorites(false)
      e.target.classList.toggle('active')
    }

  }

  useEffect(() => {
    let res = []

    if (searchedByFavorites === true && searchedByToRead === true) {
      booksArray.forEach((book) => {
        if (book.favorite === true && book.toRead === true)
          res.push(book)
      })
      setLastBookArray(res)
    } else if (searchedByFavorites === true && searchedByToRead === false) {
      booksArray.forEach((book) => {
        if (book.favorite === true)
          res.push(book)
      })
      setLastBookArray(res)
    } else if (searchedByFavorites === false && searchedByToRead === true) {
      booksArray.forEach((book) => {
        if ( book.toRead === true)
          res.push(book)
      })
      setLastBookArray(res)
    } else if (searchedByFavorites === false && searchedByToRead === false) {
      booksArray.forEach((book) => {
          res.push(book)
      })
      setLastBookArray(res)
    }
    
  }, [searchedByFavorites, searchedByToRead])

  const displayToRead = (e) => {
    console.log(e)
    if (searchedByToRead === false) {
      setSearchedByToRead(true)
      e.target.classList.toggle('active')
    }

    else {
      e.target.classList.toggle('active')
      setSearchedByToRead(false)
    }
  }


  useEffect(() => {
    let res = []

    
    
  }, [searchedByToRead])
  



  /*
     {booksArray.length > 0 ? booksArray.map((book) => (
        <p>{book.title}</p>
      )) : ""}

      */

  return (
    <div className="app">
      <h2> Books app</h2>
      <input
        type="search"
        placeholder="search for a book .."
        value={searchInput}
        onChange={(e)=>  setSearchInput(e.target.value)}
      />
      <button className="btn-toggle btn-favorites" onClick={(e)=>displayFavorites(e)}>favorites</button>
      <button className="btn-toggle btn-to-read" onClick={(e)=>displayToRead(e)}>to read</button>
      
      <div className="books-container">
      {lastBookArray.length > 0 ? lastBookArray.map((book, index) => (
        <Book
          title={book.title}
          descShort={book.descShort}
          descLong={book.descLong}
          thumb={book.thumb}
          favorite={book.favorite}
          toRead={book.toRead}
          toFavorites={toFavorites}
          bookToRead={bookToRead}
          index={index}
        />
      )) : ""}
      </div>

    </div>
  )
}


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


ReactDOM.render(<App />, document.getElementById('root'));