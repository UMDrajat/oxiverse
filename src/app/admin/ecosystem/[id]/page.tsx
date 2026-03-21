'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button, Input, Textarea, Card, Spinner } from '@/components/ui';
import { useToastContext } from '@/lib/providers/ToastProvider';

export default function AdminProjectEditPage() {
  const router = useRouter();
  const params = useParams();
  const { success, error } = useToastContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    status: 'current',
    link: '',
    imageUrl: '',
    imageDisplay: 'cover',
  });

  const isEdit = params.id !== 'new';

  useEffect(() => {
    if (isEdit) {
      fetchProject();
    }
  }, [isEdit]);

  const fetchProject = async () => {
    setIsFetching(true);
    try {
      const res = await fetch(`/api/admin/ecosystem/${params.id}`);
      if (res.ok) {
        const project = await res.json();
        setFormData({
          title: project.title,
          slug: project.slug,
          description: project.description || '',
          status: project.status || 'current',
          link: project.link || '',
          imageUrl: project.imageUrl || '',
          imageDisplay: project.imageDisplay || 'cover',
        });
      } else {
        error('Failed to load project');
        router.push('/admin/ecosystem');
      }
    } catch (err) {
      error('Failed to load project');
      router.push('/admin/ecosystem');
    } finally {
      setIsFetching(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('type', 'ecosystem');

      const res = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: uploadFormData,
      });

      if (res.ok) {
        const data = await res.json();
        setFormData((prev) => ({ ...prev, imageUrl: data.url }));
        success('Icon uploaded successfully!');
      } else {
        const data = await res.json();
        error(data.error || 'Failed to upload icon');
      }
    } catch (err) {
      error('An error occurred while uploading the icon');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = isEdit ? `/api/admin/ecosystem/${params.id}` : '/api/admin/ecosystem';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        success(isEdit ? 'Project updated' : 'Project created');
        router.push('/admin/ecosystem');
      } else {
        const data = await res.json();
        error(data.error || 'Failed to save project');
      }
    } catch (err) {
      error('Failed to save project');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {isEdit ? 'Edit Project' : 'New Ecosystem Node'}
          </h1>
          <p className="text-dark-400">Configure your project details</p>
        </div>
        <div className="flex gap-3">
          <Button type="button" variant="ghost" onClick={() => router.push('/admin/ecosystem')}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? <Spinner size="sm" /> : 'Save Node'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="space-y-4 pt-4">
              <Input
                label="Project Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. AdMatcher Service"
                required
              />
              <Input
                label="Slug (URL Identifier)"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="admatcher"
                required
              />
            </div>
          </Card>

          <Card>
            <Textarea
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="System details and architectural specs..."
              rows={6}
            />
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <div className="space-y-4 pt-4">
              <div>
                <label className="text-sm font-medium text-dark-300 mb-2 block">System Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full bg-dark-950 border border-dark-800 text-white rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-primary-500 transition-all text-sm outline-none"
                >
                  <option value="current">Current (Active)</option>
                  <option value="upcoming">Upcoming (Planned)</option>
                  <option value="future">Future (Concepts)</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-dark-300 mb-2 block">Image Display Mode</label>
                <select
                  value={formData.imageDisplay}
                  onChange={(e) => setFormData({ ...formData, imageDisplay: e.target.value })}
                  className="w-full bg-dark-950 border border-dark-800 text-white rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-primary-500 transition-all text-sm outline-none"
                >
                  <option value="cover">Cover (Fills area, may crop)</option>
                  <option value="contain">Contain (Fits area, preserves aspect ratio)</option>
                  <option value="fill">Fill (Stretches to fill area)</option>
                </select>
              </div>
              <Input
                label="Resource Link"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                placeholder="https://github.com/..."
              />
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-white mb-4">Project Icon</h3>
            {formData.imageUrl ? (
              <div className="relative aspect-square w-full max-w-[150px] mx-auto rounded-xl overflow-hidden border border-white/10 group">
                <img src={formData.imageUrl} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, imageUrl: '' })}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                >
                  Clear
                </button>
              </div>
            ) : (
              <div className="relative group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  disabled={isUploading}
                />
                <Button variant="outline" className="w-full glass" disabled={isUploading}>
                  {isUploading ? <Spinner size="sm" /> : 'Upload Icon'}
                </Button>
              </div>
            )}
          </Card>

          <Card className="bg-primary-500/5 border-primary-500/10">
            <h4 className="text-sm font-bold text-white mb-2 flex items-center">
              <svg className="w-4 h-4 mr-2 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Architectural Hint
            </h4>
            <p className="text-xs text-dark-400 leading-relaxed">
              Ecosystem nodes are rendered on the homepage in the Ecosystem visualization. 
              Ensure slugs are unique and titles match the technical documentation.
            </p>
          </Card>
        </div>
      </div>
    </form>
  );
}
