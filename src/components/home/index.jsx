import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <Grid container spacing={2} justifyContent={"center"}>
        <Grid item xs={10}>
          <Item>
            <Grid container spacing={2}>
              <Grid item  xs={12}  sm={6}>
                <Typography variant="h5">What is SIP ?</Typography>
                <Typography variant="p">
                  Systematic Investment Plan (SIP) is a kind of investment
                  scheme offered by mutual fund companies. Using SIP one can
                  invest small amount peridically (weekly, monthly, quaterly)
                  into a selected mutual fund. For retail investors, SIP offers
                  a well disciplined and passive approach to investing, to
                  create wealth in long term (using the power of compounding).
                  Since, the amount is invested on regular intervals (usually on
                  monthly basis), it also reduces the impact of market
                  volatility. The SIP calculator helps you calculate the wealth
                  gain and expected returns for your monthly SIP investment. You
                  get a rough estimate on the maturity amount for any monthly
                  SIP, based on a projected annual return rate. If you also have
                  lots of FD in your portfolio, then use this fixed deposit
                  calculator to get the approx value of your maturity amount.
                </Typography>
                <Button fullWidth variant="contained" >
                  <Link to={"/sip-calculator"} style={{color:"white"}}>Calculate SIP</Link>
                </Button>
              </Grid>
              <Grid item  xs={12}  sm={6}>
                <img
                  src="https://cdn.pixabay.com/photo/2016/11/23/14/37/blur-1853262_1280.jpg"
                  alt="stocks"
                  width={"50%"}
                  height={"100%"}
                />
              </Grid>
            </Grid>
          </Item>
        </Grid>
        <Grid item xs={10}>
          <Item>
            <Grid container spacing={2}>
              <Grid item  xs={12}  sm={6}>
                <img
                  src="https://cdn.pixabay.com/photo/2017/09/07/08/53/money-2724235_1280.jpg"
                  alt="stocks"
                  width={"100%"}
                  height={"100%"}
                />
              </Grid>
              <Grid item  xs={12}  sm={6}>
                <Typography variant="h5">What is EMI?</Typography>
                <Typography variant="p">
                  Equated Monthly Installment - EMI for short - is the amount
                  payable every month to the bank or any other financial
                  institution until the loan amount is fully paid off. It
                  consists of the interest on loan as well as part of the
                  principal amount to be repaid. The sum of principal amount and
                  interest is divided by the tenure, i.e., number of months, in
                  which the loan has to be repaid. This amount has to be paid
                  monthly. The interest component of the EMI would be larger
                  during the initial months and gradually reduce with each
                  payment. The exact percentage allocated towards payment of the
                  principal depends on the interest rate. Even though your
                  monthly EMI payment won't change, the proportion of principal
                  and interest components will change with time. With each
                  successive payment, you'll pay more towards the principal and
                  less in interest.
                </Typography>
                <Button fullWidth variant="contained">
                  <Link to={"/emi-calculator"}  style={{color:"white"}}>Calculate EMI</Link>
                </Button>
              </Grid>
            </Grid>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
