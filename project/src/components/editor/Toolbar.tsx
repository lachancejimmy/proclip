import React from 'react';
import { Scissors, Type, Wand2, Upload, Download, Share2 } from 'lucide-react';
import CaptionGenerator from './CaptionGenerator';
import { useProjectStore  } from '../../lib/store';

const tools = [
  { icon: Scissors, name: 'Cut', action: () => console.log('Cut') },
  { icon: Type, name: 'Captions', action: () => console.log('Captions') },
  { icon: Wand2, name: 'AI Edit', action: () => console.log('AI Edit') },
  { icon: Download, name: 'Export', action: () => console.log('Export') },
  { icon: Share2, name: 'Share', action: () => console.log('Share') },
];

export default function Toolbar() {
  const { currentProject, isProcessing } = useProjectStore ();

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-bold mb-6">Tools</h2>
      <div className="space-y-2 flex-1">
        {tools.map((tool) => (
          <button
            key={tool.name}
            onClick={tool.action}
            disabled={isProcessing || !currentProject?.videoUrl}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors
              ${isProcessing || !currentProject?.videoUrl
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-gray-700/50'}`}
          >
            <tool.icon className="w-5 h-5" />
            <span>{tool.name}</span>
          </button>
        ))}
      </div>
      <CaptionGenerator />
    </div>
  );
}