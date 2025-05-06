
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface UsersTableProps {
  onUserAction: (action: string, userId: string | number) => void;
}

// Sample user data
const users = [
  {
    id: "001",
    name: "John Smith",
    email: "john.smith@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "Today, 10:30 AM"
  },
  {
    id: "002",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "Editor",
    status: "Active",
    lastLogin: "Yesterday, 3:45 PM"
  },
  {
    id: "003",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    role: "User",
    status: "Trial",
    lastLogin: "Apr 22, 9:15 AM"
  },
  {
    id: "004",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "User",
    status: "Inactive",
    lastLogin: "Mar 15, 2:20 PM"
  }
];

const UsersTable = ({ onUserAction }: UsersTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Badge 
                  variant="outline" 
                  className={
                    user.status === "Active" ? "bg-green-50 text-green-600" : 
                    user.status === "Trial" ? "bg-blue-50 text-blue-600" :
                    "bg-gray-100 text-gray-600"
                  }
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell>{user.lastLogin}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onUserAction("edit", user.id)}
                  >
                    Edit
                  </Button>
                  {user.status !== "Inactive" && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50" 
                      onClick={() => onUserAction("suspend", user.id)}
                    >
                      Suspend
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
