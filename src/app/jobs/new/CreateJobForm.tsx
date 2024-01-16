"use client";

import { CreateJobValue, createJobSchema } from "@/lib/validation";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";
import { jobTypes, locationTypes } from "@/lib/job-types";
import LocationInput from "@/components/LocationInput";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/RichTextEditor";
import { draftToMarkdown } from "markdown-draft-js";
import FormSubmitButton from "@/components/FormSubmitButton";
import { createJobAction } from "./action";

const CreateJobForm = () => {
  const form = useForm<CreateJobValue>({
    resolver: zodResolver(createJobSchema),
  });

  const {
    handleSubmit,
    watch,
    trigger,
    control,
    setValue,
    setFocus,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: CreateJobValue) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      await createJobAction(formData);
    } catch (error) {
      alert("Something went wrong, please try again.");
    }
  };

  return (
    <div className="space-y-6 rounded-lg border p-4">
      <div>
        <h2 className="font-semibold">Job Detail</h2>
        <p className="text-muted-foreground">
          Provide a job description and details
        </p>
      </div>

      <Form {...form}>
        <form
          className="space-y-4"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Frontend Developer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Type</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    defaultValue=""
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  >
                    <option value="" hidden>
                      select on option
                    </option>
                    {jobTypes.map((jb) => (
                      <option value={jb} key={jb}>
                        {jb}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="companyLogo"
            render={({ field: { value, ...fieldValues } }) => (
              <FormItem>
                <FormLabel>Company Logo</FormLabel>
                <FormControl>
                  <Input
                    {...fieldValues}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      fieldValues.onChange(file);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="locationType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    defaultValue=""
                    onChange={(e) => {
                      field.onChange(e);
                      if (e.currentTarget.value === "Remote") {
                        trigger("location");
                      }
                    }}
                  >
                    <option value="" hidden>
                      select on option
                    </option>
                    {locationTypes.map((lt) => (
                      <option key={lt} value={lt}>
                        {lt}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Office Location</FormLabel>
                <FormControl>
                  <LocationInput
                    onLocationSelected={field.onChange}
                    ref={field.ref}
                  />
                </FormControl>
                {watch("location") && (
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setValue("location", "", { shouldValidate: true });
                      }}
                    >
                      <X size={20} />
                    </button>
                    <span className="text-sm">{watch("location")}</span>
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <Label htmlFor="applicationEmail">How to apply?</Label>
            <div className="flex justify-between">
              <FormField
                control={control}
                name="applicationEmail"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormControl>
                      <div className="flex items-center">
                        <Input {...field} placeholder="Email" type="email" />
                        <span className="mx-2">or</span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="applicationUrl"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormControl>
                      <Input {...field} placeholder="Email" type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel onClick={() => setFocus("description")}>
                  Description
                </FormLabel>
                <FormControl>
                  <RichTextEditor
                    onChange={(draft) => field.onChange(draftToMarkdown(draft))}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salary</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormSubmitButton loading={isSubmitting}>Submit</FormSubmitButton>
        </form>
      </Form>
    </div>
  );
};

export default CreateJobForm;
