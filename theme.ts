import {createTheme} from "@material-ui/core";

const theme = createTheme({
    palette: {
        primary: {
            main: '#4683d9',
        },
    },
    props: {
        MuiButtonBase: {
            disableRipple: true,
        },
    },
    overrides: {
        MuiDrawer: {
            paper: {
                backgroundColor: '#F2F2F2'
            }
        },
        MuiTextField: {
            root: {
                marginBottom: '1rem',
            }
        },
        MuiFormHelperText: {
            root: {
                color: '#bc3535'
            }
        },
        MuiTableCell: {
            head: {
                fontSize: '13px',
                lineHeight: '1.5em',
                color: '#595959',
                borderBottom: 0
            }
        },
        MuiTypography: {
            body1: {
                fontSize: '18px',
                lineHeight: '28.8px',
                color: '#000',
            },
            h2: {
                fontSize: '36px',
                fontWeight: 500,
                lineHeight: '1.3em',
                wordWrap: 'break-word',
            },
            h3: {
                fontSize: '30px',
                fontWeight: 600,
                lineHeight: '30px',
            },
            h4: {
                fontSize: '22px',
                lineHeight: '1.3em',
                fontWeight: 500,
            },
            h5: {
                fontSize: '18px',
                fontWeight: 500,
                lineHeight: '26px',
                marginBottom: '4px',
                color: '#000'
            },
            h6: {
                fontSize: '16px',
                lineHeight: '1.5em',
                fontWeight: 500,
                color: '#000'
          }
        },
        MuiTab: {
            root: {
                minWidth: '0',
                padding: "0",
                margin: 0,
                textTransform: "none",
                fontWeight: 500,
                fontSize: "16px",
                ['@media (min-width:780px)']: { // eslint-disable-line no-useless-computed-key
                    minWidth: '0'
                },
                '&+&': {
                    margin: "0 0 0 18px",
                }
            },
        },
        MuiAvatar: {
            root: {
                borderRadius: '8px'
            }
        },
        MuiPaper: {
            rounded: {
                borderRadius: 8,
            },
        },
        MuiIconButton: {
            root: {
                '&:hover': {
                    backgroundColor: "transparent",
                },
            }
        },
        MuiButton: {
            root: {
                disableRipple: true,
                borderRadius: '8px',
                textTransform: 'inherit',
                fontSize: 16,
                transition: 'none',
                '&:active': {
                    boxShadow:
                        '0 1px 1px rgb(0 0 0 / 15%), 0 4px 7px rgb(0 0 0 / 0%), 0 -1px 0 rgb(0 0 0 / 5%), -1px 0 0 rgb(0 0 0 / 5%), 1px 0 0 rgb(0 0 0 / 5%) !important',
                },
            },
            contained: {
                backgroundColor: 'white',
                boxShadow:
                    '0 1px 1px rgb(0 0 0 / 15%), 0 4px 7px rgb(0 0 0 / 5%), 0 -1px 0 rgb(0 0 0 / 5%), -1px 0 0 rgb(0 0 0 / 5%), 1px 0 0 rgb(0 0 0 / 5%)',
                '&:hover': {
                    backgroundColor: 'white',
                    boxShadow:
                        '0 1px 1px rgb(0 0 0 / 18%), 0 4px 7px rgb(0 0 0 / 8%), 0 -1px 0 rgb(0 0 0 / 8%), -1px 0 0 rgb(0 0 0 / 8%), 1px 0 0 rgb(0 0 0 / 15%)',
                },
            },
            text: {
                '&:active': {
                    boxShadow: 'none !important',
                },
            },
            containedPrimary: {
                backgroundColor: '#4683d9',
                '&:hover': {
                    backgroundColor: '#437CCE',
                },
            },
        }
    }
});

export default theme;