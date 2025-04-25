
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

interface User {
  id: number;
  name: string;
  email: string;
  plan: string;
  status: string;
  posts: number;
  joined: string;
}

const UsersTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", plan: "Pro", status: "active", posts: 24, joined: "Apr 10, 2025" },
    { id: 2, name: "Sarah Johnson", email: "sarah@example.com", plan: "Elite", status: "active", posts: 47, joined: "Mar 22, 2025" },
    { id: 3, name: "Michael Brown", email: "michael@example.com", plan: "Free Trial", status: "trial", posts: 3, joined: "Apr 20, 2025" },
    { id: 4, name: "Emily Wilson", email: "emily@example.com", plan: "Pro", status: "active", posts: 18, joined: "Feb 15, 2025" },
    { id: 5, name: "David Lee", email: "david@example.com", plan: "Pro", status: "suspended", posts: 12, joined: "Jan 5, 2025" },
  ];
  
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesPlan = planFilter === "all" || user.plan.toLowerCase() === planFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const handleViewUser = (userId: number) => {
    toast.info(`Viewing user ${userId}`);
  };

  const handleEditUser = (userId: number) => {
    toast.info(`Editing user ${userId}`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white p-4 rounded-lg border">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search users..." 
            className="pl-10 w-full sm:w-[300px]"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="trial">Trial</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
          <Select value={planFilter} onValueChange={setPlanFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Plans</SelectItem>
              <SelectItem value="free trial">Free Trial</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
              <SelectItem value="elite">Elite</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("all");
              setPlanFilter("all");
            }}
          >
            <Filter size={16} />
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Posts</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-semibold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={user.plan === "Elite" ? "default" : "outline"} className={user.plan === "Elite" ? "bg-glidr-purple" : ""}>
                    {user.plan}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={
                    user.status === "active" ? "text-green-600 bg-green-50" : 
                    user.status === "trial" ? "text-blue-600 bg-blue-50" : 
                    "text-red-600 bg-red-50"
                  }>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{user.posts}</TableCell>
                <TableCell>{user.joined}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewUser(user.id)}
                    >
                      View
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditUser(user.id)}
                    >
                      Edit
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UsersTable;
