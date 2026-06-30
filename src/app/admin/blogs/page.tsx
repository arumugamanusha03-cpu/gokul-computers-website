'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Eye, FileText, ToggleLeft, ToggleRight } from 'lucide-react';

const demoBlogs = [
  { _id: '1', title: 'Best Laptops Under ₹50,000 in 2024', category: 'Buying Guide', published: true, views: 1240, createdAt: '2024-03-15' },
  { _id: '2', title: 'Gaming Laptop Buying Guide 2024', category: 'Gaming', published: true, views: 980, createdAt: '2024-03-10' },
  { _id: '3', title: 'SSD vs HDD: Which is Better?', category: 'Tech Tips', published: false, views: 0, createdAt: '2024-03-05' },
  { _id: '4', title: 'Lenovo vs HP: Which Brand is Better?', category: 'Comparison', published: true, views: 620, createdAt: '2024-02-28' },
];

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState(demoBlogs);
  const [search, setSearch] = useState('');

  const togglePublish = (id: string) => {
    setBlogs((prev) => prev.map((b) => b._id === id ? { ...b, published: !b.published } : b));
  };

  const filtered = blogs.filter((b) => b.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-[#F8FAFC]">Blog Posts</h1>
          <p className="text-gray-500 text-sm mt-1">{blogs.filter((b) => b.published).length} published, {blogs.filter((b) => !b.published).length} drafts</p>
        </div>
        <button className="flex items-center gap-2 bg-[#4F46E5] hover:bg-[#B91C1C] text-white font-semibold px-4 py-2.5 rounded-xl transition-colors">
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-[#1E293B] p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search blog posts..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E293B] bg-gray-50 dark:bg-[#1E293B] text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 dark:text-[#F8FAFC]" />
        </div>
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-[#1E293B] overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-gray-200 dark:border-[#1E293B]">
            <tr>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Title</th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase">Category</th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase">Views</th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase">Date</th>
              <th className="text-right py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {filtered.map((blog) => (
              <tr key={blog._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-50 dark:bg-blue-950/20 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-[#0A84FF]" />
                    </div>
                    <span className="font-medium text-gray-900 dark:text-[#F8FAFC] text-sm line-clamp-1">{blog.title}</span>
                  </div>
                </td>
                <td className="py-4 px-4"><span className="badge bg-blue-100 text-blue-700 text-xs">{blog.category}</span></td>
                <td className="py-4 px-4">
                  <button onClick={() => togglePublish(blog._id)} className="flex items-center gap-2">
                    {blog.published
                      ? <><ToggleRight className="w-5 h-5 text-green-500" /><span className="badge badge-success text-xs">Published</span></>
                      : <><ToggleLeft className="w-5 h-5 text-gray-400" /><span className="badge bg-gray-100 text-gray-600 text-xs">Draft</span></>
                    }
                  </button>
                </td>
                <td className="py-4 px-4"><span className="flex items-center gap-1 text-sm text-gray-500"><Eye className="w-3 h-3" />{blog.views}</span></td>
                <td className="py-4 px-4"><span className="text-sm text-gray-500">{new Date(blog.createdAt).toLocaleDateString('en-IN')}</span></td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
