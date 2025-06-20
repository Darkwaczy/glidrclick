
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface StatCardProps {
  name: string;
  value: string;
  change: string;
}

const StatCard = ({ name, value, change }: StatCardProps) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium text-gray-500">{name}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-green-600 flex items-center mt-1">
        <span className="flex h-2 w-2 mr-1">↑</span>{change} from last month
      </p>
    </CardContent>
  </Card>
);

const DashboardStats = () => {
  const systemStats = [
    { name: "Posts Generated", value: "1,247", change: "+18%" },
    { name: "Active Users", value: "384", change: "+24%" },
    { name: "API Requests", value: "15.2K", change: "+32%" },
    { name: "Storage Used", value: "48 GB", change: "+15%" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {systemStats.map((stat, index) => (
        <StatCard key={index} name={stat.name} value={stat.value} change={stat.change} />
      ))}
    </div>
  );
};

export default DashboardStats;
