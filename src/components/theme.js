import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: "#000000",
        },
    },
    typography: {
        fontFamily: 'Montserrat',
    },
    components: {
        // Name of the component
        MuiLink: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "700",
                    "&:hover": {
                        color: "gray"
                    }
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 8px 16px 0 #BDC9D7',
                    overflow: 'hidden',
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                h3: {
                    fontSize: "1.2rem",
                    lineHeight: 1.3
                }
            }
        }

    },
});

export default theme;