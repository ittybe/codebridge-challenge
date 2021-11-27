import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getBookByISBN, getBookFullDesc } from "../api/itbookApi";
import { Link } from "react-router-dom";

function Book(props) {
    const [bookData, setBookData] = useState({
        "authors": "",
        "title": "",
        "subtitle": "",
        "isbn13": "",
        "year":"",
        "pages": "",
        "desc": "",
        "price": "",
        "imageUrl": "",
        "url": "",
    })
    // const [bookFullDesc, setBookFullDesc] = useState("")
    
    const params = useParams()

    useEffect(() => {
        getBookByISBN(params.isbn13).then(
            (res) => {
                setBookData(res)
            }
        )
        // getBookFullDesc(params.isbn13).then(
        //     (res)=> {
        //         setBookFullDesc(res)
        //     }
        // )
    }, [])

    return (
        <div>
            <div>
                {bookData.title}
            </div>
            <div>
                {bookData.desc}
            </div>
            {/* <a href={bookData.url}>
                full description 
            </a> */}
            <Link to="/codebridge-challenge">Go to home page</Link>
        </div>
    )    
}

// class Book extends React.Component {
//     constructor(props) {
//         super(props)
//         const isbn13 = this.props.match.isbn13
//         console.log(isbn13)
//     }
//     render() {
//         return (
//             <div>

//             </div>
//         )
//     }
// }

export default Book;