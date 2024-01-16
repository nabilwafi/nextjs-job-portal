"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import LoadingButton from "./LoadingButton";

const FormSubmitButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean },
) => {
  const { pending } = useFormStatus();

  return (
    <LoadingButton
      {...props}
      loading={props.loading || pending}
      type="submit"
    />
  );
};

export default FormSubmitButton;
