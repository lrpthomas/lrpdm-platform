export const config = {
  company: {
    name: "LRP Data & Management, Inc.",
    shortName: "LRPDM", 
    tagline: "Everything in life is a puzzle - and the harder the puzzle, the more rewarding the solution",
    website: "https://lrpdm.com",
    phone: "(555) 123-4567",
    email: "crta@lrpdm.com",
    address: "Las Vegas, Nevada",
    founder: {
      name: "Cody Ryan Thomas",
      title: "Founder & Lead Developer",
      email: "crta@lrpdm.com"
    },
    contact: {
      email: "crta@lrpdm.com"
    }
  },
  
  auth: {
    ownerEmail: "crta@lrpdm.com",
    allowedUsers: ["crta@lrpdm.com"]
  },

  apps: {
    // Core business apps available to all users
    core: [
      {
        id: 'dashboard',
        name: 'Dashboard',
        description: 'Overview of all your tools and activities',
        href: '/dashboard',
        icon: 'LayoutDashboard',
        category: 'Core'
      },
      {
        id: 'files',
        name: 'File Manager',
        description: 'Upload, organize, and share files with your team',
        href: '/files',
        icon: 'Files', 
        category: 'Core'
      }
    ],

    // Business applications
    business: [
      {
        id: 'invoice',
        name: 'Invoice Generator',
        description: 'Create professional invoices with GSA per diem rates',
        href: '/apps/invoice',
        icon: 'FileText',
        category: 'Business',
        featured: true
      },
      {
        id: 'project-management', 
        name: 'Project Management',
        description: 'Kanban boards and task tracking for teams',
        href: '/apps/project-management',
        icon: 'CheckSquare',
        category: 'Business',
        featured: true
      },
      {
        id: 'crm',
        name: 'CRM System',
        description: 'Customer relationship management and sales tracking',
        href: '/apps/crm', 
        icon: 'Users',
        category: 'Business',
        featured: true
      },
      {
        id: 'ai-support',
        name: 'AI Support Center',
        description: 'AI-powered customer support and knowledge base',
        href: '/apps/ai-support',
        icon: 'MessageSquare',
        category: 'Business'
      },
      {
        id: 'file-share',
        name: 'File Share Pro',
        description: 'Secure file sharing and collaboration platform',
        href: '/apps/file-share',
        icon: 'Share2',
        category: 'Business'
      },
      {
        id: 'video-chat',
        name: 'Video Conference',
        description: 'High-quality video conferencing and screen sharing',
        href: '/apps/video-chat',
        icon: 'Video',
        category: 'Business'
      },
      {
        id: 'social-dashboard',
        name: 'Social Dashboard',
        description: 'Manage multiple social media accounts from one place',
        href: '/apps/social-dashboard',
        icon: 'Share',
        category: 'Marketing'
      },
      {
        id: 'analytics',
        name: 'Business Analytics',
        description: 'Advanced data visualization and business intelligence',
        href: '/apps/analytics',
        icon: 'BarChart3',
        category: 'Analytics'
      },
      {
        id: 'inventory',
        name: 'Inventory Manager',
        description: 'Track inventory, orders, and supply chain',
        href: '/apps/inventory',
        icon: 'Package',
        category: 'Business'
      },
      {
        id: 'scheduling',
        name: 'Smart Scheduler',
        description: 'Advanced scheduling and resource management',
        href: '/apps/scheduling',
        icon: 'Calendar',
        category: 'Business'
      },
      {
        id: 'ecommerce',
        name: 'E-Commerce Suite',
        description: 'Complete online store management platform',
        href: '/apps/ecommerce',
        icon: 'ShoppingCart',
        category: 'Business'
      },
      {
        id: 'accounting',
        name: 'Accounting Pro',
        description: 'Full-featured accounting and financial management',
        href: '/apps/accounting',
        icon: 'Calculator',
        category: 'Finance'
      }
    ],

    // Specialized applications (restricted)
    specialized: [
      {
        id: 'morbark-training',
        name: 'Morbark Training',
        description: 'Equipment training certification system',
        href: '/apps/morbark-training',
        icon: 'GraduationCap',
        category: 'Training',
        restricted: true,
        requiredPlan: 'BASIC'
      },
      {
        id: 'yosemite-map',
        name: 'Yosemite Interactive Map', 
        description: 'Building management with GPS tracking',
        href: '/apps/yosemite-map',
        icon: 'Map',
        category: 'Operations',
        restricted: true,
        requiredPlan: 'PRO'
      },
      {
        id: 'vegetation-management',
        name: 'Vegetation Management',
        description: 'Field reports with photo documentation',
        href: '/apps/vegetation-management', 
        icon: 'TreePine',
        category: 'Operations',
        restricted: true,
        requiredPlan: 'PRO'
      }
    ]
  },

  plans: {
    FREE: {
      name: 'Free',
      price: 0,
      features: ['Basic dashboard', 'File storage (1GB)', 'Email support']
    },
    BASIC: {
      name: 'Basic',
      price: 29,
      features: ['All Free features', 'Business apps', 'File storage (10GB)', 'Priority support']
    },
    PRO: {
      name: 'Professional',
      price: 99,
      features: ['All Basic features', 'Specialized apps', 'File storage (100GB)', 'Custom integrations']
    },
    OWNER_DEV: {
      name: 'Owner Developer',
      price: 0,
      features: ['Everything included', 'Unlimited storage', 'Development access', 'Admin controls']
    }
  }
}