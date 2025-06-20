
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Download, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

interface PerformanceReportsProps {
  className?: string;
}

const PerformanceReports: React.FC<PerformanceReportsProps> = ({ className }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("last30days");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
  // Sample data - would be fetched from API
  const engagementData = [
    { date: '2023-01-01', likes: 120, comments: 30, shares: 15, platform: 'facebook' },
    { date: '2023-01-08', likes: 150, comments: 45, shares: 20, platform: 'facebook' },
    { date: '2023-01-15', likes: 170, comments: 60, shares: 25, platform: 'facebook' },
    { date: '2023-01-22', likes: 190, comments: 55, shares: 30, platform: 'facebook' },
    { date: '2023-01-29', likes: 210, comments: 70, shares: 35, platform: 'facebook' },
    { date: '2023-02-05', likes: 230, comments: 80, shares: 40, platform: 'facebook' },
  ];
  
  const audienceData = [
    { name: '18-24', value: 25 },
    { name: '25-34', value: 35 },
    { name: '35-44', value: 20 },
    { name: '45-54', value: 12 },
    { name: '55+', value: 8 },
  ];
  
  const contentTypeData = [
    { name: 'Images', value: 45 },
    { name: 'Videos', value: 30 },
    { name: 'Text', value: 15 },
    { name: 'Links', value: 10 },
  ];
  
  const generateReport = () => {
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      toast.success("Report generated successfully!");
    }, 2000);
  };
  
  const exportReport = (format: string) => {
    setIsExporting(true);
    
    // Simulate export
    setTimeout(() => {
      setIsExporting(false);
      toast.success(`Report exported as ${format.toUpperCase()}!`);
    }, 1500);
  };
  
  const emailReport = () => {
    toast.success("Report has been emailed to your account!");
  };
  
  return (
    <div className={className}>
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-2xl font-bold">Performance Reports</h2>
          <p className="text-gray-500">
            Analyze your social media performance across platforms
          </p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Time Period</SelectLabel>
                <SelectItem value="last7days">Last 7 days</SelectItem>
                <SelectItem value="last30days">Last 30 days</SelectItem>
                <SelectItem value="last90days">Last 3 months</SelectItem>
                <SelectItem value="lastyear">Last year</SelectItem>
                <SelectItem value="custom">Custom range...</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          
          <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Platform</SelectLabel>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          
          <Button onClick={generateReport} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Report'
            )}
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="engagement" className="space-y-6">
        <TabsList>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="content">Content Performance</TabsTrigger>
          <TabsTrigger value="overview">Executive Summary</TabsTrigger>
        </TabsList>
        
        <TabsContent value="engagement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Metrics Over Time</CardTitle>
              <CardDescription>
                Track likes, comments, and shares across your social media platforms
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={engagementData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="likes" stroke="#8884d8" name="Likes" />
                  <Line type="monotone" dataKey="comments" stroke="#82ca9d" name="Comments" />
                  <Line type="monotone" dataKey="shares" stroke="#ffc658" name="Shares" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Posts</CardTitle>
                <CardDescription>Posts with the highest engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start border-b pb-4">
                      <div className="w-16 h-16 bg-gray-200 rounded mr-4 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium">Post Title {i}</h4>
                        <p className="text-sm text-gray-500 mb-2">Posted on Feb {i + 10}, 2023</p>
                        <div className="flex text-sm gap-4">
                          <span>❤️ {120 + i * 50} likes</span>
                          <span>💬 {30 + i * 15} comments</span>
                          <span>🔄 {15 + i * 5} shares</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Engagement by Platform</CardTitle>
                <CardDescription>Comparison across social networks</CardDescription>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { platform: 'Facebook', likes: 400, comments: 240, shares: 180 },
                      { platform: 'Instagram', likes: 300, comments: 198, shares: 120 },
                      { platform: 'Twitter', likes: 200, comments: 150, shares: 220 },
                      { platform: 'LinkedIn', likes: 150, comments: 90, shares: 40 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="platform" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="likes" fill="#8884d8" />
                    <Bar dataKey="comments" fill="#82ca9d" />
                    <Bar dataKey="shares" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="audience" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Audience Demographics</CardTitle>
                <CardDescription>Age distribution of your audience</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={audienceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {audienceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Audience Growth</CardTitle>
                <CardDescription>Monthly follower growth by platform</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { month: 'Jan', facebook: 5400, instagram: 4900, twitter: 2400, linkedin: 1400 },
                      { month: 'Feb', facebook: 5900, instagram: 5600, twitter: 2700, linkedin: 1600 },
                      { month: 'Mar', facebook: 6700, instagram: 6300, twitter: 3100, linkedin: 1900 },
                      { month: 'Apr', facebook: 7200, instagram: 7000, twitter: 3400, linkedin: 2200 },
                      { month: 'May', facebook: 7800, instagram: 7800, twitter: 3800, linkedin: 2600 },
                      { month: 'Jun', facebook: 8400, instagram: 8500, twitter: 4100, linkedin: 2900 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="facebook" stroke="#3b5998" />
                    <Line type="monotone" dataKey="instagram" stroke="#e1306c" />
                    <Line type="monotone" dataKey="twitter" stroke="#1da1f2" />
                    <Line type="monotone" dataKey="linkedin" stroke="#0077b5" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Audience Engagement by Time</CardTitle>
              <CardDescription>Optimal posting times based on engagement data</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { time: '6am-9am', engagement: 65 },
                    { time: '9am-12pm', engagement: 80 },
                    { time: '12pm-3pm', engagement: 95 },
                    { time: '3pm-6pm', engagement: 120 },
                    { time: '6pm-9pm', engagement: 140 },
                    { time: '9pm-12am', engagement: 115 },
                    { time: '12am-3am', engagement: 60 },
                    { time: '3am-6am', engagement: 40 },
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="engagement" fill="#8884d8" name="Engagement Level" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="content" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Type Performance</CardTitle>
                <CardDescription>Engagement by content format</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={contentTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {contentTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Engagement']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Hashtags</CardTitle>
                <CardDescription>Most effective hashtags by engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { tag: '#marketing', count: 450, engagement: 12.5 },
                    { tag: '#socialmedia', count: 380, engagement: 11.2 },
                    { tag: '#digital', count: 320, engagement: 10.8 },
                    { tag: '#business', count: 290, engagement: 9.5 },
                    { tag: '#strategy', count: 260, engagement: 8.7 },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <h4 className="font-medium">{item.tag}</h4>
                        <p className="text-sm text-gray-500">Used {item.count} times</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{item.engagement}%</div>
                        <p className="text-sm text-gray-500">Engagement rate</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Content Calendar Effectiveness</CardTitle>
              <CardDescription>Performance by day of week and time of day</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { day: 'Monday', morning: 65, afternoon: 75, evening: 85 },
                    { day: 'Tuesday', morning: 70, afternoon: 80, evening: 90 },
                    { day: 'Wednesday', morning: 75, afternoon: 85, evening: 95 },
                    { day: 'Thursday', morning: 80, afternoon: 90, evening: 100 },
                    { day: 'Friday', morning: 85, afternoon: 95, evening: 105 },
                    { day: 'Saturday', morning: 90, afternoon: 100, evening: 110 },
                    { day: 'Sunday', morning: 95, afternoon: 105, evening: 115 },
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="morning" fill="#8884d8" name="Morning (6am-12pm)" />
                  <Bar dataKey="afternoon" fill="#82ca9d" name="Afternoon (12pm-6pm)" />
                  <Bar dataKey="evening" fill="#ffc658" name="Evening (6pm-12am)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Executive Summary</CardTitle>
              <CardDescription>
                Key performance indicators and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h3 className="text-lg font-medium mb-2">Overall Engagement</h3>
                  <div className="text-3xl font-bold text-blue-600">+12.4%</div>
                  <p className="text-sm text-gray-500">vs. previous period</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h3 className="text-lg font-medium mb-2">Audience Growth</h3>
                  <div className="text-3xl font-bold text-green-600">+8.7%</div>
                  <p className="text-sm text-gray-500">vs. previous period</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h3 className="text-lg font-medium mb-2">Content Performance</h3>
                  <div className="text-3xl font-bold text-purple-600">+15.2%</div>
                  <p className="text-sm text-gray-500">vs. previous period</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Key Insights</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Instagram engagement has increased by 23.5% this period, making it your best performing platform.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Video content is outperforming images by an average of 35% in terms of engagement.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Posts published between 6pm-9pm receive 42% more engagement than those posted in the morning.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Hashtag usage has improved visibility by approximately 28%.</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Recommendations</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">→</span>
                    <span>Increase video content production with a focus on Instagram and Facebook.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">→</span>
                    <span>Optimize posting schedule to focus on evenings (6pm-9pm) for maximum engagement.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">→</span>
                    <span>Expand content targeting the 25-34 age demographic, which shows the highest growth.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">→</span>
                    <span>Utilize more trending hashtags to further increase content visibility.</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => exportReport('pdf')}>
              <Download className="mr-2 h-4 w-4" />
              {isExporting ? 'Exporting...' : 'Export as PDF'}
            </Button>
            <Button variant="outline" onClick={() => exportReport('csv')}>
              <Download className="mr-2 h-4 w-4" />
              Export as CSV
            </Button>
            <Button onClick={emailReport}>
              <Mail className="mr-2 h-4 w-4" />
              Email Report
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceReports;
