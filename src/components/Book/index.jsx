import Heart_Black from '../../assets/images/Heart_Black.png'
import Heart_Red from '../../assets/images/Heart_Red.png'
import Book_Black from '../../assets/images/Book_Black.png'
import Book_Red from '../../assets/images/Book_Red.png'


const Book = (props) => {



  return (
    <div className="book">
      <div className="book-title">
        <h4>{props.title}</h4>
        <div className="book-buttons">
          <button className="btn-to-read-list"  onClick={(e) => props.bookToRead(e)}>
            {props.toRead === false ?
              <img src={Book_Black} alt="Book Black" data-index={props.index}/>
              :
              <img src={Book_Red} alt="Book Red" data-index={props.index}/>
            }
          </button>
         
          <button className="btn-to-favorites" onClick={(e) => props.toFavorites(e)}>
            {props.favorite === false ? 
              <img src={Heart_Black} alt="Heart Black" data-index={props.index} />
              : 
              <img src={Heart_Red} alt="Heart Red" data-index={props.index} />
            }
          
          </button>
        </div>
      </div>
      
      <div className="book-image">
        <img src={props.thumb} alt={props.title} />
      </div>
      <div className="book-desc">
      <p className="description">{props.descShort || props.descLong || "no description "}</p>
      </div> 
    </div>
  )
}

export default Book