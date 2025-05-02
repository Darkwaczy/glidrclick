
import { useState, useEffect } from 'react';

type Connection = {
  platform: string;
  status: 'connected' | 'disconnected';
};

export const useSocialConnections = () => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Mock implementation since we don't have a real API endpoint
    const fetchConnections = async () => {
      try {
        setLoading(true);
        // Simulate API call with mock data
        await new Promise(resolve => setTimeout(resolve, 500));
        const mockData: Connection[] = [
          { platform: 'Facebook', status: 'disconnected' },
          { platform: 'Twitter', status: 'disconnected' },
          { platform: 'LinkedIn', status: 'disconnected' },
          { platform: 'Instagram', status: 'disconnected' }
        ];
        setConnections(mockData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, []);

  // Add a function to connect to a platform
  const connectPlatform = (platform: string) => {
    setConnections(prev => 
      prev.map(conn => 
        conn.platform === platform 
          ? { ...conn, status: 'connected' } 
          : conn
      )
    );
  };

  // Add a function to disconnect from a platform
  const disconnectPlatform = (platform: string) => {
    setConnections(prev => 
      prev.map(conn => 
        conn.platform === platform 
          ? { ...conn, status: 'disconnected' } 
          : conn
      )
    );
  };

  return { 
    connections, 
    loading, 
    error,
    connectPlatform,
    disconnectPlatform
  };
};
