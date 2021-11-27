import { Link } from "react-router-dom";

export default function BookSummary(props) {
    // props
    // year
    // desc
    // isbn
    return (
        <div className="book-summary">
            <div>
            </div>
            <div>{props.year}</div>
            <div>{props.desc}...</div>
            <Link to={`books/${props.isbn13}`}>Read more</Link>
        </div>
    )
}