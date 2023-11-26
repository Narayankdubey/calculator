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

const Calculator = () => {
  const [value, setValue] = useState({ amount: 1000, rate: 10, tenure: 10 });
  const [returnValues, setReturnValues] = useState({
    estimatedReturn: 0,
    totalValue: 0,
    investedAmount: 0,
  });
  const fields = [
    {
      name: "amount",
      label: "Loan Amount",
      min: 500,
      max: 100000,
      sign: "₹",
      minSign: "₹500",
      maxSign: "₹1 Lac",
    },
    {
      name: "rate",
      label: "Interest Rate (% P.A.)",
      min: 1,
      max: 30,
      sign: "%",
      step: 0.1,
    },
    {
      name: "tenure",
      label: "Loan Tenure (Years)",
      min: 1,
      max: 40,
      sign: "Yr",
    },
  ];

  const onChange = ({ target }) => {
    let value = parseFormattedNumber(target.value);

    if (typeof value === "number")
      setValue((old) => ({ ...old, [target.name]: value }));
  };

  function calculateSIP(
    monthlyInvestment,
    expectedReturnRate,
    timePeriodInYears
  ) {
    const monthlyReturnRate = expectedReturnRate / 12 / 100;
    const totalMonths = timePeriodInYears * 12;
    const futureValue =
      monthlyInvestment *
      ((Math.pow(1 + monthlyReturnRate, totalMonths) - 1) / monthlyReturnRate) *
      (1 + monthlyReturnRate);
    const roundedFutureValue = Math.round(futureValue * 100) / 100;

    return roundedFutureValue;
  }

  useEffect(() => {
    const { amount, rate, tenure } = value;
    const investedAmount = (amount * tenure * 12).toFixed(2);
    const totalValue = calculateSIP(amount, rate, tenure).toFixed(2);
    const estimatedReturn = (totalValue - investedAmount).toFixed(2);
    setReturnValues({
      estimatedReturn,
      totalValue,
      investedAmount,
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
        SIP Calculator
      </Typography>
      <Paper className="cal-form-container" sx={{ p: 2}}>
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
              <Grid item sm={12} sx={{ pt: 0, width:"100%"  }}>
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
                  step={item?.step || 1}
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

      <Paper className="cal-result-container"
        sx={{ p: 2, display: "flex", flexWrap: "wrap", gap: 8 }}>
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
              Invested Amount
            </Typography>
            <Typography variant="h5">
              <span className="fontSmall">₹</span>{" "}
              {formatNumber(returnValues?.investedAmount)}
            </Typography>
          </Box>
          <Box>
            <Typography className="font600 colorDisabled" variant="p">
              Est. Returns
            </Typography>
            <Typography variant="h5">
              <span className="fontSmall">₹</span>{" "}
              {formatNumber(returnValues?.estimatedReturn)}
            </Typography>
          </Box>
          <Box>
            <Typography className="font600 colorDisabled" variant="p">
              Total Value
            </Typography>
            <Typography variant="h5">
              <span className="fontSmall">₹</span>{" "}
              {formatNumber(returnValues?.totalValue)}
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
                    value: returnValues?.investedAmount,
                    label: "Invested Amount",
                  },
                  {
                    id: 1,
                    value: returnValues?.estimatedReturn,
                    label: "Est. Returns",
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

export default Calculator;
