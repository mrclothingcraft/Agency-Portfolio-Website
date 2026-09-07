import React from 'react';
import { Code, Palette, Video, TrendingUp, ShoppingBag, Smartphone, Store } from 'lucide-react';

interface IsometricServiceIconProps {
  type: 'code' | 'palette' | 'video' | 'trending' | 'shopping-bag' | 'smartphone' | 'store' | string;
  size?: 'sm' | 'md' | 'lg';
}

export const IsometricServiceIcon: React.FC<IsometricServiceIconProps> = ({
  type,
  size = 'md'
}) => {
  const dimensions = {
    sm: 'h-10 w-10',
    md: 'h-14 w-14',
    lg: 'h-20 w-20'
  }[size];

  const iconSizes = {
    sm: 18,
    md: 26,
    lg: 36
  }[size];

  // Specific theme gradient per service from the Vector Gradient Blue Set
  const themeMap: Record<string, {
    border: string;
    glow: string;
    topSheen: string;
    iconColor: string;
    accentDot: string;
  }> = {
    code: {
      border: 'border-[#3E7BFA]/40 group-hover:border-[#3E7BFA]',
      glow: 'shadow-[0_8px_20px_rgba(0,0,0,0.6),0_0_20px_rgba(62,123,250,0.25)]',
      topSheen: 'from-[#3E7BFA]/20 to-transparent',
      iconColor: 'text-[#3E7BFA] group-hover:text-[#F3F5FA]',
      accentDot: 'bg-[#17B4E0] shadow-[0_0_8px_#17B4E0]'
    },
    palette: {
      border: 'border-[#7B4CF0]/40 group-hover:border-[#7B4CF0]',
      glow: 'shadow-[0_8px_20px_rgba(0,0,0,0.6),0_0_20px_rgba(123,76,240,0.25)]',
      topSheen: 'from-[#7B4CF0]/20 to-transparent',
      iconColor: 'text-[#A78BFA] group-hover:text-[#F3F5FA]',
      accentDot: 'bg-[#7B4CF0] shadow-[0_0_8px_#7B4CF0]'
    },
    video: {
      border: 'border-[#17B4E0]/40 group-hover:border-[#17B4E0]',
      glow: 'shadow-[0_8px_20px_rgba(0,0,0,0.6),0_0_20px_rgba(23,180,224,0.25)]',
      topSheen: 'from-[#17B4E0]/20 to-transparent',
      iconColor: 'text-[#38BDF8] group-hover:text-[#F3F5FA]',
      accentDot: 'bg-[#17B4E0] shadow-[0_0_8px_#17B4E0]'
    },
    trending: {
      border: 'border-[#4C4FCE]/40 group-hover:border-[#4C4FCE]',
      glow: 'shadow-[0_8px_20px_rgba(0,0,0,0.6),0_0_20px_rgba(76,79,206,0.25)]',
      topSheen: 'from-[#4C4FCE]/20 to-transparent',
      iconColor: 'text-[#818CF8] group-hover:text-[#F3F5FA]',
      accentDot: 'bg-[#4C4FCE] shadow-[0_0_8px_#4C4FCE]'
    },
    'shopping-bag': {
      border: 'border-[#3A6CE0]/40 group-hover:border-[#3A6CE0]',
      glow: 'shadow-[0_8px_20px_rgba(0,0,0,0.6),0_0_20px_rgba(58,108,224,0.25)]',
      topSheen: 'from-[#3A6CE0]/20 to-transparent',
      iconColor: 'text-[#60A5FA] group-hover:text-[#F3F5FA]',
      accentDot: 'bg-[#3E7BFA] shadow-[0_0_8px_#3E7BFA]'
    },
    smartphone: {
      border: 'border-[#17B4E0]/40 group-hover:border-[#17B4E0]',
      glow: 'shadow-[0_8px_20px_rgba(0,0,0,0.6),0_0_20px_rgba(23,180,224,0.3)]',
      topSheen: 'from-[#17B4E0]/25 to-transparent',
      iconColor: 'text-[#38BDF8] group-hover:text-[#F3F5FA]',
      accentDot: 'bg-[#17B4E0] shadow-[0_0_8px_#17B4E0]'
    },
    store: {
      border: 'border-[#3E7BFA]/40 group-hover:border-[#3E7BFA]',
      glow: 'shadow-[0_8px_20px_rgba(0,0,0,0.6),0_0_20px_rgba(62,123,250,0.3)]',
      topSheen: 'from-[#3E7BFA]/25 to-transparent',
      iconColor: 'text-[#60A5FA] group-hover:text-[#F3F5FA]',
      accentDot: 'bg-[#3E7BFA] shadow-[0_0_8px_#3E7BFA]'
    }
  };

  const currentTheme = themeMap[type] || themeMap.code;

  return (
    <div className={`relative ${dimensions} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
      {/* 3D Isometric Base Platform */}
      <div 
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-[#161F36] via-[#101626] to-[#0A0E1A] border ${currentTheme.border} ${currentTheme.glow} transition-all duration-300`}
        style={{
          transform: 'perspective(400px) rotateX(15deg) rotateY(-10deg)',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Top glossy bevel */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-t ${currentTheme.topSheen} pointer-events-none`} />
        
        {/* 3D depth layer beneath */}
        <div className="absolute -bottom-1.5 inset-x-1 h-3 rounded-b-2xl bg-[#0A0E1A] -z-10 border-b border-[#1E2945] opacity-90" />
      </div>

      {/* Floating Foreground Isometric Glyphs */}
      <div className={`relative z-10 ${currentTheme.iconColor} transition-colors duration-300 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]`}>
        {type === 'code' && <Code size={iconSizes} className="stroke-[2.2]" />}
        {type === 'palette' && <Palette size={iconSizes} className="stroke-[2.2]" />}
        {type === 'video' && <Video size={iconSizes} className="stroke-[2.2]" />}
        {type === 'trending' && <TrendingUp size={iconSizes} className="stroke-[2.2]" />}
        {type === 'shopping-bag' && <ShoppingBag size={iconSizes} className="stroke-[2.2]" />}
        {type === 'smartphone' && <Smartphone size={iconSizes} className="stroke-[2.2]" />}
        {type === 'store' && <Store size={iconSizes} className="stroke-[2.2]" />}
      </div>

      {/* Subtle Micro Accent Light */}
      <div className={`absolute top-1 right-1 h-1.5 w-1.5 rounded-full ${currentTheme.accentDot}`} />
    </div>
  );
};
