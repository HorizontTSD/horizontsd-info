"use client";
import * as React from "react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Stack, FormControl, InputLabel, Input, FormHelperText, InputBaseComponentProps } from "@mui/material";
import { IMaskInput } from 'react-imask';
import { FormData, FormDataFieldStatus } from "@/app/_providers/ModalFormProvider";
import { FieldSetterProps } from "./Form";
import { useI18n } from "@/app/_providers/I18nProvider";

interface CustomProps extends InputBaseComponentProps {
  name: string;
}

const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { dict } = useI18n();
    if (!dict || !dict.FeedbackForm) return null;
    const { FeedbackForm } = dict;
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask={`+{${FeedbackForm.Phone.code}}(000)000-00-00`}
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: string) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  },
);

export function Phone({ formData, setFormData, checkForm }: FieldSetterProps) {
  const [inputValue, setInputValue] = useState(formData.phone);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const validatePhone = (phone: string) => {
    const onlyDigits = phone.replace(/\D/g, '');
    if (onlyDigits.length === 0) {
      return FormDataFieldStatus.Empty;
    }
    const withoutPhoneCode = phone.slice(phone.indexOf(`(`)).replace(/\D/g, '')
    try {
      if (withoutPhoneCode.length == 10) {
        return FormDataFieldStatus.Valid;
      }
    } catch {
    }

    return FormDataFieldStatus.Invalid;
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const newStatus = validatePhone(newValue);

    setInputValue({
      value: newValue,
      status: newStatus
    });

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      setFormData((prev: FormData) => ({
        ...prev,
        phone: {
          value: newValue,
          status: newStatus
        }
      }));
      checkForm(formData);
    }, 300);
  };

  useEffect(() => {
    setInputValue(formData.phone);
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
  const { FeedbackForm } = dict;

  const getTextFieldColor = () => {
    if (inputValue.status === FormDataFieldStatus.Invalid) return "error";
    if (inputValue.status === FormDataFieldStatus.Valid) return "secondary";
    return "primary";
  };

  return (
    <Stack direction="row" alignItems="baseline" m={1}>
      <FormControl variant="standard" sx={{ width: `100%` }}>
        <InputLabel variant="standard" htmlFor="formatted-text-mask-input">
          {FeedbackForm.Phone.inputLabel}
        </InputLabel>
        <Input
          placeholder={FeedbackForm.Phone.placeholder}
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
            name: 'phone',
          }}
        />
        <FormHelperText sx={{ userSelect: `none` }}>
          {inputValue.status === FormDataFieldStatus.Invalid && inputValue.value.length > 0
            ? FeedbackForm.Phone.FormHelperText
            : ""}
        </FormHelperText>
      </FormControl>
    </Stack>
  );
}