"use client";
import * as React from "react";
import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Stack,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  InputBaseComponentProps,
  Box,
} from "@mui/material";
import { IMaskInput } from "react-imask";
import Image from "next/image";
import { FormData, FormDataFieldStatus } from "@/app/_providers/ModalFormProvider";
import { FieldSetterProps } from "./Form";
import { useI18n } from "@/app/_providers/I18nProvider";
import { PhoneNumberUtil } from "google-libphonenumber";

interface CustomProps extends InputBaseComponentProps {
  name: string;
}

const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(function TextMaskCustom(
  props,
  ref
) {
  const { dict } = useI18n();
  if (!dict?.FeedbackForm) return null;

  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="+{0} (000) 000 0000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value: string) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

// Memoize the phone util instance creation
const phoneUtil = PhoneNumberUtil.getInstance();

export function Phone({ formData, setFormData, checkForm }: FieldSetterProps) {
  const { dict } = useI18n();
  const [inputValue, setInputValue] = useState(
    typeof formData.phone === "string"
      ? { value: formData.phone, status: FormDataFieldStatus.Empty }
      : formData.phone
  );
  const [countryFlag, setCountryFlag] = useState<string>("");
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Memoize the getCountryByCode function
  const getCountryByCode = useCallback((phone: string): string => {
    try {
      const number = phoneUtil.parseAndKeepRawInput(phone);
      return phoneUtil.getRegionCodeForNumber(number)?.toLowerCase() || "";
    } catch {
      return "";
    }
  }, []);

  // Memoize the validation function
  const validatePhone = useCallback((phone: string) => {
    const onlyDigits = phone.replace(/\D/g, "");
    if (onlyDigits.length === 0) {
      setCountryFlag("");
      return FormDataFieldStatus.Empty;
    }

    // Simplified regex check
    if (!/^\+\d+ \(\d{3}\) \d{3} \d{4}$/.test(phone)) {
      setCountryFlag("");
      return FormDataFieldStatus.Invalid;
    }

    const flag = getCountryByCode(phone);
    setCountryFlag(flag);
    return FormDataFieldStatus.Valid;
  }, [getCountryByCode]);

  // Optimized handler with proper cleanup
  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const newStatus = validatePhone(newValue);

    setInputValue({ value: newValue, status: newStatus });

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      setFormData((prev: FormData) => ({
        ...prev,
        phone: { value: newValue, status: newStatus },
      }));
      checkForm(formData);
    }, 300);
  }, [validatePhone, setFormData, checkForm, formData]);

  // Memoize the color calculation
  const textFieldColor = useMemo(() => {
    if (inputValue.status === FormDataFieldStatus.Invalid) return "error";
    if (inputValue.status === FormDataFieldStatus.Valid) return "secondary";
    return "primary";
  }, [inputValue.status]);

  // Effect for initial value and cleanup
  useEffect(() => {
    setInputValue(
      typeof formData.phone === "string"
        ? { value: formData.phone, status: FormDataFieldStatus.Empty }
        : formData.phone
    );
  }, [formData.phone]);

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  if (!dict?.FeedbackForm) return null;

  return (
    <Stack direction="row" alignItems="center" m={1}>
      <Box
        sx={{
          mr: 1,
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {countryFlag ? (
          <Image
            loading="lazy"
            width={32}
            height={32}
            src={`https://flagcdn.com/w80/${countryFlag}.jpg`}
            alt=""
            style={{
              marginTop: "20px",
              objectFit: "contain",
            }}
          />
        ) : (
          <Box sx={{ userSelect: `none`, marginTop: `12px` }}>🌐</Box>
        )}
      </Box>
      <FormControl variant="standard" sx={{ width: "100%" }}>
        <InputLabel variant="standard" htmlFor="formatted-text-mask-input">
          {dict.FeedbackForm.Phone.inputLabel}
        </InputLabel>
        <Input
          placeholder={dict.FeedbackForm.Phone.placeholder}
          color={textFieldColor}
          error={inputValue.status === FormDataFieldStatus.Invalid && inputValue.value.length > 0}
          required={true}
          value={inputValue.value}
          fullWidth={true}
          size="small"
          type="tel"
          onChange={handleInputChange}
          inputComponent={TextMaskCustom}
          inputProps={{
            name: "phone",
          }}
        />
        <FormHelperText sx={{ userSelect: "none" }}>
          {inputValue.status === FormDataFieldStatus.Invalid && inputValue.value.length > 0
            ? dict.FeedbackForm.Phone.FormHelperText
            : ""}
        </FormHelperText>
      </FormControl>
    </Stack>
  );
}
