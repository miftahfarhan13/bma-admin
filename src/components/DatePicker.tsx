import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { forwardRef } from "react";
import ReactDatePicker, { DatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const customDateInput = ({ value, onClick, onChange }: any, ref: any) => (
  <Input
    autoComplete="off"
    background="white"
    value={value}
    ref={ref}
    onClick={onClick}
    onChange={onChange}
    placeholder="Pilih Tanggal"
    borderLeftRadius="0"
    borderLeft="0"
  />
);
customDateInput.displayName = "DateInput";

const CustomInput = forwardRef(customDateInput);

export default function DatePicker({ ...props }: DatePickerProps) {
  return (
    <InputGroup>
      <InputLeftAddon
        color="gray.500"
        children={<Icon icon="bx:calendar" />}
        bg="white"
      />
      <ReactDatePicker
        //   selected={selectedDate}
        //   onChange={onChange}
        className="react-datapicker__input-text"
        customInput={<CustomInput />}
        dateFormat="MM/dd/yyyy"
        {...props}
      />
    </InputGroup>
  );
}
