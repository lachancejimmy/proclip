import React from 'react';
import { Wand2, Loader } from 'lucide-react';
import { useProjectStore  } from '../../lib/store';

interface AIAction {
  id: string;
  name: string;
  description: string;
  prompt: string;
}

const aiActions: AIAction[] = [
  {
    id: 'highlight',
    name: 'Find Highlights',
    description: 'Detect key moments in the video',
    prompt: 'Find the most engaging moments'
  },
  {
    id: 'trim',
    name: 'Smart Trim',
    description: 'Remove unnecessary parts',
    prompt: 'Trim to keep only essential content'
  },
  {
    id: 'enhance',
    name: 'Enhance Audio',
    description: 'Improve audio quality',
    prompt: 'Clean and enhance audio'
  }
];

export default function AIEditor() {
  const { currentProject, isProcessing, setIsProcessing } = useProjectStore ();
  const [activeAction, setActiveAction] = React.useState<string | null>(null);

  const handleAIAction = async (action: AIAction) => {
    if (!currentProject?.videoUrl || isProcessing) return;

    setActiveAction(action.id);
    setIsProcessing(true);

    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would normally make API calls to your AI service
      console.log(`Processing ${action.name}...`);
      
    } catch (error) {
      console.error('AI processing error:', error);
    } finally {
      setActiveAction(null);
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      {aiActions.map((action) => (
        <button
          key={action.id}
          onClick={() => handleAIAction(action)}
          disabled={isProcessing || !currentProject?.videoUrl}
          className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors
            ${isProcessing || !currentProject?.videoUrl
              ? 'bg-gray-800 cursor-not-allowed'
              : 'bg-gray-800 hover:bg-gray-700'}`}
        >
          <div className="flex items-center space-x-3">
            {activeAction === action.id ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <Wand2 className="w-5 h-5" />
            )}
            <div className="text-left">
              <h3 className="font-medium">{action.name}</h3>
              <p className="text-sm text-gray-400">{action.description}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}