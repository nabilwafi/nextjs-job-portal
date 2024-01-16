"use client";

import React from "react";
import FormSubmitButton from "./FormSubmitButton";
import { useFormState } from "react-dom";
import { approvedJob } from "@/app/admin/jobs/[slug]/action";

interface ApprovedButtonProps {
  jobId: number;
}

const ApprovedButton = ({ jobId }: ApprovedButtonProps) => {
  const [formState, formAction] = useFormState(approvedJob, undefined);

  return (
    <form action={formAction} className="space-y-1">
      <input name="jobId" type="hidden" value={jobId} />
      <FormSubmitButton className="w-full bg-green-500 hover:bg-green-600">
        Approved
      </FormSubmitButton>
      {formState?.error && (
        <p className="text-sm text-red-500">{formState.error}</p>
      )}
    </form>
  );
};

export default ApprovedButton;
