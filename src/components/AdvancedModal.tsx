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
  FaRedo,
  FaWindowMaximize,
  FaWindowMinimize,
  FaExpand,
  FaCompress
} from 'react-icons/fa';

interface ModalConfig {
  id: string;
  name: string;
  description: string;
  type: 'info' | 'warning' | 'error' | 'success' | 'confirm' | 'form';
  size: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  position: 'center' | 'top' | 'bottom' | 'left' | 'right';
  animation: 'fade' | 'slide' | 'zoom' | 'bounce';
  backdrop: boolean;
  closable: boolean;
  status: 'active' | 'inactive' | 'archived';
}

interface ModalTemplate {
  id: string;
  name: string;
  description: string;
  config: ModalConfig;
  content: string;
  usage: string;
}

export default function AdvancedModal() {
  const [modalConfigs, setModalConfigs] = useState<ModalConfig[]>([]);
  const [modalTemplates, setModalTemplates] = useState<ModalTemplate[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedModal, setSelectedModal] = useState<ModalConfig | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModalType, setCurrentModalType] = useState<'info' | 'warning' | 'error' | 'success' | 'confirm' | 'form'>('info');

  useEffect(() => {
    console.log('🔄 AdvancedModal: useEffect triggered');
    initializeData();
  }, []);

  const initializeData = () => {
    console.log('🔄 AdvancedModal: Initializing data');
    
    // Mock modal configurations
    const mockModalConfigs: ModalConfig[] = [
      {
        id: '1',
        name: 'Info Modal',
        description: 'Standard information display modal',
        type: 'info',
        size: 'md',
        position: 'center',
        animation: 'fade',
        backdrop: true,
        closable: true,
        status: 'active'
      },
      {
        id: '2',
        name: 'Warning Modal',
        description: 'Warning message with action buttons',
        type: 'warning',
        size: 'md',
        position: 'center',
        animation: 'slide',
        backdrop: true,
        closable: true,
        status: 'active'
      },
      {
        id: '3',
        name: 'Form Modal',
        description: 'Large modal for form inputs',
        type: 'form',
        size: 'lg',
        position: 'center',
        animation: 'zoom',
        backdrop: true,
        closable: true,
        status: 'active'
      },
      {
        id: '4',
        name: 'Full Screen Modal',
        description: 'Full screen modal for immersive content',
        type: 'info',
        size: 'full',
        position: 'center',
        animation: 'fade',
        backdrop: true,
        closable: true,
        status: 'active'
      }
    ];

    // Mock modal templates
    const mockModalTemplates: ModalTemplate[] = [
      {
        id: '1',
        name: 'User Profile Modal',
        description: 'Modal for editing user profile information',
        config: mockModalConfigs[2],
        content: 'Form with user profile fields',
        usage: 'User settings, profile editing'
      },
      {
        id: '2',
        name: 'Confirmation Dialog',
        description: 'Simple confirmation modal with yes/no options',
        config: mockModalConfigs[1],
        content: 'Confirmation message with action buttons',
        usage: 'Delete confirmations, action confirmations'
      },
      {
        id: '3',
        name: 'Success Notification',
        description: 'Success message modal with auto-close',
        config: mockModalConfigs[0],
        content: 'Success message with icon and description',
        usage: 'Form submissions, action completions'
      }
    ];

    setModalConfigs(mockModalConfigs);
    setModalTemplates(mockModalTemplates);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Modal Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Advanced Modal System</h3>
              <p className="text-gray-600">Flexible modal components with multiple configurations</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">
                {modalConfigs.length}
              </div>
              <div className="text-sm text-blue-600">Modal Configurations</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal Configurations */}
      <div className="space-y-4">
        {modalConfigs.map((config) => (
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
                    <span>Type: {config.type}</span>
                    <span>Size: {config.size}</span>
                    <span>Position: {config.position}</span>
                    <span>Animation: {config.animation}</span>
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
                      setSelectedModal(config);
                      setIsEditing(false);
                    }}
                  >
                    <FaEye />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedModal(config);
                      setIsEditing(true);
                    }}
                  >
                    <FaEdit />
                  </Button>
                </div>
              </div>

              {/* Modal Properties */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-white rounded border text-center">
                  <div className="text-sm text-gray-500">Backdrop</div>
                  <div className="font-medium">{config.backdrop ? 'Yes' : 'No'}</div>
                </div>
                <div className="p-3 bg-white rounded border text-center">
                  <div className="text-sm text-gray-500">Closable</div>
                  <div className="font-medium">{config.closable ? 'Yes' : 'No'}</div>
                </div>
                <div className="p-3 bg-white rounded border text-center">
                  <div className="text-sm text-gray-500">Size</div>
                  <div className="font-medium capitalize">{config.size}</div>
                </div>
                <div className="p-3 bg-white rounded border text-center">
                  <div className="text-sm text-gray-500">Animation</div>
                  <div className="font-medium capitalize">{config.animation}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create New Modal Button */}
      <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
        <CardContent className="p-6 text-center">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <FaPlus className="mr-2" />
            Create New Modal Configuration
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderTemplates = () => (
    <div className="space-y-6">
      {/* Templates Overview */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Modal Templates</h3>
              <p className="text-gray-600">Pre-built modal configurations for common use cases</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">
                {modalTemplates.length}
              </div>
              <div className="text-sm text-green-600">Available Templates</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modalTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">
                  {template.config.type === 'info' ? 'ℹ️' :
                   template.config.type === 'warning' ? '⚠️' :
                   template.config.type === 'error' ? '❌' :
                   template.config.type === 'success' ? '✅' :
                   template.config.type === 'confirm' ? '❓' : '📝'}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                <p className="text-sm text-gray-600">{template.description}</p>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Type:</span>
                  <Badge variant="outline" className="capitalize">{template.config.type}</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Size:</span>
                  <Badge variant="outline" className="capitalize">{template.config.size}</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Animation:</span>
                  <Badge variant="outline" className="capitalize">{template.config.animation}</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs text-gray-500">
                  <strong>Content:</strong> {template.content}
                </div>
                <div className="text-xs text-gray-500">
                  <strong>Usage:</strong> {template.usage}
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    setCurrentModalType(template.config.type);
                    setIsModalOpen(true);
                  }}
                >
                  <FaEye className="mr-2" />
                  Preview
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <FaCopy className="mr-2" />
                  Use Template
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderPlayground = () => (
    <div className="space-y-6">
      {/* Playground Overview */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Modal Playground</h3>
              <p className="text-gray-600">Test different modal configurations in real-time</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-purple-600">
                <FaWindowMaximize className="text-4xl" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal Type Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaCog className="text-blue-600" />
            Modal Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {(['info', 'warning', 'error', 'success', 'confirm', 'form'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setCurrentModalType(type)}
                className={`p-4 border-2 rounded-lg text-center transition-all ${
                  currentModalType === type
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-2">
                  {type === 'info' ? 'ℹ️' :
                   type === 'warning' ? '⚠️' :
                   type === 'error' ? '❌' :
                   type === 'success' ? '✅' :
                   type === 'confirm' ? '❓' : '📝'}
                </div>
                <div className="font-medium capitalize">{type}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Test Modal Button */}
      <Card>
        <CardContent className="p-6 text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onClick={() => setIsModalOpen(true)}
          >
            <FaWindowMaximize className="mr-2" />
            Open {currentModalType.charAt(0).toUpperCase() + currentModalType.slice(1)} Modal
          </Button>
        </CardContent>
      </Card>

      {/* Modal Properties */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaCog className="text-green-600" />
              Display Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Show Backdrop</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Closable</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Auto Close</span>
                <input type="checkbox" className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Draggable</span>
                <input type="checkbox" className="rounded" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaCog className="text-purple-600" />
              Animation Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label className="text-sm">Animation Type</Label>
                <select className="w-full mt-1 px-3 py-2 border rounded-md">
                  <option value="fade">Fade</option>
                  <option value="slide">Slide</option>
                  <option value="zoom">Zoom</option>
                  <option value="bounce">Bounce</option>
                </select>
              </div>
              <div>
                <Label className="text-sm">Duration (ms)</Label>
                <Input type="number" defaultValue={300} className="mt-1" />
              </div>
              <div>
                <Label className="text-sm">Easing</Label>
                <select className="w-full mt-1 px-3 py-2 border rounded-md">
                  <option value="ease">Ease</option>
                  <option value="linear">Linear</option>
                  <option value="ease-in">Ease In</option>
                  <option value="ease-out">Ease Out</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: FaEye },
    { id: 'templates', label: 'Templates', icon: FaCopy },
    { id: 'playground', label: 'Playground', icon: FaWindowMaximize }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaWindowMaximize className="text-blue-600" />
            Advanced Modal System
          </h1>
          <p className="text-gray-600 mt-1">
            Hệ thống modal nâng cao với nhiều cấu hình và templates
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search modals..."
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
            Create Modal
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
      {activeTab === 'templates' && renderTemplates()}
      {activeTab === 'playground' && renderPlayground()}

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`bg-white rounded-lg shadow-xl ${
            currentModalType === 'form' ? 'w-11/12 max-w-4xl' :
            currentModalType === 'confirm' ? 'w-96' : 'w-96'
          }`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold capitalize">
                  {currentModalType} Modal
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  <FaTimes />
                </Button>
              </div>
              
              <div className="mb-6">
                {currentModalType === 'info' && (
                  <div className="text-center">
                    <div className="text-4xl mb-2">ℹ️</div>
                    <p className="text-gray-600">This is an information modal with important details.</p>
                  </div>
                )}
                {currentModalType === 'warning' && (
                  <div className="text-center">
                    <div className="text-4xl mb-2">⚠️</div>
                    <p className="text-gray-600">This is a warning modal. Please proceed with caution.</p>
                  </div>
                )}
                {currentModalType === 'error' && (
                  <div className="text-center">
                    <div className="text-4xl mb-2">❌</div>
                    <p className="text-gray-600">An error has occurred. Please try again.</p>
                  </div>
                )}
                {currentModalType === 'success' && (
                  <div className="text-center">
                    <div className="text-4xl mb-2">✅</div>
                    <p className="text-gray-600">Operation completed successfully!</p>
                  </div>
                )}
                {currentModalType === 'confirm' && (
                  <div className="text-center">
                    <div className="text-4xl mb-2">❓</div>
                    <p className="text-gray-600">Are you sure you want to proceed?</p>
                  </div>
                )}
                {currentModalType === 'form' && (
                  <div className="space-y-4">
                    <div>
                      <Label>Name</Label>
                      <Input placeholder="Enter your name" className="mt-1" />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input type="email" placeholder="Enter your email" className="mt-1" />
                    </div>
                    <div>
                      <Label>Message</Label>
                      <Textarea placeholder="Enter your message" className="mt-1" />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-2">
                {(currentModalType === 'confirm' || currentModalType === 'form') && (
                  <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                )}
                <Button onClick={() => setIsModalOpen(false)}>
                  {currentModalType === 'confirm' ? 'Confirm' :
                   currentModalType === 'form' ? 'Submit' : 'OK'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
