import axios from "axios";

export async function getListOfNewReleasedBooks() {
    // returns Array obj with books
    const q = `https://api.itbook.store/1.0/new`;

    try {
        const res = await axios.get(q);
        if ("books" in res.data) {
            const result = []
            for (let i = 0; i < res.data.books.length; i++) {
                const book = res.data.books[i];
                const bookByISBN = await getBookByISBN(book.isbn13)
                if (bookByISBN) {
                    result.push(bookByISBN)
                }
                else {
                    console.log(`the book is not added ${book.isbn13} ${book}`)
                }
            }
            return result;
        }
    } catch (error) {
        console.error(error)
    }
}

export async function getBookByISBN(isbn13) {
    const q = `https://api.itbook.store/1.0/books/${isbn13}`;
    try {
        const res = await axios.get(q);
        if (res.data.error === "0") {
            const { authors, title, subtitle, isbn13, year, pages, desc, price, image, url } = res.data;
            return {
                "authors": authors,
                "title": title,
                "subtitle": subtitle,
                "isbn13": isbn13,
                "year": year,
                "pages": pages,
                "desc": desc,
                "price": price,
                "imageUrl": image,
                "url": url,
            }
        }
    } catch (error) {
        console.error(error)
    }
}

export async function getBookFullDesc(isbn13) {
    const stringToHtmlDom = (str) => {
        var parser = new DOMParser();
        var doc = parser.parseFromString(str, 'text/html');
        return doc;
    }
    const q = `https://itbook.store/books/${isbn13}`
    const descId = "desc"
    try {
        const res = await axios.get(q);
        const dom = stringToHtmlDom(res.data);
        const desc = dom.getElementById(descId);
        return desc.textContent;
    } catch (error) {
        console.error(error)
    }
    
}