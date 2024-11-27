import React from 'react';
import Timeline from './Timeline';
import Preview from './Preview';
import Toolbar from './Toolbar';
import AIEditor from './AIEditor';
import { useProjectStore  } from '../../lib/store';
import { useParams } from 'react-router-dom';

export default function VideoEditor() {
  const { projectId } = useParams();
  const { projects, setCurrentProject } = useProjectStore ();

  React.useEffect(() => {
    if (projectId) {
      const project = projects.find(p => p.id === projectId);
      if (project) {
        setCurrentProject(project);
      }
    }
  }, [projectId, projects, setCurrentProject]);

  return (
    <div className="h-screen bg-gray-900 text-white flex">
      <div className="w-80 bg-gray-800 p-6 overflow-y-auto">
        <Toolbar />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          <Preview />
        </div>
        <Timeline />
      </div>
      <div className="w-80 bg-gray-800 p-6 overflow-y-auto">
        <h2 className="text-xl font-bold mb-6">AI Tools</h2>
        <AIEditor />
      </div>
    </div>
  );
}