"use client";
import { createContext, useContext, useState, useCallback, useMemo } from "react";
import { Form } from "@/app/_components/Email/Form";

const ModalFormContext = createContext<ModalFormContextType | null>(null);

export interface ModalFormContextType {
  open: boolean;
  setOpen: (next: boolean) => void;
}

export interface ModalFormProviderProps {
  opened: boolean;
  children: React.ReactNode;
}

export enum FormDataFieldStatus {
  Invalid = 0,
  Empty = 1,
  Pending = 2,
  Valid = 3,
}

interface FormField {
  value: string;
  status: FormDataFieldStatus;
}

export interface FormData {
  [key: string]: FormField;
}

export interface FormStatus {
  status: FormDataFieldStatus;
}

const defaultState: FormData = {
  email: {
    value: "",
    status: 1,
  },
  phone: {
    value: "",
    status: 1,
  },
  company: {
    value: "",
    status: 1,
  },
  name: {
    value: "",
    status: 1,
  },
  rating: {
    value: "4.5",
    status: 3,
  },
  message: {
    value: `${Date.now()}`,
    status: 3,
  },
};

export function ModalFormProvider({ opened, children }: ModalFormProviderProps) {
  const [open, setOpen] = useState(opened);
  const [formData, setFormData] = useState<FormData>(defaultState);
  const [formStatus, setFormStatus] = useState<FormStatus>({ status: FormDataFieldStatus.Empty });

  const checkForm = useCallback(
    async (data: FormData) => {
      if (!data) return false;
      const fields = [
        data.email,
        data.phone,
        data.company,
        data.name,
        data.rating,
        ...(data.message ? [data.message] : []),
      ];

      const allValid = fields.every((field) => field?.status === FormDataFieldStatus.Valid);
      if (allValid && formStatus.status !== FormDataFieldStatus.Valid) {
        setFormStatus({ status: FormDataFieldStatus.Valid });
        return true;
      }

      if (!allValid && formStatus.status !== FormDataFieldStatus.Invalid) {
        setFormStatus({ status: FormDataFieldStatus.Invalid });
        return false;
      }

      return allValid;
    },
    [formStatus.status]
  );

  const submitHandle = useCallback(async () => {
    setFormStatus({ status: FormDataFieldStatus.Pending });

    try {
      const payload: FormData = {
        ...defaultState,
        message: {
          value: Date.now().toString(),
          status: FormDataFieldStatus.Valid,
        },
      };
      for (const key in formData) {
        if (formData[key].status !== FormDataFieldStatus.Valid) {
          throw new Error(`invalid data at:${key}`);
        }
        (payload as unknown as { [key: string]: string })[`${key}`] = formData[key].value;
      }
      const response = await fetch("/api/internal/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Internal-Request": "true",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Ошибка при отправке формы");
      }

      setFormStatus({ status: FormDataFieldStatus.Valid });
      return response;
    } catch (error) {
      setFormStatus({ status: FormDataFieldStatus.Invalid });
      throw error;
    } finally {
      setFormStatus({ status: FormDataFieldStatus.Empty });
      setFormData(defaultState);
      setOpen(false);
    }
  }, [setOpen, formData]);

  const contextValue = useMemo(
    () => ({
      open,
      setOpen,
    }),
    [open, setOpen]
  );

  return (
    <ModalFormContext.Provider value={contextValue}>
      <Form
        opened={open}
        close={() => setOpen(false)}
        setFormData={setFormData}
        formData={formData}
        submitHandle={submitHandle}
        formStatus={formStatus}
        checkForm={checkForm}
      />
      {children}
    </ModalFormContext.Provider>
  );
}

export function useModalForm() {
  const ctx = useContext(ModalFormContext);
  if (!ctx) throw new Error("useModalForm must be used within an ModalFormContext");
  return ctx;
}
