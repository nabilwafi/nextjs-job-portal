import { z } from "zod";
import { jobTypes, locationTypes } from "./job-types";

const companyLogoSchema = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "file must be image",
  )
  .refine((file) => {
    return !file || (file instanceof File && file.size < 1024 * 1025 * 2);
  }, "file must be less than 2MB");

const applicationSchema = z
  .object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl: z.string().max(100).optional().or(z.literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "Email or url is required",
    path: ["applicationEmail"],
  });

const locationSchema = z
  .object({
    locationType: z
      .string()
      .min(1, "location is required")
      .refine(
        (value) => locationTypes.includes(value),
        "invalid location type",
      ),
    location: z.string().max(100).optional(),
  })
  .refine(
    (data) =>
      !data.locationType || data.locationType == "Remote" || data.location,
    {
      message: "location is required for on-site jobs",
      path: ["location"],
    },
  );

export const createJobSchema = z
  .object({
    title: z.string().min(1, "title is required").max(100),
    type: z
      .string()
      .min(1, "type is required")
      .refine((value) => jobTypes.includes(value), "invalid job type"),
    companyName: z.string().min(1, "company name is required").max(100),
    companyLogo: companyLogoSchema,
    description: z.string().max(5000).optional(),
    salary: z
      .string()
      .min(1, "salary is required")
      .regex(/^\d+$/, "Must be a number"),
  })
  .and(applicationSchema)
  .and(locationSchema);

export type CreateJobValue = z.infer<typeof createJobSchema>;

export const jobFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

export type JobFilterValues = z.infer<typeof jobFilterSchema>;
