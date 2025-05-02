
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { getPlatformName } from "@/utils/social/helpers";
import { connectPlatform } from "@/utils/social";
import { disconnectPlatform, updatePlatformSettings } from "@/utils/social/platforms";

export const usePlatforms = () => {
  const [platforms, setPlatforms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentPlatform, setCurrentPlatform] = useState<string | null>(null);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showConnectDialog, setShowConnectDialog] = useState(false);
  const [showWordPressDialog, setShowWordPressDialog] = useState(false);

  const loadPlatforms = async () => {
    setIsLoading(true);
    try {
      const { getSocialPlatforms } = await import('@/utils/social/platforms');
      const loadedPlatforms = await getSocialPlatforms();
      setPlatforms(loadedPlatforms);
    } catch (error) {
      console.error("Failed to load platforms:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshConnections = async () => {
    setIsRefreshing(true);
    await loadPlatforms();
    setIsRefreshing(false);
    toast.success("Connections refreshed successfully!");
  };

  const handleConnectPlatform = (platformId: string) => {
    setShowConnectDialog(false);
    connectPlatform(platformId);
  };

  const handleDisconnectPlatform = async (platformId: string) => {
    const success = await disconnectPlatform(platformId);
    if (success) {
      loadPlatforms();
    }
  };

  const handleOpenPlatformSettings = (platformId: string) => {
    setCurrentPlatform(platformId);
    setShowSettingsDialog(true);
  };

  const handleSavePlatformSettings = async (platformId: string, settings: any) => {
    const success = await updatePlatformSettings(platformId, settings);
    if (success) {
      loadPlatforms();
      setShowSettingsDialog(false);
      toast.success("Settings updated successfully!");
    } else {
      toast.error("Failed to update settings.");
    }
  };

  const handleOpenConnectDialog = () => {
    setShowConnectDialog(true);
  };

  const savePlatformConnection = async (platformId: string) => {
    try {
      const user = await supabase.auth.getUser();
      
      if (!user.data?.user?.id) {
        toast.error('You must be logged in to connect platforms');
        return;
      }
      
      const { error } = await supabase
        .from('social_platforms')
        .insert({
          user_id: user.data.user.id,
          platform_id: platformId,
          name: getPlatformName(platformId),
          icon: platformId,
          is_connected: true,
          account_name: `@user_${platformId}`,
          last_sync: new Date().toISOString(),
          sync_frequency: 'daily',
          notifications: { mentions: true, messages: true }
        });
      
      if (error) throw error;
      
      loadPlatforms();
    } catch (error) {
      console.error('Error saving platform connection:', error);
      toast.error('Failed to save platform connection');
    }
  };

  return {
    platforms,
    isLoading,
    isRefreshing,
    setIsRefreshing,
    currentPlatform,
    showSettingsDialog,
    showConnectDialog,
    showWordPressDialog,
    setCurrentPlatform,
    setShowSettingsDialog,
    setShowConnectDialog,
    setShowWordPressDialog,
    loadPlatforms,
    handleRefreshConnections,
    handleConnectPlatform,
    handleDisconnectPlatform,
    handleOpenPlatformSettings,
    handleSavePlatformSettings,
    handleOpenConnectDialog,
    savePlatformConnection,
  };
};
