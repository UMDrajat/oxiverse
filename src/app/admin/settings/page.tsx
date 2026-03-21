'use client';

import { useEffect, useState } from 'react';
import { Card, Button, Input, Spinner, Textarea } from '@/components/ui';
import { useToastContext } from '@/lib/providers/ToastProvider';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
}

export default function AdminSettingsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'categories' | 'tags'>('categories');
  const { success, error } = useToastContext();

  const [newCat, setNewCat] = useState({ name: '', slug: '', description: '' });
  const [newTag, setNewTag] = useState({ name: '', slug: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [catRes, tagRes] = await Promise.all([
        fetch('/api/admin/categories'),
        fetch('/api/admin/tags'),
      ]);
      setCategories(await catRes.json());
      setTags(await tagRes.json());
    } catch (err) {
      error('Failed to load settings data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCat),
      });
      if (res.ok) {
        success('Category added');
        setCategories([...categories, await res.json()]);
        setNewCat({ name: '', slug: '', description: '' });
      }
    } catch (err) {
      error('Failed to add category');
    }
  };

  const handleAddTag = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTag),
      });
      if (res.ok) {
        success('Tag added');
        setTags([...tags, await res.json()]);
        setNewTag({ name: '', slug: '' });
      }
    } catch (err) {
      error('Failed to add tag');
    }
  };

  if (isLoading) return <div className="p-8"><Spinner /></div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-8">System Settings</h1>

      <div className="flex gap-4 mb-8 border-b border-dark-800 pb-px">
        <button
          onClick={() => setActiveTab('categories')}
          className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
            activeTab === 'categories' ? 'text-primary-400 border-primary-500' : 'text-dark-500 border-transparent hover:text-dark-300'
          }`}
        >
          Categories
        </button>
        <button
          onClick={() => setActiveTab('tags')}
          className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
            activeTab === 'tags' ? 'text-primary-400 border-primary-500' : 'text-dark-500 border-transparent hover:text-dark-300'
          }`}
        >
          Tags
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Management Form */}
        <div className="lg:col-span-1">
          {activeTab === 'categories' ? (
            <Card>
              <h3 className="text-lg font-bold text-white mb-6">Add Category</h3>
              <form onSubmit={handleAddCategory} className="space-y-4">
                <Input
                  label="Name"
                  value={newCat.name}
                  onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
                  placeholder="e.g. Technology"
                  required
                />
                <Input
                  label="Slug"
                  value={newCat.slug}
                  onChange={(e) => setNewCat({ ...newCat, slug: e.target.value })}
                  placeholder="technology"
                  required
                />
                <Textarea
                  label="Description"
                  value={newCat.description}
                  onChange={(e) => setNewCat({ ...newCat, description: e.target.value })}
                  placeholder="General technology news..."
                />
                <Button type="submit" variant="primary" className="w-full">Create Category</Button>
              </form>
            </Card>
          ) : (
            <Card>
              <h3 className="text-lg font-bold text-white mb-6">Add Tag</h3>
              <form onSubmit={handleAddTag} className="space-y-4">
                <Input
                  label="Name"
                  value={newTag.name}
                  onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
                  placeholder="e.g. artificial-intelligence"
                  required
                />
                <Input
                  label="Slug"
                  value={newTag.slug}
                  onChange={(e) => setNewTag({ ...newTag, slug: e.target.value })}
                  placeholder="ai"
                  required
                />
                <Button type="submit" variant="primary" className="w-full">Create Tag</Button>
              </form>
            </Card>
          )}
        </div>

        {/* Display Table */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden p-0">
            <div className="p-6 border-b border-dark-800">
               <h3 className="text-lg font-bold text-white">Existing {activeTab === 'categories' ? 'Categories' : 'Tags'}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-dark-950 text-[10px] font-black uppercase tracking-widest text-dark-500 border-b border-dark-800">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Slug</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-800 text-sm">
                  {activeTab === 'categories' ? categories.map(cat => (
                    <tr key={cat.id} className="hover:bg-white/[0.02]">
                      <td className="px-6 py-4 text-white font-medium">{cat.name}</td>
                      <td className="px-6 py-4 text-dark-400 font-mono">{cat.slug}</td>
                      <td className="px-6 py-4">
                        <button className="text-red-400 hover:text-red-300 transition-colors">Delete</button>
                      </td>
                    </tr>
                  )) : tags.map(tag => (
                    <tr key={tag.id} className="hover:bg-white/[0.02]">
                      <td className="px-6 py-4 text-white font-medium">{tag.name}</td>
                      <td className="px-6 py-4 text-dark-400 font-mono">{tag.slug}</td>
                      <td className="px-6 py-4">
                         <button className="text-red-400 hover:text-red-300 transition-colors">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
