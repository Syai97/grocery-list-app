import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import ProductRepository from "../app/api/product";
import { useQuery } from "react-query";
import MainLayout from "../layouts/MainLayout/main.layout";
import Swal from "sweetalert2";
import Barcode from "react-barcode";

const Home = () => {
  const navigate = useNavigate();
  const [offset, setOffset] = React.useState(0);
  const [limit, setLimit] = React.useState(20);
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState("ASC");

  const {
    data: productData,
    refetch,
    isLoading,
  } = useQuery(
    ["getProducts", limit, offset, sort],
    async () => {
      if (search) {
        const data = await ProductRepository.getMany(offset, limit, sort, search);
        return data;
      } else {
        const data = await ProductRepository.getMany(offset, limit, sort);
        return data;
      }
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    }
  );

  return (
    <MainLayout>
      <Container maxWidth="xl">
        <Box sx={{ my: 3 }}>
          <TextField
            label="Search by brand or name..."
            variant="outlined"
            sx={{ width: "30rem", mr: 3 }}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />

          <Button
            variant="contained"
            color="primary"
            sx={{ my: 2, mr: 2 }}
            onClick={() => {
              if (search) {
                refetch();
              } else {
                Swal.fire({
                  text: "Please enter a value to search",
                  icon: "error",
                });
                return;
              }
            }}
            disabled={isLoading}>
            Search
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ my: 2, mr: 2 }}
            onClick={() => {
              sort === "ASC" ? setSort("DESC") : setSort("ASC");
            }}
            disabled={isLoading}>
            Sort {sort === "DESC" ? "A to Z" : "Z to A"}
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ my: 2 }}
            onClick={() => {
              setSearch("");
              refetch();
            }}
            disabled={isLoading}>
            Reset
          </Button>
        </Box>
        {isLoading === true && (
          <Box sx={{ my: 3, display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}
        {isLoading === false && (
          <Grid container spacing={2}>
            {productData.data.rows.map((product: any) => (
              <Grid item xs={3} key={product.id}>
                <Card sx={{ height: "100%", maxWidth: "100%" }}>
                  <CardMedia
                    component="img"
                    height="250"
                    image={product.image}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Brand: {product.brand}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <Barcode value={product.upc12} height={20} displayValue={false} />
                    </Typography>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        navigate(`/detail/${product.id}`);
                      }}>
                      Edit
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        {isLoading === false && (
          <Box sx={{ my: 3 }}>
            <Pagination
              count={productData.data.count}
              page={offset}
              size="large"
              sx={{ width: "100%" }}
              onChange={(event, value) => setOffset(value)}
            />
          </Box>
        )}
      </Container>
    </MainLayout>
  );
};

export default Home;
