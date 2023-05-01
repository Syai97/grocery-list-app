import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import * as React from "react";

const Header = () => {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              Grocery List
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              Grocery List
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
