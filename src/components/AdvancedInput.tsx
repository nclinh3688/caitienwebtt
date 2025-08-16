'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  FaEdit, 
  FaSave, 
  FaTrash, 
  FaPlus, 
  FaEye, 
  FaEyeSlash,
  FaDownload,
  FaUpload,
  FaCheck,
  FaTimes,
  FaExclamationTriangle,
  FaRocket,
  FaCrown,
  FaStar,
  FaTrophy,
  FaUsers,
  FaBook,
  FaBrain,
  FaMagic,
  FaCog,
  FaFilter,
  FaSearch,
  FaSync,
  FaCopy,
  FaPaste,
  FaUndo,
  FaRedo
} from 'react-icons/fa';

interface InputField {
  id: string;
  name: string;
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'search' | 'tel' | 'url';
  label: string;
  placeholder?: string;
  value: string;
  required: boolean;
  validation?: string;
  error?: string;
  disabled: boolean;
  readonly: boolean;
}

interface InputConfig {
  id: string;
  name: string;
  description: string;
  fields: InputField[];
  theme: 'light' | 'dark' | 'auto';
  size: 'sm' | 'md' | 'lg';
  variant: 'default' | 'outline' | 'ghost';
  status: 'active' | 'inactive' | 'archived';
}

export default function AdvancedInput() {
  const [inputConfigs, setInputConfigs] = useState<InputConfig[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedConfig, setSelectedConfig] = useState<InputConfig | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark' | 'auto'>('light');
  const [selectedSize, setSelectedSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [selectedVariant, setSelectedVariant] = useState<'default' | 'outline' | 'ghost'>('default');

  useEffect(() => {
    console.log('🔄 AdvancedInput: useEffect triggered');
    initializeData();
  }, []);

  const initializeData = () => {
    console.log('🔄 AdvancedInput: Initializing data');
    
    // Mock input configurations
    const mockInputConfigs: InputConfig[] = [
      {
        id: '1',
        name: 'User Profile Inputs',
        description: 'Advanced input fields for user profile management',
        fields: [
          {
            id: '1',
            name: 'fullName',
            type: 'text',
            label: 'Full Name',
            placeholder: 'Enter your full name',
            value: 'Nguyễn Văn A',
            required: true,
            validation: 'min:2,max:50',
            disabled: false,
            readonly: false
          },
          {
            id: '2',
            name: 'email',
            type: 'email',
            label: 'Email Address',
            placeholder: 'Enter your email',
            value: 'nguyenvana@email.com',
            required: true,
            validation: 'email',
            disabled: false,
            readonly: false
          },
          {
            id: '3',
            name: 'phone',
            type: 'tel',
            label: 'Phone Number',
            placeholder: 'Enter your phone number',
            value: '+84 123 456 789',
            required: false,
            validation: 'phone',
            disabled: false,
            readonly: false
          },
          {
            id: '4',
            name: 'bio',
            type: 'textarea',
            label: 'Biography',
            placeholder: 'Tell us about yourself',
            value: 'Passionate Japanese language learner with 2 years of experience.',
            required: false,
            disabled: false,
            readonly: false
          }
        ],
        theme: 'light',
        size: 'md',
        variant: 'default',
        status: 'active'
      },
      {
        id: '2',
        name: 'Search Interface',
        description: 'Enhanced search inputs with autocomplete',
        fields: [
          {
            id: '1',
            name: 'searchQuery',
            type: 'search',
            label: 'Search',
            placeholder: 'Search for lessons, vocabulary, or grammar...',
            value: '',
            required: false,
            disabled: false,
            readonly: false
          },
          {
            id: '2',
            name: 'filterLevel',
            type: 'text',
            label: 'Level Filter',
            placeholder: 'N5, N4, N3...',
            value: 'N5',
            required: false,
            disabled: false,
            readonly: false
          }
        ],
        theme: 'light',
        size: 'md',
        variant: 'outline',
        status: 'active'
      }
    ];

    setInputConfigs(mockInputConfigs);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Input Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Advanced Input System</h3>
              <p className="text-gray-600">Enhanced input components with validation and theming</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">
                {inputConfigs.length}
              </div>
              <div className="text-sm text-blue-600">Input Configurations</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Input Configurations */}
      <div className="space-y-4">
        {inputConfigs.map((config) => (
          <Card key={config.id} className={`border-2 ${
            config.status === 'active' ? 'border-green-200 bg-green-50' :
            config.status === 'inactive' ? 'border-yellow-200 bg-yellow-50' :
            'border-gray-200 bg-gray-50'
          }`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{config.name}</h3>
                  <p className="text-gray-600 mb-3">{config.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Fields: {config.fields.length}</span>
                    <span>Theme: {config.theme}</span>
                    <span>Size: {config.size}</span>
                    <span>Variant: {config.variant}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={
                    config.status === 'active' ? 'bg-green-100 text-green-800' :
                    config.status === 'inactive' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }>
                    {config.status}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedConfig(config);
                      setIsEditing(false);
                    }}
                  >
                    <FaEye />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedConfig(config);
                      setIsEditing(true);
                    }}
                  >
                    <FaEdit />
                  </Button>
                </div>
              </div>

              {/* Input Fields Preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {config.fields.map((field) => (
                  <div key={field.id} className="p-3 bg-white rounded border">
                    <Label className="text-sm font-medium mb-2 block">{field.label}</Label>
                    {field.type === 'textarea' ? (
                      <Textarea
                        placeholder={field.placeholder}
                        value={field.value}
                        disabled={field.disabled}
                        readOnly={field.readonly}
                        className={`w-full ${
                          field.error ? 'border-red-500' : ''
                        }`}
                      />
                    ) : (
                      <Input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={field.value}
                        disabled={field.disabled}
                        readOnly={field.readonly}
                        className={`w-full ${
                          field.error ? 'border-red-500' : ''
                        }`}
                      />
                    )}
                    {field.error && (
                      <p className="text-red-500 text-xs mt-1">{field.error}</p>
                    )}
                    {field.validation && (
                      <p className="text-gray-500 text-xs mt-1">Validation: {field.validation}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create New Configuration Button */}
      <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
        <CardContent className="p-6 text-center">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <FaPlus className="mr-2" />
            Create New Input Configuration
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderPlayground = () => (
    <div className="space-y-6">
      {/* Playground Overview */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Input Playground</h3>
              <p className="text-gray-600">Test and customize input components in real-time</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">
                <FaEdit className="text-4xl" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configuration Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaCog className="text-blue-600" />
              Theme
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(['light', 'dark', 'auto'] as const).map((theme) => (
                <label key={theme} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="theme"
                    value={theme}
                    checked={selectedTheme === theme}
                    onChange={(e) => setSelectedTheme(e.target.value as 'light' | 'dark' | 'auto')}
                  />
                  <span className="text-sm capitalize">{theme}</span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaCog className="text-green-600" />
              Size
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(['sm', 'md', 'lg'] as const).map((size) => (
                <label key={size} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="size"
                    value={size}
                    checked={selectedSize === size}
                    onChange={(e) => setSelectedSize(e.target.value as 'sm' | 'md' | 'lg')}
                  />
                  <span className="text-sm capitalize">{size}</span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaCog className="text-purple-600" />
              Variant
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(['default', 'outline', 'ghost'] as const).map((variant) => (
                <label key={variant} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="variant"
                    value={variant}
                    checked={selectedVariant === variant}
                    onChange={(e) => setSelectedVariant(e.target.value as 'default' | 'outline' | 'ghost')}
                  />
                  <span className="text-sm capitalize">{variant}</span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaEye className="text-orange-600" />
            Live Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <Label>Text Input</Label>
              <Input
                placeholder="Type something here..."
                className={`mt-2 ${
                  selectedSize === 'sm' ? 'h-8 text-sm' :
                  selectedSize === 'lg' ? 'h-12 text-lg' : 'h-10'
                }`}
              />
            </div>

            <div>
              <Label>Email Input</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                className={`mt-2 ${
                  selectedSize === 'sm' ? 'h-8 text-sm' :
                  selectedSize === 'lg' ? 'h-12 text-lg' : 'h-10'
                }`}
              />
            </div>

            <div>
              <Label>Textarea</Label>
              <Textarea
                placeholder="Enter your message..."
                className={`mt-2 ${
                  selectedSize === 'sm' ? 'min-h-[80px] text-sm' :
                  selectedSize === 'lg' ? 'min-h-[120px] text-lg' : 'min-h-[100px]'
                }`}
              />
            </div>

            <div>
              <Label>Search Input</Label>
              <Input
                type="search"
                placeholder="Search..."
                className={`mt-2 ${
                  selectedSize === 'sm' ? 'h-8 text-sm' :
                  selectedSize === 'lg' ? 'h-12 text-lg' : 'h-10'
                }`}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderValidation = () => (
    <div className="space-y-6">
      {/* Validation Overview */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Input Validation</h3>
              <p className="text-gray-600">Advanced validation rules and error handling</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-purple-600">
                <FaCheck className="text-4xl" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Validation Examples */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaCheck className="text-green-600" />
              Valid Inputs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Valid Email</Label>
                <Input
                  type="email"
                  value="user@example.com"
                  className="mt-2 border-green-500 bg-green-50"
                />
                <p className="text-green-600 text-xs mt-1">✓ Valid email format</p>
              </div>
              <div>
                <Label>Valid Phone</Label>
                <Input
                  type="tel"
                  value="+84 123 456 789"
                  className="mt-2 border-green-500 bg-green-50"
                />
                <p className="text-green-600 text-xs mt-1">✓ Valid phone format</p>
              </div>
              <div>
                <Label>Valid URL</Label>
                <Input
                  type="url"
                  value="https://example.com"
                  className="mt-2 border-green-500 bg-green-50"
                />
                <p className="text-green-600 text-xs mt-1">✓ Valid URL format</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaTimes className="text-red-600" />
              Invalid Inputs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Invalid Email</Label>
                <Input
                  type="email"
                  value="invalid-email"
                  className="mt-2 border-red-500 bg-red-50"
                />
                <p className="text-red-600 text-xs mt-1">✗ Please enter a valid email address</p>
              </div>
              <div>
                <Label>Invalid Phone</Label>
                <Input
                  type="tel"
                  value="123"
                  className="mt-2 border-red-500 bg-red-50"
                />
                <p className="text-red-600 text-xs mt-1">✗ Please enter a valid phone number</p>
              </div>
              <div>
                <Label>Invalid URL</Label>
                <Input
                  type="url"
                  value="not-a-url"
                  className="mt-2 border-red-500 bg-red-50"
                />
                <p className="text-red-600 text-xs mt-1">✗ Please enter a valid URL</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Validation Rules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaCog className="text-blue-600" />
            Validation Rules
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Text Validation</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• min: 2 characters</li>
                <li>• max: 50 characters</li>
                <li>• required field</li>
                <li>• alphanumeric only</li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Email Validation</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• valid email format</li>
                <li>• required field</li>
                <li>• max: 100 characters</li>
                <li>• unique in system</li>
              </ul>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">Phone Validation</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• international format</li>
                <li>• optional field</li>
                <li>• min: 10 digits</li>
                <li>• max: 15 digits</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: FaEye },
    { id: 'playground', label: 'Playground', icon: FaEdit },
    { id: 'validation', label: 'Validation', icon: FaCheck }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaEdit className="text-blue-600" />
            Advanced Input System
          </h1>
          <p className="text-gray-600 mt-1">
            Hệ thống input nâng cao với validation và theming
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search inputs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <Button variant="outline">
            <FaDownload className="mr-2" />
            Export
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <FaRocket className="mr-2" />
            Create Input
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
                    ? 'border-blue-500 text-blue-600'
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
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'playground' && renderPlayground()}
      {activeTab === 'validation' && renderValidation()}
    </div>
  );
}
