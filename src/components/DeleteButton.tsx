"use client";

import React from "react";
import FormSubmitButton from "./FormSubmitButton";
import { useFormState } from "react-dom";
import { deleteJob } from "@/app/admin/jobs/[slug]/action";

interface DeleteButtonProps {
  jobId: number;
}

const DeleteButton = ({ jobId }: DeleteButtonProps) => {
  const [formState, formAction] = useFormState(deleteJob, undefined);

  return (
    <form action={formAction} className="space-y-1">
      <input name="jobId" type="hidden" value={jobId} />
      <FormSubmitButton className="w-full bg-red-500 hover:bg-red-600">
        Delete Job
      </FormSubmitButton>
      {formState?.error && (
        <p className="text-sm text-red-500">{formState.error}</p>
      )}
    </form>
  );
};

export default DeleteButton;
