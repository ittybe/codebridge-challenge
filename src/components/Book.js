import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getBookByISBN, getBookFullDesc } from "../api/itbookApi";
import "./Book.css";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from "@mui/material/Link";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({
    title: {
        textAlign: "center", marginBottom: "50px"
    },
    arrowBackIcon: {
        marginRight: "5px",
        verticalAlign: "middle"
    },
    linkWrapper: {
        margin: "40px 0px 0px 40px"
    }, 
    moreInfoLinkWrapper: {
        marginTop: "30px"
    }
}))
function Book(props) {
    const [bookData, setBookData] = useState({
        "authors": "",
        "title": "",
        "subtitle": "",
        "isbn13": "",
        "year": "",
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

    const styles = useStyles();
    return (
        <div className="book-page">
            <div className="book-card-wrapper">
                <Card >
                    <CardContent>
                        <Typography gutterBottom component="div" variant="h3" className={styles.title}>{bookData.title}</Typography>
                        <Typography variant="body2">{bookData.desc}</Typography>
                        <Typography variant="body2" className={styles.moreInfoLinkWrapper}>
                            <Link underline="none" href={bookData.url} >
                                More information
                            </Link>
                        </Typography>
                    </CardContent>
                </Card>
                <Typography className={styles.linkWrapper}>
                    <Link underline="none" href={`/codebridge-challenge`} >
                        <ArrowBackIcon fontSize="smaller" className={styles.arrowBackIcon}></ArrowBackIcon>
                        Back to homepage
                    </Link>
                </Typography>
            </div>

        </div>
    )
}

export default Book;