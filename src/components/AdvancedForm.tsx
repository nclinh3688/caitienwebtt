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
  FaSync
} from 'react-icons/fa';

interface FormField {
  id: string;
  name: string;
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio';
  label: string;
  placeholder?: string;
  required: boolean;
  validation?: string;
  options?: string[];
  value: string | number | boolean;
}

interface FormData {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

interface FormSubmission {
  id: string;
  formId: string;
  data: Record<string, any>;
  submittedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
}

export default function AdvancedForm() {
  const [forms, setForms] = useState<FormData[]>([]);
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [activeTab, setActiveTab] = useState('forms');
  const [selectedForm, setSelectedForm] = useState<FormData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    console.log('🔄 AdvancedForm: useEffect triggered');
    initializeData();
  }, []);

  const initializeData = () => {
    console.log('🔄 AdvancedForm: Initializing data');
    
    // Mock forms data
    const mockForms: FormData[] = [
      {
        id: '1',
        title: 'Student Registration Form',
        description: 'Complete registration form for new students',
        fields: [
          {
            id: '1',
            name: 'fullName',
            type: 'text',
            label: 'Full Name',
            placeholder: 'Enter your full name',
            required: true,
            validation: 'min:2,max:50',
            value: ''
          },
          {
            id: '2',
            name: 'email',
            type: 'email',
            label: 'Email Address',
            placeholder: 'Enter your email',
            required: true,
            validation: 'email',
            value: ''
          },
          {
            id: '3',
            name: 'age',
            type: 'number',
            label: 'Age',
            placeholder: 'Enter your age',
            required: false,
            validation: 'min:16,max:100',
            value: ''
          },
          {
            id: '4',
            name: 'level',
            type: 'select',
            label: 'Japanese Level',
            placeholder: 'Select your level',
            required: true,
            options: ['Beginner', 'Intermediate', 'Advanced'],
            value: ''
          },
          {
            id: '5',
            name: 'goals',
            type: 'textarea',
            label: 'Learning Goals',
            placeholder: 'Describe your learning goals',
            required: false,
            value: ''
          }
        ],
        status: 'published',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        updatedAt: new Date()
      },
      {
        id: '2',
        title: 'Course Feedback Form',
        description: 'Provide feedback on your course experience',
        fields: [
          {
            id: '1',
            name: 'courseName',
            type: 'text',
            label: 'Course Name',
            placeholder: 'Enter course name',
            required: true,
            value: ''
          },
          {
            id: '2',
            name: 'rating',
            type: 'radio',
            label: 'Overall Rating',
            required: true,
            options: ['1 - Poor', '2 - Fair', '3 - Good', '4 - Very Good', '5 - Excellent'],
            value: ''
          },
          {
            id: '3',
            name: 'feedback',
            type: 'textarea',
            label: 'Detailed Feedback',
            placeholder: 'Share your thoughts about the course',
            required: false,
            value: ''
          }
        ],
        status: 'draft',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        updatedAt: new Date()
      }
    ];

    // Mock submissions data
    const mockSubmissions: FormSubmission[] = [
      {
        id: '1',
        formId: '1',
        data: {
          fullName: 'Nguyễn Văn A',
          email: 'nguyenvana@email.com',
          age: 25,
          level: 'Beginner',
          goals: 'Learn basic Japanese for travel'
        },
        submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        status: 'approved'
      },
      {
        id: '2',
        formId: '1',
        data: {
          fullName: 'Trần Thị B',
          email: 'tranthib@email.com',
          age: 30,
          level: 'Intermediate',
          goals: 'Improve business Japanese skills'
        },
        submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        status: 'pending'
      }
    ];

    setForms(mockForms);
    setSubmissions(mockSubmissions);
  };

  const renderForms = () => (
    <div className="space-y-6">
      {/* Forms Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Form Management</h3>
              <p className="text-gray-600">Create and manage dynamic forms</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">
                {forms.length}
              </div>
              <div className="text-sm text-blue-600">Total Forms</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Forms List */}
      <div className="space-y-4">
        {forms.map((form) => (
          <Card key={form.id} className={`border-2 ${
            form.status === 'published' ? 'border-green-200 bg-green-50' :
            form.status === 'draft' ? 'border-yellow-200 bg-yellow-50' :
            'border-gray-200 bg-gray-50'
          }`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{form.title}</h3>
                  <p className="text-gray-600 mb-3">{form.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Fields: {form.fields.length}</span>
                    <span>Created: {form.createdAt.toLocaleDateString('vi-VN')}</span>
                    <span>Updated: {form.updatedAt.toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={
                    form.status === 'published' ? 'bg-green-100 text-green-800' :
                    form.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }>
                    {form.status}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedForm(form);
                      setIsEditing(false);
                    }}
                  >
                    <FaEye />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedForm(form);
                      setIsEditing(true);
                    }}
                  >
                    <FaEdit />
                  </Button>
                </div>
              </div>

              {/* Form Fields Preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {form.fields.slice(0, 4).map((field) => (
                  <div key={field.id} className="p-3 bg-white rounded border">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm font-medium">{field.label}</Label>
                      {field.required && <span className="text-red-500 text-xs">*</span>}
                    </div>
                    <div className="text-xs text-gray-500">
                      Type: {field.type} {field.validation && `• ${field.validation}`}
                    </div>
                  </div>
                ))}
                {form.fields.length > 4 && (
                  <div className="p-3 bg-gray-100 rounded border text-center text-sm text-gray-500">
                    +{form.fields.length - 4} more fields
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create New Form Button */}
      <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
        <CardContent className="p-6 text-center">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <FaPlus className="mr-2" />
            Create New Form
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderSubmissions = () => (
    <div className="space-y-6">
      {/* Submissions Overview */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Form Submissions</h3>
              <p className="text-gray-600">Review and manage form responses</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">
                {submissions.length}
              </div>
              <div className="text-sm text-green-600">Total Submissions</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submissions List */}
      <div className="space-y-4">
        {submissions.map((submission) => {
          const form = forms.find(f => f.id === submission.formId);
          return (
            <Card key={submission.id} className={`border-2 ${
              submission.status === 'approved' ? 'border-green-200 bg-green-50' :
              submission.status === 'rejected' ? 'border-red-200 bg-red-50' :
              'border-yellow-200 bg-yellow-50'
            }`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {form?.title || 'Unknown Form'}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span>Submitted: {submission.submittedAt.toLocaleString('vi-VN')}</span>
                      <span>Form ID: {submission.formId}</span>
                    </div>
                    
                    {/* Submission Data Preview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {Object.entries(submission.data).slice(0, 4).map(([key, value]) => (
                        <div key={key} className="p-2 bg-white rounded border">
                          <div className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                          <div className="font-medium">{String(value)}</div>
                        </div>
                      ))}
                      {Object.keys(submission.data).length > 4 && (
                        <div className="p-2 bg-gray-100 rounded border text-center text-sm text-gray-500">
                          +{Object.keys(submission.data).length - 4} more fields
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge className={
                      submission.status === 'approved' ? 'bg-green-100 text-green-800' :
                      submission.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }>
                      {submission.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <FaEye />
                    </Button>
                    <Button variant="outline" size="sm">
                      <FaCheck />
                    </Button>
                    <Button variant="outline" size="sm">
                      <FaTimes />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderFormBuilder = () => (
    <div className="space-y-6">
      {/* Form Builder Overview */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Form Builder</h3>
              <p className="text-gray-600">Drag and drop form creation tool</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-purple-600">
                <FaEdit className="text-4xl" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Builder Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Field Library */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaBook className="text-blue-600" />
              Field Library
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { type: 'text', label: 'Text Input', icon: FaEdit },
                { type: 'email', label: 'Email Input', icon: FaEdit },
                { type: 'password', label: 'Password Input', icon: FaEyeSlash },
                { type: 'number', label: 'Number Input', icon: FaEdit },
                { type: 'textarea', label: 'Text Area', icon: FaEdit },
                { type: 'select', label: 'Dropdown Select', icon: FaEdit },
                { type: 'checkbox', label: 'Checkbox', icon: FaCheck },
                { type: 'radio', label: 'Radio Button', icon: FaCheck }
              ].map((fieldType) => {
                const Icon = fieldType.icon;
                return (
                  <div
                    key={fieldType.type}
                    className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="text-gray-500" />
                      <span className="text-sm font-medium">{fieldType.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Form Canvas */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaEdit className="text-green-600" />
              Form Canvas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="min-h-96 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              <div className="text-center">
                <FaEdit className="text-4xl text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Drag fields here to build your form</p>
                <p className="text-sm text-gray-400">Start with a form title</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Form Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaCog className="text-orange-600" />
            Form Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label>Form Title</Label>
                <Input placeholder="Enter form title" />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea placeholder="Enter form description" />
              </div>
              <div>
                <Label>Status</Label>
                <select className="w-full px-3 py-2 border rounded-md">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label>Success Message</Label>
                <Textarea placeholder="Message shown after successful submission" />
              </div>
              <div>
                <Label>Email Notifications</Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span className="text-sm">Send email on submission</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span className="text-sm">Send confirmation to user</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const tabs = [
    { id: 'forms', label: 'Forms', icon: FaEdit },
    { id: 'submissions', label: 'Submissions', icon: FaCheck },
    { id: 'builder', label: 'Form Builder', icon: FaPlus }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaEdit className="text-blue-600" />
            Advanced Form System
          </h1>
          <p className="text-gray-600 mt-1">
            Hệ thống form nâng cao với drag & drop builder
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search forms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <Button variant="outline">
            <FaUpload className="mr-2" />
            Import
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <FaRocket className="mr-2" />
            Create Form
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
      {activeTab === 'forms' && renderForms()}
      {activeTab === 'submissions' && renderSubmissions()}
      {activeTab === 'builder' && renderFormBuilder()}
    </div>
  );
}
