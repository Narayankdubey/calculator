import {
  Box,
  FormControl,
  Grid,
  InputAdornment,
  Paper,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { formatNumber, parseFormattedNumber } from "../../utils/helper";
import { styled } from "@mui/system";
import { PieChart } from "@mui/x-charts";

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    font-weight: 600;
    width: 150px;
    color: #7f7f7f;
  }
`;

const StyledSlider = styled(Slider)`
  .MuiSlider-rail {
    height: 15px;
  }
  .MuiSlider-thumb {
    height: 30px;
    width: 30px;
    border-radius: 5px;
    // border: 4px solid green;
  }
`;

const EmiCalculator = () => {
  const [value, setValue] = useState({ amount: 100000, rate: 10, tenure: 10 });
  const [emiValues, setEmiValues] = useState({
    emi: 0,
    totalInterest: 0,
    totalPayment: 0,
  });
  const fields = [
    {
      name: "amount",
      label: "Loan Amount",
      min: 100000,
      max: 100000000,
      sign: "₹",
      minSign: "₹1 Lac",
      maxSign: "₹10 Cr",
    },
    {
      name: "rate",
      label: "Interest Rate (% P.A.)",
      min: 1,
      max: 100,
      sign: "%",
    },
    {
      name: "tenure",
      label: "Loan Tenure (Years)",
      min: 1,
      max: 50,
      sign: "Yr",
    },
  ];

  const onChange = ({ target }) => {
    let value = parseFormattedNumber(target.value);

    if (typeof value === "number")
      setValue((old) => ({ ...old, [target.name]: value }));
  };

  function calculateEMI(principal, annualInterestRate, tenureInYears) {
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const tenureInMonths = tenureInYears * 12;
    const emi =
      (principal *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, tenureInMonths)) /
      (Math.pow(1 + monthlyInterestRate, tenureInMonths) - 1);

    return emi;
  }

  useEffect(() => {
    const { amount, rate, tenure } = value;
    const emi = calculateEMI(amount, rate, tenure).toFixed(2);
    const totalPayment = (emi * tenure * 12 + amount).toFixed(2);
    const totalInterest = (totalPayment - amount).toFixed(2);
    setEmiValues({
      emi,
      totalInterest,
      totalPayment,
    });
  }, [value]);

  return (
    <Box
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        justifyContent: "center",
        gap: 8,
      }}
    >
      <Typography variant="h4" width={"100%"} textAlign={"center"}>
        EMI Calculator
      </Typography>
      <Paper className="cal-form-container" sx={{ p: 2 }}>
        {fields.map((item) => (
          <FormControl fullWidth key={item?.name} sx={{ marginY: 3 }}>
            <Grid container alignItems="center">
              <Grid
                item
                display={"flex"}
                justifyContent={"space-between"}
                width={"100%"}
                pt={0}
              >
                <Typography variant="h7">{item?.label}</Typography>
                <StyledTextField
                  name={item?.name}
                  value={formatNumber(value[item.name])}
                  onChange={onChange}
                  size="small"
                  InputProps={{
                    step: 10,
                    min: item?.min,
                    max: item?.max,
                    "aria-labelledby": "input-slider",
                    startAdornment: (
                      <InputAdornment position="start">
                        {item?.sign}
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item sx={{ pt: 0, width:"100%" }}>
                <StyledSlider
                  value={
                    typeof value[item?.name] === "number"
                      ? value[item?.name]
                      : 0
                  }
                  onChange={onChange}
                  name={item?.name}
                  label={item?.label}
                  min={item?.min}
                  max={item?.max}
                />
              </Grid>
              <Grid
                item
                display={"flex"}
                justifyContent={"space-between"}
                width={"100%"}
                pt={0}
              >
                <Typography variant="p" className="colorDisabled">
                  {item?.minSign || item?.min}
                </Typography>
                <Typography variant="p" className="colorDisabled">
                  {item?.maxSign || item?.max}
                </Typography>
              </Grid>
            </Grid>
          </FormControl>
        ))}
      </Paper>

      <Paper
        className="cal-result-container"
        sx={{ p: 2, display: "flex", flexWrap: "wrap", gap: 8 }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Box>
            <Typography className="font600 colorDisabled" variant="p">
              Monthly Home Loan EMI
            </Typography>
            <Typography variant="h5">
              <span className="fontSmall">₹</span>{" "}
              {formatNumber(emiValues?.emi)}
            </Typography>
          </Box>
          <Box>
            <Typography className="font600 colorDisabled" variant="p">
              Principal Amount
            </Typography>
            <Typography variant="h5">
              <span className="fontSmall">₹</span> {formatNumber(value?.amount)}
            </Typography>
          </Box>
          <Box>
            <Typography className="font600 colorDisabled" variant="p">
              Total Interest Payable
            </Typography>
            <Typography variant="h5">
              <span className="fontSmall">₹</span>{" "}
              {formatNumber(emiValues?.totalInterest)}
            </Typography>
          </Box>
          <Box>
            <Typography className="font600 colorDisabled" variant="p">
              Total Payment
            </Typography>
            <Typography variant="h5">
              <span className="fontSmall">₹</span>{" "}
              {formatNumber(emiValues?.totalPayment)}
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Paper className="cal-chart-container">
        <Box sx={{ width: "100%", overflow: "auto" }}>
          <PieChart
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: emiValues?.totalInterest,
                    label: "Loan Interest",
                  },
                  {
                    id: 1,
                    value: value?.amount,
                    label: "Principal Loan Amount",
                  },
                ],
                innerRadius: 30,
                outerRadius: 100,
                paddingAngle: 5,
                cornerRadius: 5,
                startAngle: -90,
                cx: 150,
                cy: 150,
                highlightScope: { faded: "global", highlighted: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
              },
            ]}
            // width={550}
            height={400}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default EmiCalculator;
