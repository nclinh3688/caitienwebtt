'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FaPalette, 
  FaMoon, 
  FaSun, 
  FaEye, 
  FaCode, 
  FaCopy,
  FaCheck,
  FaPalette as FaPaletteIcon,
  FaPalette as FaColorPalette,
  FaFont,
  FaShapes,
  FaLayerGroup,
  FaMagic,
  FaDownload,
  FaUpload,
  FaCog,
  FaRocket
} from 'react-icons/fa';

interface ColorScheme {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  border: string;
}

interface TypographyScale {
  name: string;
  size: string;
  weight: string;
  lineHeight: string;
  example: string;
}

interface ComponentVariant {
  name: string;
  variant: string;
  example: JSX.Element;
  code: string;
}

export default function DesignSystem() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeTab, setActiveTab] = useState('colors');
  const [selectedColorScheme, setSelectedColorScheme] = useState('default');

  const colorSchemes: ColorScheme[] = [
    {
      name: 'Default',
      primary: '#3B82F6',
      secondary: '#10B981',
      accent: '#8B5CF6',
      background: '#FFFFFF',
      surface: '#F9FAFB',
      text: '#111827',
      border: '#E5E7EB'
    },
    {
      name: 'Ocean',
      primary: '#0EA5E9',
      secondary: '#06B6D4',
      accent: '#6366F1',
      background: '#F0F9FF',
      surface: '#E0F2FE',
      text: '#0C4A6E',
      border: '#BAE6FD'
    },
    {
      name: 'Forest',
      primary: '#059669',
      secondary: '#10B981',
      accent: '#84CC16',
      background: '#F0FDF4',
      surface: '#DCFCE7',
      text: '#14532D',
      border: '#BBF7D0'
    },
    {
      name: 'Sunset',
      primary: '#DC2626',
      secondary: '#EA580C',
      accent: '#D97706',
      background: '#FEF2F2',
      surface: '#FED7D7',
      text: '#7F1D1D',
      border: '#FECACA'
    }
  ];

  const typographyScale: TypographyScale[] = [
    {
      name: 'Display Large',
      size: '4.5rem',
      weight: '900',
      lineHeight: '1.1',
      example: 'Display Large Text'
    },
    {
      name: 'Display Medium',
      size: '3.75rem',
      weight: '800',
      lineHeight: '1.2',
      example: 'Display Medium'
    },
    {
      name: 'Display Small',
      size: '3rem',
      weight: '700',
      lineHeight: '1.3',
      example: 'Display Small'
    },
    {
      name: 'Headline Large',
      size: '2.25rem',
      weight: '700',
      lineHeight: '1.4',
      example: 'Headline Large'
    },
    {
      name: 'Headline Medium',
      size: '1.875rem',
      weight: '600',
      lineHeight: '1.5',
      example: 'Headline Medium'
    },
    {
      name: 'Headline Small',
      size: '1.5rem',
      weight: '600',
      lineHeight: '1.5',
      example: 'Headline Small'
    },
    {
      name: 'Title Large',
      size: '1.375rem',
      weight: '500',
      lineHeight: '1.6',
      example: 'Title Large'
    },
    {
      name: 'Title Medium',
      size: '1.125rem',
      weight: '500',
      lineHeight: '1.6',
      example: 'Title Medium'
    },
    {
      name: 'Title Small',
      size: '1rem',
      weight: '500',
      lineHeight: '1.6',
      example: 'Title Small'
    },
    {
      name: 'Body Large',
      size: '1.125rem',
      weight: '400',
      lineHeight: '1.7',
      example: 'Body Large Text'
    },
    {
      name: 'Body Medium',
      size: '1rem',
      weight: '400',
      lineHeight: '1.7',
      example: 'Body Medium Text'
    },
    {
      name: 'Body Small',
      size: '0.875rem',
      weight: '400',
      lineHeight: '1.7',
      example: 'Body Small Text'
    },
    {
      name: 'Label Large',
      size: '0.875rem',
      weight: '500',
      lineHeight: '1.6',
      example: 'Label Large'
    },
    {
      name: 'Label Medium',
      size: '0.75rem',
      weight: '500',
      lineHeight: '1.6',
      example: 'Label Medium'
    },
    {
      name: 'Label Small',
      size: '0.6875rem',
      weight: '500',
      lineHeight: '1.6',
      example: 'Label Small'
    }
  ];

  const componentVariants: ComponentVariant[] = [
    {
      name: 'Button',
      variant: 'Primary',
      example: <Button>Primary Button</Button>,
      code: '<Button>Primary Button</Button>'
    },
    {
      name: 'Button',
      variant: 'Secondary',
      example: <Button variant="outline">Secondary Button</Button>,
      code: '<Button variant="outline">Secondary Button</Button>'
    },
    {
      name: 'Button',
      variant: 'Destructive',
      example: <Button variant="destructive">Destructive Button</Button>,
      code: '<Button variant="destructive">Destructive Button</Button>'
    },
    {
      name: 'Badge',
      variant: 'Default',
      example: <Badge>Default Badge</Badge>,
      code: '<Badge>Default Badge</Badge>'
    },
    {
      name: 'Badge',
      variant: 'Secondary',
      example: <Badge variant="secondary">Secondary Badge</Badge>,
      code: '<Badge variant="secondary">Secondary Badge</Badge>'
    },
    {
      name: 'Badge',
      variant: 'Outline',
      example: <Badge variant="outline">Outline Badge</Badge>,
      code: '<Badge variant="outline">Outline Badge</Badge>'
    }
  ];

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const renderColors = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Color Schemes</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="flex items-center gap-2"
          >
            {theme === 'light' ? <FaMoon /> : <FaSun />}
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {colorSchemes.map((scheme) => (
          <Card 
            key={scheme.name} 
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedColorScheme === scheme.name ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedColorScheme(scheme.name)}
          >
            <CardHeader>
              <CardTitle className="text-lg">{scheme.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-sm text-gray-600 mb-2">Primary</div>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded border border-gray-200"
                      style={{ backgroundColor: scheme.primary }}
                    ></div>
                    <span className="text-sm font-mono">{scheme.primary}</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 mb-2">Secondary</div>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded border border-gray-200"
                      style={{ backgroundColor: scheme.secondary }}
                    ></div>
                    <span className="text-sm font-mono">{scheme.secondary}</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 mb-2">Accent</div>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded border border-gray-200"
                      style={{ backgroundColor: scheme.accent }}
                    ></div>
                    <span className="text-sm font-mono">{scheme.accent}</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 mb-2">Background</div>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded border border-gray-200"
                      style={{ backgroundColor: scheme.background }}
                    ></div>
                    <span className="text-sm font-mono">{scheme.background}</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600 mb-2">Preview</div>
                <div 
                  className="p-4 rounded-lg border"
                  style={{ 
                    backgroundColor: scheme.background,
                    borderColor: scheme.border
                  }}
                >
                  <div 
                    className="text-lg font-semibold mb-2"
                    style={{ color: scheme.text }}
                  >
                    Sample Title
                  </div>
                  <div 
                    className="text-sm mb-3"
                    style={{ color: scheme.text }}
                  >
                    This is a sample text to show how the color scheme looks.
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm"
                      style={{ backgroundColor: scheme.primary }}
                    >
                      Primary
                    </Button>
                    <Button 
                      size="sm"
                      variant="outline"
                      style={{ 
                        borderColor: scheme.secondary,
                        color: scheme.secondary
                      }}
                    >
                      Secondary
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderTypography = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Typography Scale</h2>
      
      <div className="space-y-4">
        {typographyScale.map((type) => (
          <Card key={type.name} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm text-gray-600 mb-1">{type.name}</div>
                  <div 
                    className="font-mono text-xs text-gray-500"
                    style={{
                      fontSize: type.size,
                      fontWeight: type.weight,
                      lineHeight: type.lineHeight
                    }}
                  >
                    {type.example}
                  </div>
                </div>
                
                <div className="text-right text-sm text-gray-600">
                  <div>{type.size}</div>
                  <div>{type.weight}</div>
                  <div>{type.lineHeight}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderComponents = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Component Variants</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {componentVariants.map((component, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">
                {component.name} - {component.variant}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-2">Preview</div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  {component.example}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 mb-2">Code</div>
                <div className="relative">
                  <pre className="p-3 bg-gray-900 text-gray-100 rounded-lg text-sm overflow-x-auto">
                    <code>{component.code}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(component.code)}
                  >
                    <FaCopy className="mr-1" />
                    Copy
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const tabs = [
    { id: 'colors', label: 'Colors', icon: FaPaletteIcon },
    { id: 'typography', label: 'Typography', icon: FaFont },
    { id: 'components', label: 'Components', icon: FaShapes }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaPalette className="text-purple-600" />
            Design System
          </h1>
          <p className="text-gray-600 mt-1">
            Hệ thống thiết kế thống nhất cho PHÚC KHIÊM EDU
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline">
            <FaDownload className="mr-2" />
            Export
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <FaMagic className="mr-2" />
            Apply Theme
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'colors' && renderColors()}
      {activeTab === 'typography' && renderTypography()}
      {activeTab === 'components' && renderComponents()}
    </div>
  );
}