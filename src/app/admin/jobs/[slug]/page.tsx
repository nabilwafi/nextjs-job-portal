import JobPage from "@/components/JobPage";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";
import AdminSidebar from "./AdminSidebar";

interface PageProps {
  params: { slug: string };
}

const Page = async ({ params: { slug } }: PageProps) => {
  const job = await prisma.job.findUnique({
    where: {
      slug,
    },
  });

  if (!job) notFound();

  return (
    <div className="flex flex-col items-center md:flex-row md:items-start">
      <JobPage job={job} />
      <AdminSidebar job={job} />
    </div>
  );
};

export default Page;
