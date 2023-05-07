import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";

interface Props {
  handleTimeChange: (newValue: Date | null) => void;
}

const TimePickerComponent = ({ handleTimeChange }: Props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["TimePicker"]}>
        <TimePicker
          views={["hours", "minutes", "seconds"]}
          format='HH:mm:ss'
          label='Preparation time'
          ampm={false}
          onChange={(newValue: Date | null) => handleTimeChange(newValue)}
          sx={{
            "& .MuiOutlinedInput-root": {
              width: "300px",
              height: "40px",
              backgroundColor: "#515b84",
              borderRadius: "10px",
              color: "white",
              marginTop: "7px",
              marginBottom: "15px",
              fontFamily: "Montserrat",
            },
            "& .MuiInputLabel-outlined": {
              fontSize: "1rem",
              backgroundColor: "#515b84",
              paddingLeft: "7px",
              marginLeft: "-13px",
              borderRadius: "5px",
              paddingRight: "15px",
              height: "30px",
              color: "white",
              fontFamily: "Montserrat",
            },
            "& .MuiSvgIcon-root": {
              fill: "white",
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default TimePickerComponent;
