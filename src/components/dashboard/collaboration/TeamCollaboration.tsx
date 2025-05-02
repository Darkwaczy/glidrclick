
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  User,
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  Check,
} from "lucide-react";

type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  avatar?: string;
};

type ContentApprovalItem = {
  id: string;
  title: string;
  submittedBy: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
  type: "post" | "comment";
};

type ActivityLogItem = {
  id: string;
  action: string;
  performedBy: string;
  timestamp: string;
  entityType: string;
  entityId: string;
};

const TeamCollaboration: React.FC = () => {
  const [activeTab, setActiveTab] = useState("team");
  const [inviteEmail, setInviteEmail] = useState("");

  // Mock data for demonstration
  const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "admin",
      avatar: "",
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael@example.com",
      role: "editor",
      avatar: "",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      email: "emily@example.com",
      role: "viewer",
      avatar: "",
    },
  ];

  const approvalItems: ContentApprovalItem[] = [
    {
      id: "1",
      title: "10 Ways to Boost Your Marketing Strategy",
      submittedBy: "Michael Chen",
      submittedAt: "2025-05-01T10:30:00Z",
      status: "pending",
      type: "post",
    },
    {
      id: "2",
      title: "New Product Announcement",
      submittedBy: "Emily Rodriguez",
      submittedAt: "2025-05-01T09:15:00Z",
      status: "approved",
      type: "post",
    },
    {
      id: "3",
      title: "Customer Feedback Response",
      submittedBy: "Sarah Johnson",
      submittedAt: "2025-04-30T16:45:00Z",
      status: "rejected",
      type: "comment",
    },
  ];

  const activityLogs: ActivityLogItem[] = [
    {
      id: "1",
      action: "created post",
      performedBy: "Sarah Johnson",
      timestamp: "2025-05-02T08:30:00Z",
      entityType: "post",
      entityId: "post-123",
    },
    {
      id: "2",
      action: "approved content",
      performedBy: "Michael Chen",
      timestamp: "2025-05-01T15:20:00Z",
      entityType: "post",
      entityId: "post-122",
    },
    {
      id: "3",
      action: "invited team member",
      performedBy: "Sarah Johnson",
      timestamp: "2025-05-01T11:10:00Z",
      entityType: "user",
      entityId: "user-456",
    },
    {
      id: "4",
      action: "rejected content",
      performedBy: "Sarah Johnson",
      timestamp: "2025-04-30T14:25:00Z",
      entityType: "comment",
      entityId: "comment-789",
    },
    {
      id: "5",
      action: "changed role",
      performedBy: "Sarah Johnson",
      timestamp: "2025-04-30T10:15:00Z",
      entityType: "user",
      entityId: "user-345",
    },
  ];

  const handleInviteMember = () => {
    if (!inviteEmail || !inviteEmail.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    toast.success(`Invitation sent to ${inviteEmail}`);
    setInviteEmail("");
  };

  const handleChangeRole = (userId: string, newRole: "admin" | "editor" | "viewer") => {
    toast.success(`Role updated successfully`);
  };

  const handleRemoveUser = (userId: string) => {
    toast.success(`Team member removed successfully`);
  };

  const handleApprovalAction = (itemId: string, action: "approve" | "reject") => {
    toast.success(`Content ${action === "approve" ? "approved" : "rejected"} successfully`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Team Collaboration</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="team">Team Management</TabsTrigger>
          <TabsTrigger value="approvals">Content Approvals</TabsTrigger>
          <TabsTrigger value="activity">Activity Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="team" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h3 className="text-lg font-medium">Team Members</h3>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter email address"
                    className="w-full md:w-64"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                  <Button onClick={handleInviteMember}>
                    <Plus className="mr-2 h-4 w-4" /> Invite
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="bg-purple-100 text-purple-800">
                          {member.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <select 
                        className="border rounded px-2 py-1 text-sm" 
                        value={member.role}
                        onChange={(e) => handleChangeRole(
                          member.id, 
                          e.target.value as "admin" | "editor" | "viewer"
                        )}
                      >
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                        <option value="viewer">Viewer</option>
                      </select>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleRemoveUser(member.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="approvals" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Content Approvals</h3>
              
              <div className="space-y-4">
                {approvalItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{item.title}</h4>
                          <Badge variant={
                            item.status === "pending" ? "outline" :
                            item.status === "approved" ? "default" : "destructive"
                          }>
                            {item.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500">
                          Submitted by {item.submittedBy} • {formatDate(item.submittedAt)}
                        </p>
                      </div>
                      
                      {item.status === "pending" && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-green-600 border-green-600 hover:bg-green-50"
                            onClick={() => handleApprovalAction(item.id, "approve")}
                          >
                            <Check className="h-4 w-4 mr-1" /> Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-red-600 border-red-600 hover:bg-red-50"
                            onClick={() => handleApprovalAction(item.id, "reject")}
                          >
                            <X className="h-4 w-4 mr-1" /> Reject
                          </Button>
                        </div>
                      )}
                    </div>
                    <div className="text-sm bg-gray-50 p-2 rounded">
                      {item.type === "post" ? "Blog post content preview..." : "Comment text preview..."}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Activity Logs</h3>
              
              <div className="space-y-4">
                {activityLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-3 border-b pb-3">
                    <div className="bg-gray-100 p-2 rounded-full">
                      {log.action.includes("approved") ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : log.action.includes("rejected") ? (
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      ) : log.action.includes("invited") || log.action.includes("role") ? (
                        <User className="h-5 w-5 text-blue-600" />
                      ) : (
                        <Clock className="h-5 w-5 text-gray-600" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <p>
                        <span className="font-medium">{log.performedBy}</span>{" "}
                        <span>{log.action}</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(log.timestamp)} • {log.entityType} #{log.entityId.split("-")[1]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamCollaboration;
