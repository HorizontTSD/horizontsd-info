"use client";
import * as React from "react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
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
import countries from "../../_json/countries.json";
import defCodes from "../../_json/def_codes.json";

interface CustomProps extends InputBaseComponentProps {
  name: string;
}

const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(function TextMaskCustom(
  props,
  ref
) {
  const { dict } = useI18n();
  if (!dict || !dict.FeedbackForm) return null;
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

export function Phone({ formData, setFormData, checkForm }: FieldSetterProps) {
  const [inputValue, setInputValue] = useState(
    typeof formData.phone === "string"
      ? { value: formData.phone, status: FormDataFieldStatus.Empty }
      : formData.phone
  );
  const [countryFlag, setCountryFlag] = useState<string>("un");
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  function getCountryByCode(phone: string) {
    const digits = phone.replace(/[^\d]/g, "");
    let found = null;
    let maxLen = 0;
    for (const c of countries) {
      const prefix = c.code.split("-")[0];
      if (digits.startsWith(prefix) && prefix.length > maxLen) {
        found = c;
        maxLen = prefix.length;
      }
    }
    if (found && found.code === "7" && digits.length >= 4) {
      const def = digits.slice(1, 4);
      for (const entry of defCodes) {
        if (entry.defs.includes(def)) {
          return entry.country.toLowerCase();
        }
      }
      return "ru";
    }
    return found ? found.iso.toLowerCase() : "un";
  }

  function validatePhone(phone: string) {
    const onlyDigits = phone.replace(/\D/g, "");
    if (onlyDigits.length === 0) {
      setCountryFlag("un");
      return FormDataFieldStatus.Empty;
    }
    const match = phone.match(/^\+\d+ \(\d{3}\) \d{3} \d{4}$/);
    if (!match) {
      setCountryFlag("un");
      return FormDataFieldStatus.Invalid;
    }
    const flag = getCountryByCode(phone);
    setCountryFlag(flag);
    return FormDataFieldStatus.Valid;
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value;
    const newStatus = validatePhone(newValue);
    setInputValue({ value: newValue, status: newStatus });
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setFormData((prev: FormData) => ({
        ...prev,
        phone: { value: newValue, status: newStatus },
      }));
      checkForm(formData);
    }, 300);
  }

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

  const { dict } = useI18n();
  if (!dict || !dict.FeedbackForm) return null;

  function getTextFieldColor() {
    if (inputValue.status === FormDataFieldStatus.Invalid) return "error";
    if (inputValue.status === FormDataFieldStatus.Valid) return "secondary";
    return "primary";
  }

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
      </Box>
      <FormControl variant="standard" sx={{ width: `100%` }}>
        <InputLabel variant="standard" htmlFor="formatted-text-mask-input">
          {dict.FeedbackForm.Phone.inputLabel}
        </InputLabel>
        <Input
          placeholder={dict.FeedbackForm.Phone.placeholder}
          color={getTextFieldColor()}
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
        <FormHelperText sx={{ userSelect: `none` }}>
          {inputValue.status === FormDataFieldStatus.Invalid && inputValue.value.length > 0
            ? dict.FeedbackForm.Phone.FormHelperText
            : ""}
        </FormHelperText>
      </FormControl>
    </Stack>
  );
}
