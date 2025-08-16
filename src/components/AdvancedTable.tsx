'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  FaSort,
  FaSortUp,
  FaSortDown,
  FaColumns,
  FaTable
} from 'react-icons/fa';

interface TableData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: Date;
  actions: string[];
}

interface TableConfig {
  id: string;
  name: string;
  description: string;
  columns: string[];
  data: TableData[];
  pagination: boolean;
  search: boolean;
  sort: boolean;
  filter: boolean;
  status: 'active' | 'inactive' | 'archived';
}

export default function AdvancedTable() {
  const [tableConfigs, setTableConfigs] = useState<TableConfig[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTable, setSelectedTable] = useState<TableConfig | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    console.log('🔄 AdvancedTable: useEffect triggered');
    initializeData();
  }, []);

  const initializeData = () => {
    console.log('🔄 AdvancedTable: Initializing data');
    
    // Mock table data
    const mockTableData: TableData[] = [
      {
        id: '1',
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@email.com',
        role: 'Student',
        status: 'active',
        lastLogin: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        actions: ['view', 'edit', 'delete']
      },
      {
        id: '2',
        name: 'Trần Thị B',
        email: 'tranthib@email.com',
        role: 'Teacher',
        status: 'active',
        lastLogin: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        actions: ['view', 'edit', 'delete']
      },
      {
        id: '3',
        name: 'Lê Văn C',
        email: 'levanc@email.com',
        role: 'Student',
        status: 'inactive',
        lastLogin: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        actions: ['view', 'edit', 'delete']
      },
      {
        id: '4',
        name: 'Phạm Thị D',
        email: 'phamthid@email.com',
        role: 'Admin',
        status: 'active',
        lastLogin: new Date(),
        actions: ['view', 'edit', 'delete']
      },
      {
        id: '5',
        name: 'Hoàng Văn E',
        email: 'hoangvane@email.com',
        role: 'Student',
        status: 'pending',
        lastLogin: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        actions: ['view', 'edit', 'delete']
      }
    ];

    // Mock table configurations
    const mockTableConfigs: TableConfig[] = [
      {
        id: '1',
        name: 'User Management Table',
        description: 'Comprehensive user management with advanced features',
        columns: ['ID', 'Name', 'Email', 'Role', 'Status', 'Last Login', 'Actions'],
        data: mockTableData,
        pagination: true,
        search: true,
        sort: true,
        filter: true,
        status: 'active'
      },
      {
        id: '2',
        name: 'Course List Table',
        description: 'Course management table with filtering and sorting',
        columns: ['ID', 'Title', 'Level', 'Duration', 'Status', 'Actions'],
        data: [],
        pagination: true,
        search: true,
        sort: true,
        filter: true,
        status: 'active'
      },
      {
        id: '3',
        name: 'Simple Data Table',
        description: 'Basic table without advanced features',
        columns: ['ID', 'Name', 'Value'],
        data: [],
        pagination: false,
        search: false,
        sort: false,
        filter: false,
        status: 'inactive'
      }
    ];

    setTableConfigs(mockTableConfigs);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Table Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Advanced Table System</h3>
              <p className="text-gray-600">Feature-rich table components with sorting, filtering, and pagination</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">
                {tableConfigs.length}
              </div>
              <div className="text-sm text-blue-600">Table Configurations</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table Configurations */}
      <div className="space-y-4">
        {tableConfigs.map((config) => (
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
                    <span>Columns: {config.columns.length}</span>
                    <span>Rows: {config.data.length}</span>
                    <span>Features: {[
                      config.pagination && 'Pagination',
                      config.search && 'Search',
                      config.sort && 'Sort',
                      config.filter && 'Filter'
                    ].filter(Boolean).join(', ')}</span>
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
                      setSelectedTable(config);
                      setIsEditing(false);
                    }}
                  >
                    <FaEye />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedTable(config);
                      setIsEditing(true);
                    }}
                  >
                    <FaEdit />
                  </Button>
                </div>
              </div>

              {/* Table Preview */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      {config.columns.map((column, index) => (
                        <th key={index} className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {config.data.slice(0, 3).map((row) => (
                      <tr key={row.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2 text-sm">{row.id}</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm">{row.name}</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm">{row.email}</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm">{row.role}</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm">
                          <Badge className={
                            row.status === 'active' ? 'bg-green-100 text-green-800' :
                            row.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                            'bg-yellow-100 text-yellow-800'
                          }>
                            {row.status}
                          </Badge>
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-sm">
                          {row.lastLogin.toLocaleDateString('vi-VN')}
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-sm">
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline">View</Button>
                            <Button size="sm" variant="outline">Edit</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {config.data.length > 3 && (
                      <tr>
                        <td colSpan={config.columns.length} className="border border-gray-300 px-3 py-2 text-center text-sm text-gray-500">
                          +{config.data.length - 3} more rows...
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create New Table Button */}
      <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
        <CardContent className="p-6 text-center">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <FaPlus className="mr-2" />
            Create New Table Configuration
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderBuilder = () => (
    <div className="space-y-6">
      {/* Builder Overview */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Table Builder</h3>
              <p className="text-gray-600">Create and customize table configurations</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">
                <FaTable className="text-4xl" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaCog className="text-blue-600" />
              Basic Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Table Name</Label>
                <Input placeholder="Enter table name" className="mt-1" />
              </div>
              <div>
                <Label>Description</Label>
                <Input placeholder="Enter table description" className="mt-1" />
              </div>
              <div>
                <Label>Status</Label>
                <select className="w-full mt-1 px-3 py-2 border rounded-md">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaColumns className="text-green-600" />
              Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Pagination</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Search</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Sorting</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Filtering</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Export</span>
                <input type="checkbox" className="rounded" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Column Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaColumns className="text-purple-600" />
            Column Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input placeholder="Column name" className="flex-1" />
              <select className="px-3 py-2 border rounded-md">
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
                <option value="status">Status</option>
                <option value="actions">Actions</option>
              </select>
              <Button size="sm">
                <FaPlus className="mr-2" />
                Add Column
              </Button>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-3">Current Columns</h4>
              <div className="space-y-2">
                {['ID', 'Name', 'Email', 'Role', 'Status', 'Actions'].map((column, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">{column}</span>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline">
                        <FaEdit className="text-xs" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <FaTrash className="text-xs" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPlayground = () => (
    <div className="space-y-6">
      {/* Playground Overview */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Table Playground</h3>
              <p className="text-gray-600">Test table features and configurations</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-purple-600">
                <FaTable className="text-4xl" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaTable className="text-blue-600" />
            Interactive Table Demo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label className="text-sm">Search</Label>
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="w-32">
                <Label className="text-sm">Items per page</Label>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    {['ID', 'Name', 'Email', 'Role', 'Status', 'Last Login', 'Actions'].map((column, index) => (
                      <th key={index} className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">
                        <button
                          className="flex items-center gap-1 hover:bg-gray-100 px-1 py-1 rounded w-full"
                          onClick={() => {
                            if (sortField === column) {
                              setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                            } else {
                              setSortField(column);
                              setSortDirection('asc');
                            }
                          }}
                        >
                          {column}
                          {sortField === column && (
                            sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />
                          )}
                          {sortField !== column && <FaSort className="text-gray-400" />}
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableConfigs[0]?.data
                    .filter(row => 
                      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      row.role.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map((row) => (
                      <tr key={row.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2 text-sm">{row.id}</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm">{row.name}</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm">{row.email}</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm">{row.role}</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm">
                          <Badge className={
                            row.status === 'active' ? 'bg-green-100 text-green-800' :
                            row.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                            'bg-yellow-100 text-yellow-800'
                          }>
                            {row.status}
                          </Badge>
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-sm">
                          {row.lastLogin.toLocaleDateString('vi-VN')}
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-sm">
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline">
                              <FaEye className="text-xs" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <FaEdit className="text-xs" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <FaTrash className="text-xs" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, tableConfigs[0]?.data.length || 0)} of {tableConfigs[0]?.data.length || 0} results
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage * itemsPerPage >= (tableConfigs[0]?.data.length || 0)}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: FaEye },
    { id: 'builder', label: 'Table Builder', icon: FaEdit },
    { id: 'playground', label: 'Playground', icon: FaTable }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaTable className="text-blue-600" />
            Advanced Table System
          </h1>
          <p className="text-gray-600 mt-1">
            Hệ thống table nâng cao với sorting, filtering và pagination
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search tables..."
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
            Create Table
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
      {activeTab === 'builder' && renderBuilder()}
      {activeTab === 'playground' && renderPlayground()}
    </div>
  );
}
