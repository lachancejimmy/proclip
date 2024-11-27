import React from 'react';
import { Upload, Link as LinkIcon, Loader } from 'lucide-react';
import { useProjectStore } from '../../lib/store';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

export default function VideoUploader() {
  const { t } = useTranslation();
  const { currentProject, uploadVideo, uploadVideoFromUrl, isProcessing } = useProjectStore();
  const [dragActive, setDragActive] = React.useState(false);
  const [videoLink, setVideoLink] = React.useState('');
  const [showLinkInput, setShowLinkInput] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0] && currentProject) {
      await handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0] && currentProject) {
      await handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    if (!currentProject) return;
    
    try {
      await uploadVideo(currentProject.id, file);
      toast.success(t('upload.success'));
    } catch (error) {
      toast.error(t('upload.error'));
      console.error('Error processing video:', error);
    }
  };

  const handleVideoLink = async () => {
    if (!videoLink || !currentProject) return;

    try {
      await uploadVideoFromUrl(currentProject.id, videoLink);
      setVideoLink('');
      setShowLinkInput(false);
      toast.success(t('upload.success'));
    } catch (error) {
      toast.error(t('upload.error'));
      console.error('Error processing video link:', error);
    }
  };

  if (isProcessing) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <Loader className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
        <p className="text-gray-300">{t('upload.processing')}</p>
      </div>
    );
  }

  return (
    <div
      className={`relative h-full flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 transition-colors
        ${dragActive ? 'border-indigo-500 bg-indigo-50/10' : 'border-gray-600 hover:border-gray-500'}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="video/*"
        onChange={handleChange}
      />

      {showLinkInput ? (
        <div className="w-full max-w-md space-y-4">
          <div className="relative">
            <input
              type="text"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              placeholder={t('upload.placeholder')}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleVideoLink}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {t('upload.import')}
            </button>
            <button
              onClick={() => setShowLinkInput(false)}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              {t('upload.cancel')}
            </button>
          </div>
        </div>
      ) : (
        <>
          <Upload className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-sm text-gray-300 text-center mb-4">
            {t('upload.dragDrop')}{' '}
            <button
              className="text-indigo-400 hover:text-indigo-300"
              onClick={() => inputRef.current?.click()}
            >
              {t('upload.browse')}
            </button>
          </p>
          <button
            onClick={() => setShowLinkInput(true)}
            className="flex items-center px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <LinkIcon className="w-4 h-4 mr-2" />
            {t('upload.pasteLink')}
          </button>
          <p className="text-xs text-gray-500 mt-4">
            {t('upload.supports')}
          </p>
        </>
      )}
    </div>
  );
}