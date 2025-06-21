
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line 
} from 'recharts';
import { Loader2, Calendar, BarChart2, FileSpreadsheet } from 'lucide-react';
import PerformanceReports from '../analytics/PerformanceReports';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AnalyticsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState('last30');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');
  
  // Example data - would be fetched from your API/database
  const engagementData = [
    { name: 'Mon', likes: 400, comments: 240, shares: 180 },
    { name: 'Tue', likes: 300, comments: 139, shares: 221 },
    { name: 'Wed', likes: 200, comments: 980, shares: 190 },
    { name: 'Thu', likes: 278, comments: 390, shares: 200 },
    { name: 'Fri', likes: 189, comments: 480, shares: 218 },
    { name: 'Sat', likes: 239, comments: 380, shares: 250 },
    { name: 'Sun', likes: 349, comments: 430, shares: 210 },
  ];
  
  const platformData = [
    { name: 'Facebook', value: 400 },
    { name: 'Twitter', value: 300 },
    { name: 'Instagram', value: 300 },
    { name: 'LinkedIn', value: 200 },
    { name: 'YouTube', value: 100 },
  ];
  
  const contentData = [
    { name: 'Jan', articles: 400, videos: 240, images: 180 },
    { name: 'Feb', articles: 300, videos: 139, images: 221 },
    { name: 'Mar', articles: 200, videos: 980, images: 190 },
    { name: 'Apr', articles: 278, videos: 390, images: 200 },
    { name: 'May', articles: 189, videos: 480, images: 218 },
    { name: 'Jun', articles: 239, videos: 380, images: 250 },
  ];
  
  return (
    <div className="space-y-6 bg-transparent">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
      </div>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="glass-card border-white/20">
        <TabsList className="glass-card border-white/20 bg-dark-secondary/50">
          <TabsTrigger value="overview" className="data-[state=active]:bg-neon-electric/20 data-[state=active]:text-white text-gray-300">Dashboard Overview</TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-neon-electric/20 data-[state=active]:text-white text-gray-300">Performance Reports</TabsTrigger>
          <TabsTrigger value="insights" className="data-[state=active]:bg-neon-electric/20 data-[state=active]:text-white text-gray-300">Content Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card className="glass-card border-white/20 bg-dark-secondary/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Total Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">8,942</div>
                <p className="text-xs text-gray-400">+12% from last month</p>
              </CardContent>
            </Card>
            <Card className="glass-card border-white/20 bg-dark-secondary/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Follower Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">+1,234</div>
                <p className="text-xs text-gray-400">+8% from last month</p>
              </CardContent>
            </Card>
            <Card className="glass-card border-white/20 bg-dark-secondary/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Post Reach</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">245,678</div>
                <p className="text-xs text-gray-400">+23% from last month</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Performance Metrics</h2>
            <div className="flex items-center space-x-4">
              <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                <SelectTrigger className="w-[180px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select Platform" />
                </SelectTrigger>
                <SelectContent className="bg-dark-primary border-white/20">
                  <SelectItem value="all" className="text-white hover:bg-white/10">All Platforms</SelectItem>
                  <SelectItem value="facebook" className="text-white hover:bg-white/10">Facebook</SelectItem>
                  <SelectItem value="twitter" className="text-white hover:bg-white/10">Twitter</SelectItem>
                  <SelectItem value="instagram" className="text-white hover:bg-white/10">Instagram</SelectItem>
                  <SelectItem value="linkedin" className="text-white hover:bg-white/10">LinkedIn</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[180px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent className="bg-dark-primary border-white/20">
                  <SelectItem value="last7" className="text-white hover:bg-white/10">Last 7 days</SelectItem>
                  <SelectItem value="last30" className="text-white hover:bg-white/10">Last 30 days</SelectItem>
                  <SelectItem value="last90" className="text-white hover:bg-white/10">Last 90 days</SelectItem>
                  <SelectItem value="year" className="text-white hover:bg-white/10">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card border-white/20 bg-dark-secondary/50">
              <CardHeader>
                <CardTitle className="text-white">Engagement Metrics</CardTitle>
                <CardDescription className="text-gray-300">Weekly performance breakdown</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                {isLoading ? (
                  <div className="flex justify-center items-center h-full">
                    <Loader2 className="h-8 w-8 animate-spin text-neon-electric" />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={engagementData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="likes" fill="#8884d8" name="Likes" />
                      <Bar dataKey="comments" fill="#82ca9d" name="Comments" />
                      <Bar dataKey="shares" fill="#ffc658" name="Shares" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
            
            <Card className="glass-card border-white/20 bg-dark-secondary/50">
              <CardHeader>
                <CardTitle className="text-white">Platform Distribution</CardTitle>
                <CardDescription className="text-gray-300">Engagement by platform</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={platformData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {platformData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} engagements`, 'Count']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Platform Performance</h3>
                    <div className="space-y-2">
                      {platformData.map((platform, index) => (
                        <div key={platform.name} className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-2" 
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="text-gray-300">{platform.name}</span>
                          </div>
                          <span className="font-medium text-white">{platform.value} engagements</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="glass-card border-white/20 bg-dark-secondary/50">
            <CardHeader>
              <CardTitle className="text-white">Content Performance</CardTitle>
              <CardDescription className="text-gray-300">Performance by content type over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={contentData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="articles" fill="#8884d8" name="Articles" />
                  <Bar dataKey="videos" fill="#82ca9d" name="Videos" />
                  <Bar dataKey="images" fill="#ffc658" name="Images" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <PerformanceReports className="mt-6" />
        </TabsContent>
        
        <TabsContent value="insights" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="glass-card border-white/20 bg-dark-secondary/50">
              <CardHeader className="flex flex-row items-center space-y-0">
                <div className="bg-neon-electric/20 p-3 rounded-lg mr-3">
                  <Calendar className="h-5 w-5 text-neon-electric" />
                </div>
                <div>
                  <CardTitle className="text-sm text-white">Best Posting Times</CardTitle>
                  <CardDescription className="text-gray-300">Based on engagement data</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white">Weekdays</span>
                    <span className="text-gray-300">6:00 PM - 9:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white">Weekends</span>
                    <span className="text-gray-300">11:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white">Best day</span>
                    <span className="text-gray-300">Thursday</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white">Worst day</span>
                    <span className="text-gray-300">Monday</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-sm text-gray-400">
                    Posts published on Thursday evenings receive 42% more engagement.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card border-white/20 bg-dark-secondary/50">
              <CardHeader className="flex flex-row items-center space-y-0">
                <div className="bg-neon-electric/20 p-3 rounded-lg mr-3">
                  <BarChart2 className="h-5 w-5 text-neon-electric" />
                </div>
                <div>
                  <CardTitle className="text-sm text-white">Content Format</CardTitle>
                  <CardDescription className="text-gray-300">Highest performing types</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white">Videos</span>
                    <span className="text-green-400">+35% engagement</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white">Carousels</span>
                    <span className="text-green-400">+28% engagement</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white">Images</span>
                    <span className="text-green-400">+15% engagement</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white">Text only</span>
                    <span className="text-red-400">-5% engagement</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-sm text-gray-400">
                    Short-form video content (30-60 seconds) performs best overall.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card border-white/20 bg-dark-secondary/50">
              <CardHeader className="flex flex-row items-center space-y-0">
                <div className="bg-neon-electric/20 p-3 rounded-lg mr-3">
                  <FileSpreadsheet className="h-5 w-5 text-neon-electric" />
                </div>
                <div>
                  <CardTitle className="text-sm text-white">Hashtag Performance</CardTitle>
                  <CardDescription className="text-gray-300">Most effective tags</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white">#marketing</span>
                    <span className="text-gray-300">450 uses</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white">#socialmedia</span>
                    <span className="text-gray-300">380 uses</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white">#digital</span>
                    <span className="text-gray-300">320 uses</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white">#business</span>
                    <span className="text-gray-300">290 uses</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-sm text-gray-400">
                    Using 5-7 relevant hashtags increases post reach by ~28%.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="glass-card border-white/20 bg-dark-secondary/50">
            <CardHeader>
              <CardTitle className="text-white">Content Recommendations</CardTitle>
              <CardDescription className="text-gray-300">AI-powered suggestions based on your performance data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-white/20 rounded-lg bg-white/5">
                  <h3 className="text-lg font-medium mb-2 text-white">Improve Video Content</h3>
                  <p className="text-gray-300 mb-2">
                    Your video content is performing 35% better than other formats. Consider increasing video production with these specifics:
                  </p>
                  <ul className="list-disc list-inside text-gray-400 space-y-1">
                    <li>Focus on short-form videos (30-60 seconds)</li>
                    <li>Include captions for better accessibility</li>
                    <li>Post videos on Thursday evenings for maximum reach</li>
                    <li>Include a clear call-to-action in the first 5 seconds</li>
                  </ul>
                </div>
                
                <div className="p-4 border border-white/20 rounded-lg bg-white/5">
                  <h3 className="text-lg font-medium mb-2 text-white">Optimize Hashtag Strategy</h3>
                  <p className="text-gray-300 mb-2">
                    Data shows your hashtag usage could be more effective. Consider these adjustments:
                  </p>
                  <ul className="list-disc list-inside text-gray-400 space-y-1">
                    <li>Use 5-7 highly relevant hashtags per post</li>
                    <li>Mix popular (#marketing) with niche (#digitalstrategy2025) hashtags</li>
                    <li>Create a branded hashtag for your content</li>
                    <li>Research trending hashtags in your industry weekly</li>
                  </ul>
                </div>
                
                <div className="p-4 border border-white/20 rounded-lg bg-white/5">
                  <h3 className="text-lg font-medium mb-2 text-white">Audience Targeting</h3>
                  <p className="text-gray-300 mb-2">
                    Your content performs best with the 25-34 age demographic. Consider:
                  </p>
                  <ul className="list-disc list-inside text-gray-400 space-y-1">
                    <li>Develop content specifically addressing this demographic's interests</li>
                    <li>Use language and cultural references that resonate with this age group</li>
                    <li>Schedule content during their peak usage hours (evenings and weekends)</li>
                    <li>Conduct polls and surveys to better understand their preferences</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsPage;
