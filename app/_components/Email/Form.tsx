"use client";
import * as React from "react";
import {
  Typography,
  Modal,
  Card,
  Fade,
  Box,
  Stack,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
} from "@mui/material";
import { Company } from "@/app/_components/Email/Company";
import { Email } from "@/app/_components/Email/Email";
import { FormData, FormStatus } from "@/app/_providers/ModalFormProvider";
import { LegalInfo } from "@/app/_components/Email/LegalInfo";
import { Name } from "@/app/_components/Email/Name";
import { PageRating } from "@/app/_components/Email/PageRating";
import { Phone } from "@/app/_components/Email/Phone";
import { Submit } from "@/app/_components/Email/Submit";
import { useI18n } from "@/app/_providers/I18nProvider";

export interface FormProps {
  opened: boolean;
  close: () => void;
  setFormData: (next: FormData | ((prev: FormData) => FormData)) => void;
  formData: FormData;
  submitHandle: (payload: FormData) => Promise<Response>;
  formStatus: FormStatus;
  checkForm: (data: FormData) => Promise<boolean>;
}

export interface FieldSetterProps {
  setFormData: (next: FormData | ((prev: FormData) => FormData)) => void;
  formData: FormData;
  submitHandle: (payload: FormData) => Promise<Response>;
  formStatus: FormStatus;
  checkForm: (data: FormData) => Promise<boolean>;
}

const baseStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
};

const styleDesktop = {
  width: `720px`,
  p: `3rem`,
};

const styleMd = {
  width: `540px`,
  height: `auto`,
  p: `1.5rem`,
};

const styleMobile = {
  width: `97%`,
  height: `auto`,
  maxHeight: `85%`,
  p: `0.2rem`,
  overflowY: `scroll`,
};

export function Form({
  close,
  formData,
  opened,
  setFormData,
  submitHandle,
  formStatus,
  checkForm,
}: FormProps) {
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleSubmit = async (data: FormData): Promise<Response> => {
    try {
      const response = await submitHandle(data);
      setSnackbar({
        open: true,
        message: `${FeedbackForm.Submit.success}\n${FeedbackForm.Submit.status} ${response.statusText}\n${FeedbackForm.Submit.code} ${response.status}`,
        severity: "success",
      });
      return response;
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
      setSnackbar({
        open: true,
        message: FeedbackForm.Submit.error,
        severity: "error",
      });
      throw error;
    }
  };

  const theme = useTheme();

  const breakpoint = [
    useMediaQuery(theme.breakpoints.up("lg")),
    useMediaQuery(theme.breakpoints.between("md", "lg")),
    useMediaQuery(theme.breakpoints.between("sm", "md")),
    useMediaQuery(theme.breakpoints.between("xs", "sm")),
    useMediaQuery(theme.breakpoints.down("xs")),
  ].indexOf(true);

  const styles = [styleDesktop, styleDesktop, styleMd, styleMobile, styleMobile];

  const current = Math.max(0, breakpoint + 1);
  const { dict } = useI18n();
  if (!dict || !dict.FeedbackForm) return null;
  const { FeedbackForm } = dict;

  return (
    <>
      <Modal
        aria-describedby="modal-submit-description"
        aria-labelledby="modal-submit-title"
        onClose={close}
        open={opened}
      >
        <Fade in={opened}>
          <Card sx={{ ...baseStyle, ...styles[current] }}>
            <Stack direction={"row"} alignItems={"baseline"} justifyContent={"center"} m={current}>
              <Typography
                gutterBottom
                variant={current > 1 ? "h4" : "h6"}
                sx={{ userSelect: `none` }}
              >
                {FeedbackForm.Header.value}
              </Typography>
            </Stack>
            <Box>
              <Name
                formData={formData}
                submitHandle={handleSubmit}
                setFormData={setFormData}
                formStatus={formStatus}
                checkForm={checkForm}
              />
              <Email
                formData={formData}
                setFormData={setFormData}
                submitHandle={handleSubmit}
                formStatus={formStatus}
                checkForm={checkForm}
              />
              <Phone
                formData={formData}
                submitHandle={handleSubmit}
                setFormData={setFormData}
                formStatus={formStatus}
                checkForm={checkForm}
              />
              <Company
                formData={formData}
                submitHandle={handleSubmit}
                setFormData={setFormData}
                formStatus={formStatus}
                checkForm={checkForm}
              />
              <PageRating
                formData={formData}
                submitHandle={handleSubmit}
                setFormData={setFormData}
                formStatus={formStatus}
                checkForm={checkForm}
              />
              <LegalInfo />
              <Submit
                formData={formData}
                setFormData={setFormData}
                submitHandle={handleSubmit}
                formStatus={formStatus}
                checkForm={checkForm}
              />
            </Box>
          </Card>
        </Fade>
      </Modal>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          sx={{
            width: "100%",
            whiteSpace: "pre-line",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
