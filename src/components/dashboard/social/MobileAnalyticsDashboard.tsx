
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  AreaChart, 
  Area, 
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';

const engagementData = [
  { date: 'Mon', mentions: 5, comments: 10, likes: 28 },
  { date: 'Tue', mentions: 7, comments: 12, likes: 32 },
  { date: 'Wed', mentions: 4, comments: 8, likes: 24 },
  { date: 'Thu', mentions: 9, comments: 15, likes: 42 },
  { date: 'Fri', mentions: 12, comments: 18, likes: 56 },
  { date: 'Sat', mentions: 8, comments: 14, likes: 38 },
  { date: 'Sun', mentions: 6, comments: 11, likes: 30 }
];

const reachData = [
  { date: 'Mon', reach: 1200 },
  { date: 'Tue', reach: 1350 },
  { date: 'Wed', reach: 1100 },
  { date: 'Thu', reach: 1600 },
  { date: 'Fri', reach: 2100 },
  { date: 'Sat', reach: 1800 },
  { date: 'Sun', reach: 1400 }
];

const platformData = [
  { name: 'Facebook', value: 35 },
  { name: 'Instagram', value: 30 },
  { name: 'Twitter', value: 20 },
  { name: 'LinkedIn', value: 15 }
];

const PLATFORM_COLORS = ['#4267B2', '#C13584', '#1DA1F2', '#0A66C2'];

const MobileAnalyticsDashboard: React.FC = () => {
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('week');
  const isMobile = useIsMobile();
  
  // Height for charts based on mobile or desktop
  const chartHeight = isMobile ? 200 : 250;
  
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Analytics Dashboard</CardTitle>
        <div className="flex items-center gap-2 mt-1">
          <Badge 
            variant={period === 'day' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setPeriod('day')}
          >
            Today
          </Badge>
          <Badge 
            variant={period === 'week' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setPeriod('week')}
          >
            This Week
          </Badge>
          <Badge 
            variant={period === 'month' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setPeriod('month')}
          >
            This Month
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-3">
        <Tabs defaultValue="engagement" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="engagement">
              Engagement
            </TabsTrigger>
            <TabsTrigger value="reach">
              Reach
            </TabsTrigger>
            <TabsTrigger value="platforms">
              Platforms
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="engagement">
            <div className="mb-2">
              <h4 className="text-sm font-medium mb-1">Engagement Overview</h4>
              <ResponsiveContainer width="100%" height={chartHeight}>
                <AreaChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="likes" stackId="1" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="comments" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                  <Area type="monotone" dataKey="mentions" stackId="1" stroke="#ffc658" fill="#ffc658" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 grid grid-cols-3 gap-1 text-center">
              <div className="bg-blue-50 p-2 rounded-md">
                <div className="text-sm text-gray-600">Mentions</div>
                <div className="text-xl font-bold">51</div>
              </div>
              <div className="bg-green-50 p-2 rounded-md">
                <div className="text-sm text-gray-600">Comments</div>
                <div className="text-xl font-bold">88</div>
              </div>
              <div className="bg-purple-50 p-2 rounded-md">
                <div className="text-sm text-gray-600">Likes</div>
                <div className="text-xl font-bold">250</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reach">
            <div className="mb-2">
              <h4 className="text-sm font-medium mb-1">Audience Reach</h4>
              <ResponsiveContainer width="100%" height={chartHeight}>
                <LineChart data={reachData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="reach" stroke="#ff7300" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-2 text-center">
              <div className="bg-orange-50 p-2 rounded-md">
                <div className="text-sm text-gray-600">Total Reach</div>
                <div className="text-xl font-bold">9,550</div>
                <div className="text-xs text-green-600">↑ 12% from last week</div>
              </div>
              <div className="bg-blue-50 p-2 rounded-md">
                <div className="text-sm text-gray-600">Avg. Engagement</div>
                <div className="text-xl font-bold">4.2%</div>
                <div className="text-xs text-green-600">↑ 0.5% from last week</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="platforms">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="w-full md:w-1/2">
                <ResponsiveContainer width="100%" height={chartHeight}>
                  <PieChart>
                    <Pie
                      data={platformData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {platformData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PLATFORM_COLORS[index % PLATFORM_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="w-full md:w-1/2 mt-4 md:mt-0">
                <h4 className="text-sm font-medium mb-2">Platform Performance</h4>
                <div className="space-y-2">
                  {platformData.map((platform, index) => (
                    <div key={platform.name} className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: PLATFORM_COLORS[index] }} 
                      />
                      <div className="text-sm flex-1">{platform.name}</div>
                      <div className="text-sm font-medium">{platform.value}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MobileAnalyticsDashboard;
