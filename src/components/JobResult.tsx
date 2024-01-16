import React from "react";
import JobCard from "./JobCard";
import { prisma } from "@/lib/prisma";
import { JobFilterValues } from "@/lib/validation";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import Pagination from "./Pagination";

interface JobResultProps {
  filteredResult: JobFilterValues;
  pages?: number;
}

const JobResult = async ({ pages = 1, filteredResult }: JobResultProps) => {
  const { q, type, location, remote } = filteredResult;

  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString } },
          { companyName: { search: searchString } },
          { location: { search: searchString } },
          { type: { search: searchString } },
          { locationType: { search: searchString } },
        ],
      }
    : {};

  const jobsPerPage = 6;
  const skip = (pages - 1) * jobsPerPage;

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      { approved: true },
    ],
  };

  const jobsPromise = prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: jobsPerPage,
    skip,
  });

  const jobsCountPromise = prisma.job.count({ where });

  const [jobs, jobsCount] = await Promise.all([jobsPromise, jobsCountPromise]);

  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        <Link key={job.id} href={`/jobs/${job.slug}`} className="block">
          <JobCard job={job} />
        </Link>
      ))}
      {jobs.length === 0 && (
        <p className="m-auto text-center">
          No jobs found. Try adjusting your search filters.
        </p>
      )}
      {jobs.length > 0 && (
        <Pagination
          page={pages}
          currentPage={pages}
          totalPages={Math.ceil(jobsCount / jobsPerPage)}
          filterValues={filteredResult}
        />
      )}
    </div>
  );
};

export default JobResult;
