import { createTheme } from "@mui/material";

export const appTheme = createTheme({
    typography:{
      button: {
        textTransform: "none"
      }
    },
    components:{
      MuiPagination: {
        styleOverrides: {
          root: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: "2%",
          paddingTop: "2%"
          }
        }
      },
      MuiDialog: {
        styleOverrides: {
          root: {
            backgroundColor: "transparent"
          }
        }
      },
      MuiMenu: {
        styleOverrides: {
          root: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5
          }
        }
      }
    }
  })