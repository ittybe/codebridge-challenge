import { Link as ReactRouterLink } from "react-router-dom";
import Highlighter from "react-highlight-words";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from "@mui/material/Link";
import { makeStyles } from '@material-ui/core/styles';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { styled } from '@mui/material/styles';
import "./BookSummary.css"
import theme from "./theme";
import { ThemeProvider } from '@mui/material/styles';

const useStyles = makeStyles(() => ({
    yearWrapper: {
        display: "flex",
        alignItems: "center"
    },
    year: {
        margin: "3px",
        marginBottom: "0px",
        lineHeight: "1",
    },
}));

const BookSummaryCard = styled(Card)(({ theme }) => ({
    borderRadius: 16,
    boxShadow: '0 8px 16px 0 #BDC9D7',
    overflow: 'hidden',
    maxWidth: 300
}))

// ({
//     root: {
//         borderRadius: 16,
//         boxShadow: '0 8px 16px 0 #BDC9D7',
//         overflow: 'hidden',
//     },
// })
export default function BookSummary(props) {
    // props
    // year
    // desc
    // title
    // isbn
    // searchQuery
    // imageUrl
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
        }
        return chunks;
    }
    const styles = useStyles();
    return (
        <div classNama="book-summary">
            <ThemeProvider theme={theme}>
                <BookSummaryCard className="book-summary-card">
                    <CardMedia
                        component="img"
                        height="300"
                        image={props.imageUrl}
                        alt={props.title + " image"}
                    />
                    <CardContent>
                        <Typography gutterBottom className={styles.yearWrapper} variant="body2" color="text.secondary" component="div" >
                            <CalendarTodayIcon fontSize="smaller" className={styles.calendarIcon}></CalendarTodayIcon>
                            <div className={styles.year}>
                                {props.year}
                            </div>
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            <Highlighter
                                highlightClassName={"highlight-text"}
                                findChunks={findKeywords}
                                autoEscape={true}
                                searchWords={props.searchQuery.split(" ")}
                                textToHighlight={props.title}></Highlighter>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <Highlighter
                                highlightClassName={"highlight-text"}
                                findChunks={findKeywords}
                                autoEscape={true}
                                searchWords={props.searchQuery.split(" ")}
                                textToHighlight={props.desc + "..."}></Highlighter>
                        </Typography>
                        <Link underline="none" href={`codebridge-challenge/books/${props.isbn13}`}>Read more</Link>
                        {/* <ReactRouterLink to={`books/${props.isbn13}`} className="book-summary__link">
                        </ReactRouterLink> */}
                    </CardContent>
                </BookSummaryCard>
            </ThemeProvider>
        </div>
        // <div className="book-summary">
        //     <Highlighter
        //         highlightClassName={"highlight-text"}
        //         findChunks={findKeywords}
        //         autoEscape={true}
        //         searchWords={props.searchQuery.split(" ")}
        //         textToHighlight={props.title}></Highlighter>
        //     <div>{props.year}</div>
        //     <Highlighter
        //         highlightClassName={"highlight-text"}
        //         findChunks={findKeywords}
        //         autoEscape={true}
        //         searchWords={props.searchQuery.split(" ")}
        //         textToHighlight={props.desc + "..."}></Highlighter>
        //     <Link to={`books/${props.isbn13}`}>Read more</Link>
        // </div>
    )
}