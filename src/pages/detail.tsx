import {
  Card,
  CardMedia,
  Container,
  Grid,
  Typography,
  Box,
  CardContent,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/main.layout";
import ProductRepository from "../app/api/product";
import { useMutation, useQuery } from "react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: productData,
    refetch,
    isLoading,
  } = useQuery(
    ["getProduct", id],
    async () => {
      if (id) {
        const data = await ProductRepository.getOne(id);
        return data;
      } else {
        return null;
      }
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    }
  );

  const updateProduct = useMutation((data: any) => ProductRepository.update(data), {
    onSuccess: () => {
      Swal.fire({
        text: "Product updated successfully",
        icon: "success",
      }).then(() => navigate("/"));
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) =>
    await updateProduct.mutateAsync({ ...data, id: productData.data.id });

  return (
    <MainLayout>
      <Container maxWidth="xl">
        {isLoading === true && (
          <Box sx={{ my: 3, display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}
        {isLoading === false && (
          <Box sx={{ my: 3 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Brand"
                variant="outlined"
                fullWidth
                defaultValue={productData?.data?.brand}
                {...register("brand", { required: true })}
                autoFocus
              />
              {errors.brand && <span style={{ color: "red" }}>This field is required</span>}
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                sx={{ mt: 3 }}
                defaultValue={productData?.data?.name}
                {...register("name", { required: true })}
                autoFocus
              />
              {errors.name && <span style={{ color: "red" }}>This field is required</span>}
              <TextField
                label="UPC12"
                variant="outlined"
                fullWidth
                type="number"
                defaultValue={productData?.data?.upc12}
                sx={{ mt: 3 }}
                {...register("upc12", { required: true })}
                autoFocus
              />
              {errors.upc12 && <span style={{ color: "red" }}>This field is required</span>}
              <TextField
                label="Image"
                variant="outlined"
                fullWidth
                sx={{ mt: 3 }}
                defaultValue={productData?.data?.image}
                {...register("image", { required: true })}
                autoFocus
              />
              {errors.image && <span style={{ color: "red" }}>This field is required</span>}
              <Button variant="contained" color="primary" type="submit" sx={{ mr: 2, mt: 3 }}>
                Update Product
              </Button>
              <Button
                variant="contained"
                color="error"
                type="button"
                sx={{ mt: 3}}
                onClick={() => {
                  navigate("/");
                }}>
                Cancel
              </Button>
            </form>
          </Box>
        )}
      </Container>
    </MainLayout>
  );
};

export default Detail;
