
import React, { useState } from "react";
import { Table, TableHeader, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Lock, Unlock, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface UsersTableProps {
  onUserAction: (action: string, userId: string) => void;
}

const UsersTable = ({ onUserAction }: UsersTableProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data: users, isLoading } = useQuery({
    queryKey: ['admin-users', roleFilter, currentPage],
    queryFn: async () => {
      // First get users from auth
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers({
        page: currentPage,
        perPage: pageSize,
      });
      
      if (authError) {
        console.error("Error fetching users:", authError);
        return { users: [], count: 0 };
      }

      // Get role information for these users
      const userIds = authUsers.users.map(user => user.id);
      
      // Get roles for these users
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role')
        .in('user_id', userIds);
      
      if (rolesError) {
        console.error("Error fetching roles:", rolesError);
      }
      
      // Create a map of user_id to role
      const roleMap = (roles || []).reduce((acc: Record<string, string>, curr) => {
        acc[curr.user_id] = curr.role;
        return acc;
      }, {});
      
      // Combine the data
      const usersWithRoles = authUsers.users.map(user => ({
        ...user,
        role: roleMap[user.id] || 'user'
      }));
      
      // Apply role filter if needed
      let filteredUsers = usersWithRoles;
      if (roleFilter) {
        filteredUsers = usersWithRoles.filter(user => user.role === roleFilter);
      }
      
      return { 
        users: filteredUsers, 
        count: authUsers.count 
      };
    }
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'INACTIVE':
        return <Badge variant="outline">Inactive</Badge>;
      case 'BANNED':
        return <Badge className="bg-red-500">Banned</Badge>;
      case 'SUSPENDED':
        return <Badge variant="secondary">Suspended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  if (isLoading) {
    return <div className="flex justify-center p-8">Loading users...</div>;
  }
  
  const filteredUsers = users?.users.filter(user => 
    user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone?.includes(searchQuery) ||
    user.id.includes(searchQuery)
  ) || [];
  
  const totalPages = Math.ceil((users?.count || 0) / pageSize);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <Input
          placeholder="Search users by email, phone, or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
        
        <div className="space-y-1">
          <Label>Filter by role</Label>
          <RadioGroup 
            defaultValue={roleFilter} 
            className="flex space-x-2" 
            onValueChange={setRoleFilter}
          >
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="" id="all" />
              <Label htmlFor="all">All</Label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="admin" id="admin" />
              <Label htmlFor="admin">Admin</Label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="moderator" id="moderator" />
              <Label htmlFor="moderator">Moderator</Label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="user" id="user" />
              <Label htmlFor="user">User</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.email || "No Email"}</TableCell>
                  <TableCell>{user.phone || "No Phone"}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'admin' ? "default" : user.role === 'moderator' ? "secondary" : "outline"}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onUserAction('view', user.id)}>
                          <Edit className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onUserAction('edit', user.id)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onUserAction('suspend', user.id)}>
                          <Lock className="mr-2 h-4 w-4" /> Suspend User
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onUserAction('activate', user.id)}>
                          <Unlock className="mr-2 h-4 w-4" /> Activate User
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => onUserAction('delete', user.id)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} 
            />
          </PaginationItem>
          
          {Array.from({length: totalPages}, (_, i) => i + 1).map(page => (
            <PaginationItem key={page}>
              <PaginationLink 
                onClick={() => setCurrentPage(page)}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} 
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default UsersTable;
