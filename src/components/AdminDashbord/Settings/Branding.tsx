
import React, { useState } from 'react';
import { FONTS } from './constants';

const FileUpload: React.FC<{ title: string; subtitle: string; icon: React.ReactNode }> = ({ title, subtitle, icon }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">{title}</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
            <div className="space-y-2 text-center">
                {icon}
                <p className="text-sm text-slate-600">Upload {title.toLowerCase()}</p>
                <div className="text-sm">
                     <label htmlFor={`file-upload-${title.replace(/\s+/g, '-')}`} className="cursor-pointer font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-md px-3 py-1.5 transition">
                        <span>Choose File</span>
                        <input id={`file-upload-${title.replace(/\s+/g, '-')}`} name={`file-upload-${title.replace(/\s+/g, '-')}`} type="file" className="sr-only" />
                    </label>
                </div>
                 <p className="text-xs text-slate-500">{subtitle}</p>
            </div>
        </div>
    </div>
);

const Branding: React.FC = () => {
    const [primaryColor, setPrimaryColor] = useState('#2563eb');
    const [secondaryColor, setSecondaryColor] = useState('#0f172a');
    const [accentColor, setAccentColor] = useState('#93c5fd');
    const [headingFont, setHeadingFont] = useState('Inter');
    const [bodyFont, setBodyFont] = useState('Inter');


  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
        <h2 className="text-xl font-semibold text-slate-900">Branding & Appearance</h2>
        <p className="text-slate-500 mt-1 text-sm">Customize the look and feel of your platform</p>
        
        <form className="mt-8 space-y-8 divide-y divide-slate-200">
            {/* Logo & Assets */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">Logo & Assets</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FileUpload 
                        title="Platform Logo" 
                        subtitle="(max 2MB)" 
                        icon={<svg className="mx-auto h-10 w-10 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    />
                     <FileUpload 
                        title="Favicon" 
                        subtitle="(32x32 px)" 
                        icon={<svg className="mx-auto h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 9a9 9 0 01-9 9" /></svg>}
                    />
                </div>
            </div>

            {/* Color Scheme */}
            <div className="pt-8 space-y-4">
                 <h3 className="text-lg font-semibold text-slate-900">Color Scheme</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                        <label htmlFor="primaryColor" className="block text-sm font-medium text-slate-700">Primary Color</label>
                        <div className="mt-1 flex items-center rounded-md shadow-sm">
                            <div className="relative">
                               <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                               <div className="w-10 h-10 rounded-l-md border border-r-0 border-slate-300" style={{ backgroundColor: primaryColor }}></div>
                            </div>
                            <input type="text" id="primaryColor" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-slate-300"/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="secondaryColor" className="block text-sm font-medium text-slate-700">Secondary Color</label>
                        <div className="mt-1 flex items-center rounded-md shadow-sm">
                            <div className="relative">
                               <input type="color" value={secondaryColor} onChange={e => setSecondaryColor(e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                               <div className="w-10 h-10 rounded-l-md border border-r-0 border-slate-300" style={{ backgroundColor: secondaryColor }}></div>
                            </div>
                            <input type="text" id="secondaryColor" value={secondaryColor} onChange={e => setSecondaryColor(e.target.value)} className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-slate-300"/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="accentColor" className="block text-sm font-medium text-slate-700">Accent Color</label>
                        <div className="mt-1 flex items-center rounded-md shadow-sm">
                            <div className="relative">
                               <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                               <div className="w-10 h-10 rounded-l-md border border-r-0 border-slate-300" style={{ backgroundColor: accentColor }}></div>
                            </div>
                            <input type="text" id="accentColor" value={accentColor} onChange={e => setAccentColor(e.target.value)} className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-slate-300"/>
                        </div>
                    </div>
                 </div>
            </div>
            
            {/* Typography */}
            <div className="pt-8 space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">Typography</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="headingFont" className="block text-sm font-medium text-slate-700">Heading Font</label>
                        <select id="headingFont" value={headingFont} onChange={e => setHeadingFont(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                             {FONTS.map(font => <option key={font}>{font}</option>)}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="bodyFont" className="block text-sm font-medium text-slate-700">Body Font</label>
                        <select id="bodyFont" value={bodyFont} onChange={e => setBodyFont(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                            {FONTS.map(font => <option key={font}>{font}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex justify-start pt-8">
                <button type="button" className="inline-flex cursor-pointer justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Save Branding Changes
                </button>
            </div>
        </form>
    </div>
  );
};

export default Branding;
