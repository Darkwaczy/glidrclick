
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { User, Mail, Calendar, Phone, Globe, Lock, Key, Upload, CheckCircle } from "lucide-react";

const ProfilePage = () => {
  const [profileImage, setProfileImage] = useState("/placeholder.svg");
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Smith");
  const [email, setEmail] = useState("john.smith@example.com");
  const [phone, setPhone] = useState("+1 234 567 8900");
  const [bio, setBio] = useState("Marketing specialist with 5+ years of experience in digital content creation.");
  const [website, setWebsite] = useState("https://example.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoFactorSetupOpen, setTwoFactorSetupOpen] = useState(false);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Create a temporary URL for the image
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
    toast.success("Profile picture updated!");
  };
  
  const handleSaveProfile = () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    toast.success("Profile updated successfully!");
  };
  
  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    
    if (newPassword.length < 8) {
      toast.error("Password should be at least 8 characters long");
      return;
    }
    
    // Reset form and show success message
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    toast.success("Password changed successfully!");
  };
  
  const handleSetupTwoFactor = () => {
    // In a real app, this would open a setup flow for 2FA
    setTwoFactorSetupOpen(true);
  };
  
  const handleCompleteTwoFactorSetup = () => {
    setTwoFactorEnabled(true);
    setTwoFactorSetupOpen(false);
    toast.success("Two-factor authentication enabled successfully!");
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
                  
                  <div>
                    <input
                      id="profile-image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <Button
                      variant="outline" 
                      size="sm"
                      onClick={() => document.getElementById('profile-image-upload')?.click()}
                    >
                      <Upload size={16} className="mr-2" /> Change Photo
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-6 flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        placeholder="First Name" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        placeholder="Last Name" 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="flex">
                        <Mail size={16} className="mr-2 mt-2.5 text-gray-500" />
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="Email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex">
                        <Phone size={16} className="mr-2 mt-2.5 text-gray-500" />
                        <Input 
                          id="phone" 
                          placeholder="Phone Number" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio" 
                      placeholder="Tell us about yourself" 
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <div className="flex">
                      <Globe size={16} className="mr-2 mt-2.5 text-gray-500" />
                      <Input 
                        id="website" 
                        placeholder="Your website" 
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
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
                  <Input 
                    id="currentPassword" 
                    type="password" 
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="flex">
                    <Key size={16} className="mr-2 mt-2.5 text-gray-500" />
                    <Input 
                      id="newPassword" 
                      type="password" 
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="flex">
                    <Key size={16} className="mr-2 mt-2.5 text-gray-500" />
                    <Input 
                      id="confirmPassword" 
                      type="password" 
                      placeholder="Confirm New Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
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
              {twoFactorSetupOpen ? (
                <div className="space-y-4">
                  <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center">
                    <div className="w-40 h-40 bg-gray-200 flex items-center justify-center">
                      <p className="text-sm text-gray-500">QR Code Placeholder</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="verification-code">Enter Verification Code</Label>
                    <Input id="verification-code" placeholder="123456" />
                  </div>
                  
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => setTwoFactorSetupOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCompleteTwoFactorSetup}>
                      Verify and Enable
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div>
                    {twoFactorEnabled ? (
                      <>
                        <h3 className="font-medium flex items-center">
                          <CheckCircle size={16} className="text-green-500 mr-2" />
                          Two-factor authentication is enabled
                        </h3>
                        <p className="text-sm text-gray-500">Your account is protected by 2FA</p>
                      </>
                    ) : (
                      <>
                        <h3 className="font-medium">Two-factor authentication is disabled</h3>
                        <p className="text-sm text-gray-500">Protect your account with 2FA</p>
                      </>
                    )}
                  </div>
                  <Button onClick={handleSetupTwoFactor}>
                    {twoFactorEnabled ? "Reconfigure" : "Enable"}
                  </Button>
                </div>
              )}
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
