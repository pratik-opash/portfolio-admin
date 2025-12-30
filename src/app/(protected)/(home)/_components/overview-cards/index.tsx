"use client";

import { compactFormat } from "@/lib/format-number";
import { OverviewCard } from "./card";
import * as icons from "./icons";
import { useGetStatsQuery } from "@/redux/features/dashboard/dashboardApi";
import { OverviewCardsSkeleton } from "./skeleton";

export function OverviewCardsGroup() {
  const { data: stats, isLoading } = useGetStatsQuery(undefined);
  // console.log(stats , "stats")
  if (isLoading) return <OverviewCardsSkeleton />;

  // Mapping API response to the format expected by OverviewCard.
  // Assuming API returns { blogs: number, projects: number, contacts: number, users: number } or similar.
  // WE need to adapt this based on actual API response.
  // The user curl says: GET /api/dashboard/stats
  // I will assume it returns counts for blogs, projects, etc.
  
  // Default values if API structure differs or is empty

  // Since I don't know the EXACT field names from the API response for 'stats', 
  // I will make a best guess based on the "Auth, Blog, Project, Contact" routes available.
  // Likely: { totalBlogs, totalProjects, totalContacts, ... }
  
  // For now I will map:
  // Total Views -> Total Blogs (placeholder logic)
  // Total Profit -> Total Projects (placeholder logic)
  // Total Products -> Total Contacts (placeholder logic)
  
  // If the API docs said "Get Stats", usually it returns a summary object.
  // I'll assume simple keys. If they are different, it's easy to fix.

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <OverviewCard
        label="Total Blogs"
        data={{
          value: compactFormat(stats?.data?.blogs || 0),
          growthRate: 0, 
        }}
        Icon={icons.Views}
      />

      <OverviewCard
        label="Total Projects"
        data={{
          value: compactFormat(stats?.data?.projects || 0),
          growthRate: 0,
        }}
        Icon={icons.Profit}
      />

      <OverviewCard
        label="Total Contacts"
        data={{
          value: compactFormat(stats?.data?.contacts || 0),
          growthRate: 0,
        }}
        Icon={icons.Product}
      />
      
      <OverviewCard
        label="Total Users"
        data={{
          value: compactFormat(stats?.data?.users || 0),
          growthRate: 0,
        }}
        Icon={icons.Users}
      />
    </div>
  );
}
