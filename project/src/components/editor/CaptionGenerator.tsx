import React from 'react';
import { Type, Loader } from 'lucide-react';
import { useProjectStore, Caption } from '../../lib/store';

export default function CaptionGenerator() {
  const { currentProject, addCaptions, setIsProcessing } = useProjectStore();
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const generateCaptions = async () => {
    if (!currentProject?.id || !currentProject?.videoUrl) {
      setError("Erreur : Aucun projet ou URL vidéo valide n'est disponible.");
      return;
    }

    setIsGenerating(true);
    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch(
        'https://api.example.com/generate-captions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            videoUrl: currentProject.videoUrl,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur API : ${response.statusText}`);
      }

      const captions: Caption[] = await response.json();
      addCaptions(currentProject.id, captions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setIsGenerating(false);
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-lg font-bold mb-4">Générateur de sous-titres</h2>
      <button
        className="bg-indigo-600 text-white py-2 px-4 rounded-md flex items-center"
        onClick={generateCaptions}
        disabled={isGenerating}
      >
        {isGenerating ? (
          <Loader className="animate-spin mr-2" />
        ) : (
          <Type className="mr-2" />
        )}
        {isGenerating ? 'Génération...' : 'Générer les sous-titres'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
