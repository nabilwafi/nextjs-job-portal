import JobCard from "@/components/JobCard";
import JobResult from "@/components/JobResult";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import React from "react";

const Page = async () => {
  const unapprovedJobs = await prisma.job.findMany({
    where: {
      approved: false,
    },
  });

  return (
    <main className="m-auto my-10 max-w-screen-xl space-y-10 px-3">
      <h1 className="text-center text-2xl font-bold">Admin Dashboard</h1>
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">Unapproved jobs:</h2>
        {unapprovedJobs.map((job) => (
          <Link key={job.id} href={`/admin/jobs/${job.slug}`} className="block">
            <JobCard job={job} />
          </Link>
        ))}
      </section>
    </main>
  );
};

export default Page;
