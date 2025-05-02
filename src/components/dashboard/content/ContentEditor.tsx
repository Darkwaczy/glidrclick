
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Bold, Italic, Link, Youtube } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

interface ContentEditorProps {
  content: string;
  onChange: (content: string) => void;
  title?: string;
  setTitle?: (title: string) => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({
  content,
  onChange,
  title,
  setTitle
}) => {
  const handleFormatting = (formatType: 'bold' | 'italic' | 'link' | 'youtube') => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let formattedText = '';
    let cursorPosition = 0;
    
    switch (formatType) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        cursorPosition = start + formattedText.length;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        cursorPosition = start + formattedText.length;
        break;
      case 'link':
        formattedText = `[${selectedText}](https://example.com)`;
        cursorPosition = start + formattedText.length;
        break;
      case 'youtube':
        formattedText = `[VIDEO: ${selectedText || 'Embedded Video'}](https://youtube.com/embed/videoID)`;
        cursorPosition = start + formattedText.length;
        break;
    }
    
    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    onChange(newContent);
    
    toast.success(`${formatType.charAt(0).toUpperCase() + formatType.slice(1)} formatting applied`);
    
    // Reset focus and cursor position after state update
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(cursorPosition, cursorPosition);
    }, 0);
  };

  return (
    <div className="space-y-3">
      {setTitle && (
        <div className="mb-4">
          <Label htmlFor="post-title">Title</Label>
          <Input
            id="post-title"
            placeholder="Enter post title..."
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
            className="font-medium text-lg"
          />
        </div>
      )}
      <div className="flex flex-wrap gap-2 mb-2">
        <Button 
          type="button"
          variant="outline" 
          size="sm" 
          onClick={() => handleFormatting('bold')}
        >
          <Bold size={16} className="mr-1" /> Bold
        </Button>
        <Button 
          type="button"
          variant="outline" 
          size="sm" 
          onClick={() => handleFormatting('italic')}
        >
          <Italic size={16} className="mr-1" /> Italic
        </Button>
        <Button 
          type="button"
          variant="outline" 
          size="sm" 
          onClick={() => handleFormatting('link')}
        >
          <Link size={16} className="mr-1" /> Link
        </Button>
        <Button 
          type="button"
          variant="outline" 
          size="sm" 
          onClick={() => handleFormatting('youtube')}
        >
          <Youtube size={16} className="mr-1" /> Embed Video
        </Button>
      </div>
      
      <Label htmlFor="content-editor">Content</Label>
      <Textarea
        id="content-editor"
        placeholder="Write your post content here..."
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[250px]"
      />
      <p className="text-xs text-gray-500">
        Use the formatting buttons above to style your content.
      </p>
    </div>
  );
};

export default ContentEditor;
