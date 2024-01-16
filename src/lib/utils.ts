import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict } from "date-fns";
import { JobFilterValues } from "./validation";
import { UserResource } from "@clerk/types";
import { User } from "@clerk/nextjs/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMoney(price: number) {
  return Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(price);
}

export function relativeDate(date: Date | string) {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
  });
}

export function setTitleWithParams(filteredValues: JobFilterValues) {
  const { q, location, remote, type } = filteredValues;

  const textPrefix = q
    ? `${q} jobs`
    : type
      ? `${type} jobs`
      : remote
        ? `Remote jobs`
        : "All developer jobs";

  const textSuffix = location ? ` in ${location}` : "";

  return `${textPrefix}${textSuffix}`;
}

export function setSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^/w-]+/g, "");
}

export function isAdmin(user: UserResource | User) {
  return user.publicMetadata?.role === "admin";
}
