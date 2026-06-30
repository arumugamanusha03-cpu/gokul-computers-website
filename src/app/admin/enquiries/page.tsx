'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Phone, Mail, MessageSquare, Clock, CheckCircle, XCircle, Filter } from 'lucide-react';

const demoEnquiries = [
  { _id: '1', name: 'Rajesh Kumar', phone: '9876543210', email: 'rajesh@gmail.com', productName: 'Lenovo IdeaPad Slim 5', message: 'I want to know more about this laptop and the EMI options.', source: 'product-enquiry', status: 'new', createdAt: '2024-03-20T10:30:00Z' },
  { _id: '2', name: 'Priya Sharma', phone: '8765432109', email: 'priya@gmail.com', productName: 'HP Pavilion Gaming', message: 'Is gaming laptop available? What is the price?', source: 'product-enquiry', status: 'contacted', createdAt: '2024-03-19T15:20:00Z' },
  { _id: '3', name: 'Arun Prakash', phone: '7654321098', email: 'arun@gmail.com', productName: 'Service Enquiry', message: 'My laptop screen is broken. How much will the repair cost?', source: 'contact-form', status: 'closed', createdAt: '2024-03-18T09:45:00Z' },
  { _id: '4', name: 'Kavitha Rajan', phone: '6543210987', email: 'kavitha@gmail.com', productName: 'Dell XPS 15', message: 'Looking for a laptop for video editing. Is Dell XPS 15 good?', source: 'product-enquiry', status: 'new', createdAt: '2024-03-17T14:10:00Z' },
];

type Status = 'all' | 'new' | 'contacted' | 'closed';

export default function AdminEnquiries() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<Status>('all');
  const [enquiries, setEnquiries] = useState(demoEnquiries);

  const filtered = enquiries.filter((e) => {
    if (statusFilter !== 'all' && e.status !== statusFilter) return false;
    if (search && !e.name.toLowerCase().includes(search.toLowerCase()) &&
        !e.phone.includes(search)) return false;
    return true;
  });

  const updateStatus = (id: string, status: string) => {
    setEnquiries((prev) => prev.map((e) => e._id === id ? { ...e, status } : e));
  };

  const statusColor: Record<string, string> = {
    new: 'badge-primary',
    contacted: 'badge-success',
    closed: 'bg-gray-100 text-gray-600',
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-[#F8FAFC]">Enquiries</h1>
        <p className="text-gray-500 text-sm mt-1">{enquiries.filter((e) => e.status === 'new').length} new enquiries</p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-[#1E293B] p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or phone..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#1E293B] bg-gray-50 dark:bg-[#1E293B] text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 dark:text-[#F8FAFC]"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'new', 'contacted', 'closed'] as Status[]).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all ${
                  statusFilter === s ? 'bg-[#4F46E5] text-white' : 'border border-gray-200 dark:border-[#1E293B] text-gray-600 dark:text-[#CBD5E1] hover:bg-gray-50'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enquiries List */}
      <div className="space-y-4">
        {filtered.map((e) => (
          <motion.div
            key={e._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-[#1E293B] p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="w-12 h-12 bg-[#4F46E5]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-[#4F46E5] font-bold text-lg">{e.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-bold text-gray-900 dark:text-[#F8FAFC]">{e.name}</h3>
                    <span className={`badge text-xs ${statusColor[e.status]}`}>{e.status}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-1 flex-wrap">
                    <a href={`tel:${e.phone}`} className="flex items-center gap-1 text-sm text-[#4F46E5] hover:underline">
                      <Phone className="w-3.5 h-3.5" /> {e.phone}
                    </a>
                    <a href={`mailto:${e.email}`} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                      <Mail className="w-3.5 h-3.5" /> {e.email}
                    </a>
                  </div>
                  {e.productName && (
                    <div className="mt-1 text-xs text-gray-500">
                      📦 {e.productName} • via {e.source}
                    </div>
                  )}
                  <p className="mt-2 text-sm text-gray-700 dark:text-[#CBD5E1] bg-gray-50 dark:bg-[#1E293B] rounded-lg px-3 py-2">
                    &quot;{e.message}&quot;
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    {formatDate(e.createdAt)}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 flex-shrink-0">
                <a
                  href={`tel:${e.phone}`}
                  className="flex items-center gap-1 px-3 py-2 bg-[#4F46E5] text-white text-xs font-semibold rounded-lg hover:bg-[#B91C1C] transition-colors"
                >
                  <Phone className="w-3 h-3" /> Call
                </a>
                <a
                  href={`https://wa.me/91${e.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white text-xs font-semibold rounded-lg hover:bg-green-600 transition-colors"
                >
                  <MessageSquare className="w-3 h-3" /> WhatsApp
                </a>
                {e.status !== 'closed' && (
                  <button
                    onClick={() => updateStatus(e._id, e.status === 'new' ? 'contacted' : 'closed')}
                    className="flex items-center gap-1 px-3 py-2 border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <CheckCircle className="w-3 h-3" />
                    {e.status === 'new' ? 'Mark Contacted' : 'Close'}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-[#1E293B]">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No enquiries found</p>
          </div>
        )}
      </div>
    </div>
  );
}
