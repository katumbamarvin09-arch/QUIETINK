/*
====================================================================
QUIETINK SERENE FOOTER
====================================================================
FILE: src/components/Footer.tsx
PURPOSE:
Provides a quiet, unhurried conclusion to every page. Contains brand
information, customizable social links, copyright declarations,
and an discreet portal to the administrator panel.

WHAT YOU CAN CUSTOMIZE:
- Copyright text
- Social media links (edit in src/config/siteConfig.ts)
- Footer message
====================================================================
*/

import React from 'react';
import { Feather, Shield, Settings } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { ThemeConfig } from '../types/journal';

interface FooterProps {
  activeTheme: ThemeConfig;
  onOpenAdmin: () => void;
  onNavigate: (view: string) => void;
  customSocialLinks?: typeof siteConfig.socialLinks;
}

export const Footer: React.FC<FooterProps> = ({
  activeTheme,
  onOpenAdmin,
  onNavigate,
}) => {
  return (
    <footer
      id="quietink-footer"
      className="border-t py-12 transition-colors duration-300"
      style={{
        backgroundColor: activeTheme.bgPage,
        borderColor: activeTheme.borderColor,
        color: activeTheme.textSecondary
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b" style={{ borderColor: activeTheme.borderColor }}>
          {/* Logo & Tagline */}
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => onNavigate('landing')}>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden bg-white border shadow-xs transition-transform duration-300 group-hover:scale-105"
              style={{ borderColor: activeTheme.borderColor }}
            >
              {siteConfig.logoPath ? (
                <img
                  src={siteConfig.logoPath}
                  alt={siteConfig.siteName}
                  className="w-full h-full object-contain p-0.5 transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const icon = e.currentTarget.parentElement?.querySelector('.fallback-footer-feather') as HTMLElement;
                    if (icon) icon.style.display = 'block';
                  }}
                />
              ) : null}
              <Feather
                className="w-4 h-4 fallback-footer-feather"
                style={{
                  display: siteConfig.logoPath ? 'none' : 'block',
                  color: activeTheme.accentColor
                }}
              />
            </div>
            <div>
              <span className="font-serif text-lg font-semibold tracking-tight block" style={{ color: activeTheme.textPrimary }}>
                {siteConfig.siteName}
              </span>
              <span className="text-[11px] font-sans block opacity-80">
                {siteConfig.siteTagline}
              </span>
            </div>
          </div>

          {/* Calm Navigation Links with gentle hover lift */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <button onClick={() => onNavigate('landing')} className="hover:underline cursor-pointer transition-transform duration-200 hover:scale-105 hover:-translate-y-0.5">
              Sanctuary
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('dashboard')} className="hover:underline cursor-pointer transition-transform duration-200 hover:scale-105 hover:-translate-y-0.5">
              Dashboard
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('writing')} className="hover:underline cursor-pointer transition-transform duration-200 hover:scale-105 hover:-translate-y-0.5">
              Writing Room
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('capsules')} className="hover:underline cursor-pointer transition-transform duration-200 hover:scale-105 hover:-translate-y-0.5">
              Time Capsules
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('future-me')} className="hover:underline cursor-pointer transition-transform duration-200 hover:scale-105 hover:-translate-y-0.5">
              Future Me
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('garden')} className="hover:underline cursor-pointer transition-transform duration-200 hover:scale-105 hover:-translate-y-0.5">
              Quiet Garden
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('library')} className="hover:underline cursor-pointer transition-transform duration-200 hover:scale-105 hover:-translate-y-0.5">
              Library
            </button>
          </div>

          {/* Admin portal trigger */}
          <div>
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center space-x-1.5 text-xs opacity-60 hover:opacity-100 transition-all duration-200 hover:scale-105 cursor-pointer px-2.5 py-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
              title="Platform Administration"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright and zero-tracker sanctuary notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-center sm:text-left">
          <div>
            <p className="text-[11px]">
              {siteConfig.copyrightText}
            </p>
            <p className="text-[10px] opacity-60 mt-0.5">
              Crafted by <span className="underline font-medium">{siteConfig.ownerName}</span> for mindful reflection and executive solitude.
            </p>
          </div>

          <div className="flex items-center space-x-3 text-[11px]">
            <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full border text-emerald-700 dark:text-emerald-300 text-[11px] font-medium tracking-wide shadow-2xs" style={{ borderColor: activeTheme.borderColor, backgroundColor: activeTheme.bgCard }}>
              <Shield className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>Zero-Tracker Sanctuary</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
