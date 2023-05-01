import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "./pages/detail";
import Home from "./pages/home";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
