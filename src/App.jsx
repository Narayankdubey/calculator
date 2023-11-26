import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";

import EmiCalculator from "./components/emi";
import SipCalculator from "./components/sip";
import Layout from "./components/layout";
import Home from "./components/home";

// const defaultTheme = createTheme();

const theme = createTheme({
  components: {
    MuiTypography: {
      variants: [
        {
          // use the variant name defined earlier
          props: { variant: "h5" },
          // set the styles for this variant
          style: {
            fontWeight: 700,
          },
        },
      ],
    },
  },
});

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "emi-calculator",
          element: <EmiCalculator />,
        },
        {
          path: "sip-calculator",
          element: <SipCalculator />,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}/>
      {/* <Box sx={{ width: "100%" }}>
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1,
        }}
      >
        <Typography variant="h5">{type}</Typography>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Type"
            onChange={handleChange}
          >
            <MenuItem value="EMI Calculator">EMI Calculator</MenuItem>
            <MenuItem value="SIP Calculator">SIP Calculator</MenuItem>
          </Select>
        </FormControl>
      </Card>
      <Box sx={{mt:2}}>
        {getCalc()}
      </Box>
    </Box> */}
    </ThemeProvider>
  );
}

export default App;
