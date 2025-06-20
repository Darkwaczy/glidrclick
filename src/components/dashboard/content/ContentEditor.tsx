
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Bold, Italic, Link, Youtube } from "lucide-react";
import { toast } from "sonner";

interface ContentEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({
  content,
  onChange
}) => {
  const handleFormatting = (formatType: 'bold' | 'italic' | 'link' | 'youtube') => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
    if (!textarea) return;
    
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
      <div className="flex flex-wrap gap-2 mb-2">
        <Button 
          type="button"
          variant="outline" 
          size="sm" 
          onClick={() => handleFormatting('bold')}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <Bold size={16} className="mr-1" /> Bold
        </Button>
        <Button 
          type="button"
          variant="outline" 
          size="sm" 
          onClick={() => handleFormatting('italic')}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <Italic size={16} className="mr-1" /> Italic
        </Button>
        <Button 
          type="button"
          variant="outline" 
          size="sm" 
          onClick={() => handleFormatting('link')}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <Link size={16} className="mr-1" /> Link
        </Button>
        <Button 
          type="button"
          variant="outline" 
          size="sm" 
          onClick={() => handleFormatting('youtube')}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <Youtube size={16} className="mr-1" /> Embed Video
        </Button>
      </div>
      
      <Textarea
        id="content-editor"
        placeholder="Write your post content here..."
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[250px] bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-neon-electric/50 resize-none"
      />
      <p className="text-xs text-gray-400">
        Use the formatting buttons above to style your content.
      </p>
    </div>
  );
};

export default ContentEditor;
