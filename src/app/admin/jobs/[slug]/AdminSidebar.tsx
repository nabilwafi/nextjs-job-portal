import ApprovedButton from "@/components/ApprovedButton";
import DeleteButton from "@/components/DeleteButton";
import { Job } from "@prisma/client";
import React from "react";

interface AdminSidebarProps {
  job: Job;
}

const AdminSidebar = ({ job }: AdminSidebarProps) => {
  return (
    <aside className="flex w-[200px] flex-none flex-row items-center gap-2 md:flex-col md:items-center">
      {job.approved ? (
        <span className="text-center font-semibold text-green-600">
          Approved
        </span>
      ) : (
        <ApprovedButton jobId={job.id} />
      )}
      <DeleteButton jobId={job.id} />
    </aside>
  );
};

export default AdminSidebar;
