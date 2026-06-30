'use client';

import { useState } from 'react';
import { Save, Store, Phone, Clock, MapPin, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminSettings() {
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    storeName: 'Gokul Computers',
    tagline: "Trichy's Trusted Laptop Destination",
    phone: '07947130911',
    email: 'info@gokulcomputers.in',
    address: 'No B-7, Vignesh Plaza, Near Dominos Pizza, 1st Cross, Thillai Nagar, Trichy - 620018',
    openTime: '9:30',
    closeTime: '20:00',
    whatsapp: '917947130911',
    googleMapsUrl: '',
    facebook: '',
    instagram: '',
    youtube: '',
  });

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success('Settings saved successfully!');
    setSaving(false);
  };

  const update = (key: string, value: string) => setSettings((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-[#F8FAFC]">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your store information and settings</p>
      </div>

      <div className="space-y-6">
        {/* Store Info */}
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-[#1E293B] p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-[#4F46E5]/10 rounded-xl flex items-center justify-center">
              <Store className="w-5 h-5 text-[#4F46E5]" />
            </div>
            <h2 className="font-bold text-gray-900 dark:text-[#F8FAFC]">Store Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-[#CBD5E1] mb-1">Store Name</label>
              <input value={settings.storeName} onChange={(e) => update('storeName', e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-[#CBD5E1] mb-1">Tagline</label>
              <input value={settings.tagline} onChange={(e) => update('tagline', e.target.value)} className="input-field" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-[#CBD5E1] mb-1">Address</label>
              <textarea value={settings.address} onChange={(e) => update('address', e.target.value)} rows={3} className="input-field resize-none" />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-[#1E293B] p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-[#0A84FF]/10 rounded-xl flex items-center justify-center">
              <Phone className="w-5 h-5 text-[#0A84FF]" />
            </div>
            <h2 className="font-bold text-gray-900 dark:text-[#F8FAFC]">Contact Details</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-[#CBD5E1] mb-1">Phone</label>
              <input value={settings.phone} onChange={(e) => update('phone', e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-[#CBD5E1] mb-1">WhatsApp</label>
              <input value={settings.whatsapp} onChange={(e) => update('whatsapp', e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-[#CBD5E1] mb-1">Email</label>
              <input type="email" value={settings.email} onChange={(e) => update('email', e.target.value)} className="input-field" />
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-[#1E293B] p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="font-bold text-gray-900 dark:text-[#F8FAFC]">Business Hours</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-[#CBD5E1] mb-1">Opening Time</label>
              <input type="time" value={settings.openTime} onChange={(e) => update('openTime', e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-[#CBD5E1] mb-1">Closing Time</label>
              <input type="time" value={settings.closeTime} onChange={(e) => update('closeTime', e.target.value)} className="input-field" />
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-[#4F46E5] hover:bg-[#B91C1C] text-white font-semibold px-6 py-3 rounded-xl transition-colors disabled:opacity-70"
        >
          <Save className="w-5 h-5" />
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}
