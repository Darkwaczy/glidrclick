
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { Loader, Sparkles, Image, Calendar } from 'lucide-react';
import { generateContent, generateTitle } from '@/services/aiService';

interface ContentGenerationHelperProps {
  onContentGenerated: (content: string) => void;
  onTitleGenerated: (title: string) => void;
  onToggleSchedule: () => void;
  showScheduling: boolean;
}

const ContentGenerationHelper: React.FC<ContentGenerationHelperProps> = ({ 
  onContentGenerated, 
  onTitleGenerated,
  onToggleSchedule,
  showScheduling
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTone, setSelectedTone] = useState('professional');
  const [selectedTopic, setSelectedTopic] = useState('marketing');
  const [contentPrompt, setContentPrompt] = useState('');
  const [contentDisplayPercent, setContentDisplayPercent] = useState(100);
  
  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'funny', label: 'Humorous' },
    { value: 'formal', label: 'Formal' },
    { value: 'inspirational', label: 'Inspirational' }
  ];
  
  const topics = [
    { value: 'marketing', label: 'Marketing' },
    { value: 'tech', label: 'Technology' },
    { value: 'business', label: 'Business' },
    { value: 'lifestyle', label: 'Lifestyle' },
    { value: 'health', label: 'Health & Wellness' },
    { value: 'travel', label: 'Travel' }
  ];
  
  const handleGenerateContent = async () => {
    setIsGenerating(true);
    toast.info('Generating content...');
    
    try {
      const prompt = contentPrompt || `Write about ${selectedTopic}`;
      const result = await generateContent(selectedTopic, selectedTone);
      
      if (result && result.content) {
        // Calculate how much content to display based on percentage
        const contentToShow = result.content;
        const displayLength = Math.floor(contentToShow.length * (contentDisplayPercent / 100));
        const displayedContent = contentToShow.substring(0, displayLength);
        
        onContentGenerated(displayedContent);
        if (result.title) {
          onTitleGenerated(result.title);
        }
        toast.success('Content generated successfully!');
      } else {
        toast.error('Failed to generate content. Please try again.');
      }
    } catch (error) {
      console.error('Error generating content:', error);
      toast.error('Error generating content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleGenerateTitle = async (existingContent: string) => {
    if (!existingContent.trim()) {
      toast.error('Please add some content first before generating a title');
      return;
    }
    
    setIsGenerating(true);
    toast.info('Generating title...');
    
    try {
      const title = await generateTitle(existingContent);
      if (title) {
        onTitleGenerated(title);
        toast.success('Title generated successfully!');
      } else {
        toast.error('Failed to generate title. Please try again.');
      }
    } catch (error) {
      console.error('Error generating title:', error);
      toast.error('Error generating title. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <Card className="p-4 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="content-prompt">Content Generation</Label>
        <Textarea
          id="content-prompt"
          placeholder="Optional: Describe what content you want to generate"
          value={contentPrompt}
          onChange={(e) => setContentPrompt(e.target.value)}
          className="h-20"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="content-tone">Tone</Label>
          <Select value={selectedTone} onValueChange={setSelectedTone}>
            <SelectTrigger id="content-tone">
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              {tones.map(tone => (
                <SelectItem key={tone.value} value={tone.value}>{tone.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="content-topic">Topic</Label>
          <Select value={selectedTopic} onValueChange={setSelectedTopic}>
            <SelectTrigger id="content-topic">
              <SelectValue placeholder="Select topic" />
            </SelectTrigger>
            <SelectContent>
              {topics.map(topic => (
                <SelectItem key={topic.value} value={topic.value}>{topic.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="content-display">Content Display: {contentDisplayPercent}%</Label>
        </div>
        <Slider
          id="content-display"
          min={10}
          max={100}
          step={10}
          value={[contentDisplayPercent]}
          onValueChange={(value) => setContentDisplayPercent(value[0])}
          className="py-4"
        />
        <p className="text-xs text-gray-500">
          Control how much of the generated content to display (useful for creating teasers)
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button 
          onClick={handleGenerateContent}
          disabled={isGenerating}
          className="flex-1"
        >
          {isGenerating ? (
            <>
              <Loader size={16} className="mr-2 animate-spin" /> Generating...
            </>
          ) : (
            <>
              <Sparkles size={16} className="mr-2" /> Generate Content
            </>
          )}
        </Button>
        
        <Button
          onClick={() => handleGenerateTitle('existingContent')}
          disabled={isGenerating}
          variant="outline"
          className="flex-1"
        >
          Generate Title
        </Button>
      </div>
      
      <div className="flex justify-between items-center pt-2">
        <Button 
          onClick={onToggleSchedule}
          variant="ghost" 
          size="sm"
          className="text-xs flex items-center"
        >
          <Calendar size={14} className="mr-1" />
          {showScheduling ? 'Hide Scheduling' : 'Show Scheduling'}
        </Button>
      </div>
    </Card>
  );
};

export default ContentGenerationHelper;
