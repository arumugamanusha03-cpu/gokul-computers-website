'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Package, MessageSquare, FileText, Star, TrendingUp, Users,
  ShoppingBag, Wrench, ArrowUpRight, Clock, CheckCircle, AlertCircle,
} from 'lucide-react';

const stats = [
  { label: 'Total Products', value: '248', icon: Package, color: 'from-[#4F46E5] to-red-700', change: '+12 this month' },
  { label: 'New Enquiries', value: '34', icon: MessageSquare, color: 'from-blue-500 to-blue-700', change: '+8 today' },
  { label: 'Blog Posts', value: '18', icon: FileText, color: 'from-purple-500 to-purple-700', change: '4 published' },
  { label: 'Testimonials', value: '127', icon: Star, color: 'from-yellow-500 to-yellow-700', change: '5 new' },
];

const recentEnquiries = [
  { name: 'Rajesh Kumar', phone: '9876543210', product: 'Lenovo IdeaPad', time: '2 hours ago', status: 'new' },
  { name: 'Priya Sharma', phone: '8765432109', product: 'HP Pavilion Gaming', time: '4 hours ago', status: 'contacted' },
  { name: 'Arun Prakash', phone: '7654321098', product: 'Dell XPS 15', time: '1 day ago', status: 'closed' },
  { name: 'Kavitha R', phone: '6543210987', product: 'SSD Upgrade', time: '2 days ago', status: 'contacted' },
];

const quickActions = [
  { label: 'Add Product', href: '/admin/products', icon: Package, color: 'bg-[#4F46E5]' },
  { label: 'View Enquiries', href: '/admin/enquiries', icon: MessageSquare, color: 'bg-blue-500' },
  { label: 'New Blog Post', href: '/admin/blogs', icon: FileText, color: 'bg-purple-500' },
  { label: 'Manage Gallery', href: '/admin/gallery', icon: Star, color: 'bg-yellow-500' },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-[#F8FAFC]">Dashboard</h1>
        <p className="text-gray-500 dark:text-[#94A3B8] text-sm mt-1">Welcome back! Here&apos;s what&apos;s happening at Gokul Computers.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-[#111827] rounded-2xl p-5 border border-gray-200 dark:border-[#1E293B] hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-[#F8FAFC] mb-1">{stat.value}</div>
            <div className="text-sm font-medium text-gray-600 dark:text-[#94A3B8]">{stat.label}</div>
            <div className="text-xs text-green-600 mt-1">{stat.change}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Enquiries */}
        <div className="lg:col-span-2 bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-[#1E293B] p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-gray-900 dark:text-[#F8FAFC]">Recent Enquiries</h2>
            <Link href="/admin/enquiries" className="text-sm text-[#4F46E5] hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {recentEnquiries.map((e) => (
              <div key={e.phone} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="w-10 h-10 bg-[#4F46E5]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#4F46E5] font-bold text-sm">{e.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 dark:text-[#F8FAFC] text-sm">{e.name}</div>
                  <div className="text-xs text-gray-500">{e.product} • {e.phone}</div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`badge text-xs ${
                    e.status === 'new' ? 'badge-primary' :
                    e.status === 'contacted' ? 'badge-success' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {e.status}
                  </span>
                  <span className="text-xs text-gray-400">{e.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-[#1E293B] p-5">
          <h2 className="font-bold text-gray-900 dark:text-[#F8FAFC] mb-5">Quick Actions</h2>
          <div className="space-y-3">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
              >
                <div className={`w-10 h-10 ${action.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-gray-700 dark:text-[#CBD5E1] group-hover:text-gray-900 dark:group-hover:text-white text-sm">
                  {action.label}
                </span>
                <ArrowUpRight className="w-4 h-4 text-gray-400 ml-auto group-hover:text-gray-600 transition-colors" />
              </Link>
            ))}
          </div>

          {/* Store Info */}
          <div className="mt-5 pt-5 border-t border-gray-200 dark:border-[#1E293B]">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Store Info</div>
            <div className="space-y-2 text-sm text-gray-600 dark:text-[#94A3B8]">
              <div>📍 Thillai Nagar, Trichy - 620018</div>
              <div>📞 07947130911</div>
              <div>⏰ 9:30 AM - 8:00 PM</div>
              <div className="flex items-center gap-1 text-green-600">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Store is Open Today
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
