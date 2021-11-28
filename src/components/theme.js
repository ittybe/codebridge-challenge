import { createTheme } from '@mui/material/styles';

const theme = createTheme({
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
                    "&:hover" : {
                        color: "gray"
                    }
                },
            },
        },
    },
});

export default theme;