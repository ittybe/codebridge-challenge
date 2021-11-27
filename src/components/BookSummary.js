import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
export default function BookSummary(props) {
    // props
    // year
    // desc
    // title
    // isbn
    // searchQuery
    const findKeywords = ({
        autoEscape,
        caseSensitive,
        sanitize,
        searchWords,
        textToHighlight
    }) => {
        const chunks = [];
        if (searchWords.length > 0) {
            const getRegexFromWord = (word) => {
                const re = new RegExp(`\\b${word}\\b`, "gi");
                return re;
            }
            var match = undefined;
            searchWords.forEach(word => {
                if (word !== "") {
                    const re = getRegexFromWord(word)
                    while ((match = re.exec(textToHighlight)) != null) {
                        let start = match.index;
                        let end = match.index + word.length;
                        if (chunks.length > 0) {
                            if (start - 1 === chunks[chunks.length - 1].end) {
                                chunks[chunks.length - 1].end = end
                            }
                            else {
                                chunks.push({
                                    start, end
                                })
                            }
                        }
                        else {
                            chunks.push({
                                start, end
                            })
                        }
                    }
                }
            });
            // let spaceChunks = []
            // chunks.forEach(chunki => {
            //     chunks.forEach(chunkj => {
            //         if(chunki.start - 2 === chunkj.end) {
            //             let start = chunkj.end; 
            //             let end = chunki.start;
            //             spaceChunks.push( {
            //                 start, end
            //             } )
            //         }
            //     });
            // });
            // chunks.concat(spaceChunks);
        }
        return chunks;
    }

    return (
        <div className="book-summary">
            <Highlighter
                highlightClassName={"highlight-text"}
                findChunks={findKeywords}
                autoEscape={true}
                searchWords={props.searchQuery.split(" ")}
                textToHighlight={props.title}></Highlighter>
            <div>{props.year}</div>
            <Highlighter
                highlightClassName={"highlight-text"}
                findChunks={findKeywords}
                autoEscape={true}
                searchWords={props.searchQuery.split(" ")}
                textToHighlight={props.desc + "..."}></Highlighter>
            <Link to={`books/${props.isbn13}`}>Read more</Link>
        </div>
    )
}