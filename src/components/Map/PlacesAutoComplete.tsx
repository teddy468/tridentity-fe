import React, { useEffect } from "react";
import { Autocomplete, BoxProps, FormControl, TextFieldProps } from "@mui/material";
import usePlacesAutocomplete, { getGeocode, getLatLng, LatLng, Suggestion } from "use-places-autocomplete";
import Icon from "../commons/Icon/Icon";
import { ArrowDownIcon } from "@/assets/icons";
import useToast from "@/commons/hooks/useToast";
import { ErrorMessage, StyledInput, FormGroup } from "./styles";
import { UseFormSetValue } from "react-hook-form";

export interface Option {
  label: string;
  value: string;
}

interface SelectAddressProps extends Omit<TextFieldProps, "onChange"> {
  setSelected: (value: LatLng | null) => void;
  reset?: UseFormSetValue<AddressDefaultBody>;
  defaultValue?: Option;
  onChange: (option: Option | null) => void;
  errorMessage?: React.ReactNode;
  groupProps?: BoxProps;
  popupIcon?: React.ReactNode | false;
  currentLocation?: string;
  setLocation?: (data: Suggestion | null) => void;
}
const PlacesAutoComplete = (props: SelectAddressProps) => {
  const {
    setSelected,
    defaultValue,
    onChange,
    errorMessage,
    groupProps,
    popupIcon,
    currentLocation,
    setLocation,
    reset,
    ...inputProps
  } = props;
  const { value, setValue, suggestions, clearSuggestions } = usePlacesAutocomplete({
    requestOptions: { componentRestrictions: { country: "sg" } },
  });
  const toast = useToast();

  //handle select lat&lng when user chooses the address on the selector
  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = getLatLng(results[0]);
      setSelected({ lat, lng });
    } catch (error) {
      if (error === "OVER_QUERY_LIMIT") {
        setValue("", false);
        setSelected(null);
        onChange({ label: "", value: "" });
        setLocation?.(null);
        toast.error("Google map API limited");
      }
    }
  };

  // Get back latter for refactor
  // useEffect(() => {
  //   if (suggestions.data.length === 0) {
  //     console.log(suggestions)
  //     return reset && reset("address", "");
  //   }
  // }, [suggestions]);

  return (
    <FormGroup {...groupProps}>
      <FormControl sx={{ width: "100%" }} variant="standard" size={"small"}>
        <Autocomplete
          key={currentLocation}
          disablePortal
          id="combo-box-demo"
          value={defaultValue}
          //when user chooses the address on the selector
          onChange={(_, selectedValue) => {
            //update the address when the user chooses from google map
            onChange(selectedValue);
            if (selectedValue !== null) {
              handleSelect(selectedValue.label);
            }
            setLocation?.(suggestions.data.find(item => item.place_id === selectedValue?.value) || null);
          }}
          options={suggestions.data.map(d => ({ label: d.description, value: d.place_id }))}
          filterOptions={x => x}
          autoComplete
          includeInputInList
          filterSelectedOptions
          renderInput={params => (
            <StyledInput
              {...params}
              {...inputProps}
              value={value}
              //when user type on the text field
              onChange={e => {
                // Update the address even if the user doesn't choose from google map suggestions
                onChange({ label: e.target.value, value: "" });
                // setSelected('null');
                setValue(e.target.value);
              }}
              onFocus={e => setValue(e.target.value)}
            />
          )}
          popupIcon={popupIcon ?? <Icon icon={ArrowDownIcon} width={20} height={20} />}
          onSubmit={e => e.preventDefault()}
        />
        {!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </FormControl>
    </FormGroup>
  );
};

export default PlacesAutoComplete;
