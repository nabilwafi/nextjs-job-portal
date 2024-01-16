import { Metadata } from "next";
import React from "react";
import CreateJobForm from "./CreateJobForm";

export const metadata: Metadata = {
  title: "Post a new job",
};

const Page = () => {
  return (
    <main className="m-auto my-10 max-w-screen-lg px-3 py-2 space-y-10">
      <div className="space-y-5 text-center">
        <h1 className="text-xl font-bold">Find your perfect developer</h1>
        <p className="text-muted-foreground">
          Get your job posting seen by thousands of job seekers.
        </p>
      </div>

      <CreateJobForm />
    </main>
  );
};

export default Page;
