
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { User, Mail, Calendar, Phone, Globe, Lock, Key, Upload } from "lucide-react";

const ProfilePage = () => {
  const [profileImage, setProfileImage] = useState("/placeholder.svg");
  
  const handleSaveProfile = () => {
    toast.success("Profile updated successfully!");
  };
  
  const handleChangePassword = () => {
    toast.success("Password changed successfully!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Your Profile</h1>
        <p className="text-gray-600">Manage your account details and preferences</p>
      </div>
      
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile Details</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="w-24 h-24 border">
                    <img src={profileImage} alt="Profile" className="object-cover" />
                  </Avatar>
                  
                  <Button variant="outline" size="sm" onClick={() => toast.info("Upload functionality would be implemented here")}>
                    <Upload size={16} className="mr-2" /> Change Photo
                  </Button>
                </div>
                
                <div className="space-y-6 flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="First Name" defaultValue="John" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Last Name" defaultValue="Smith" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="flex">
                        <Mail size={16} className="mr-2 mt-2.5 text-gray-500" />
                        <Input id="email" type="email" placeholder="Email" defaultValue="john.smith@example.com" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex">
                        <Phone size={16} className="mr-2 mt-2.5 text-gray-500" />
                        <Input id="phone" placeholder="Phone Number" defaultValue="+1 234 567 8900" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio" 
                      placeholder="Tell us about yourself" 
                      defaultValue="Marketing specialist with 5+ years of experience in digital content creation." 
                      rows={4} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <div className="flex">
                      <Globe size={16} className="mr-2 mt-2.5 text-gray-500" />
                      <Input id="website" placeholder="Your website" defaultValue="https://example.com" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="flex">
                  <Lock size={16} className="mr-2 mt-2.5 text-gray-500" />
                  <Input id="currentPassword" type="password" placeholder="Current Password" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="flex">
                    <Key size={16} className="mr-2 mt-2.5 text-gray-500" />
                    <Input id="newPassword" type="password" placeholder="New Password" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="flex">
                    <Key size={16} className="mr-2 mt-2.5 text-gray-500" />
                    <Input id="confirmPassword" type="password" placeholder="Confirm New Password" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleChangePassword}>Change Password</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Two-factor authentication is disabled</h3>
                  <p className="text-sm text-gray-500">Protect your account with 2FA</p>
                </div>
                <Button onClick={() => toast.success("Setting up 2FA...")}>Enable</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>Manage your subscription and billing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-lg">Pro Plan</h3>
                      <p className="text-sm text-gray-600">$29/month • Renews on May 15, 2025</p>
                    </div>
                    <Button variant="outline" onClick={() => toast.info("Opening upgrade options...")}>
                      Upgrade
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-lg">
                  <div className="p-4 border-b">
                    <h3 className="font-medium">Payment Method</h3>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-10 h-6 bg-blue-600 rounded mr-3"></div>
                        <span>•••• •••• •••• 4242</span>
                      </div>
                      <Button variant="ghost" onClick={() => toast.info("Changing payment method...")}>
                        Change
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg">
                  <div className="p-4 border-b">
                    <h3 className="font-medium">Billing History</h3>
                  </div>
                  <div className="divide-y">
                    {[
                      { date: "Apr 15, 2025", amount: "$29.00", status: "Paid" },
                      { date: "Mar 15, 2025", amount: "$29.00", status: "Paid" },
                      { date: "Feb 15, 2025", amount: "$29.00", status: "Paid" }
                    ].map((invoice, index) => (
                      <div key={index} className="p-4 flex justify-between">
                        <div>
                          <p className="font-medium">{invoice.date}</p>
                          <p className="text-sm text-gray-500">Monthly subscription</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{invoice.amount}</p>
                          <p className="text-sm text-green-600">{invoice.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
