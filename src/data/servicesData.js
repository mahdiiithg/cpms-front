// Centralized data for Services page and related UIs
import { Building, Settings, TrendingUp, Star, Users, Shield, Target, Eye, Zap, CheckCircle, Clock } from 'lucide-react';

export const serviceCategories = [
  {
    id: 'property-management',
    title: 'Property Management',
    icon: <Building className="h-8 w-8" />,
    shortDescription: 'Complete turnkey property management solutions for residential and commercial properties',
    description:
      'Coast Planet manages one of the largest portfolios of residential and commercial properties in Los Angeles, with over 8,500 units under management. We offer a turnkey service covering marketing, tenant screening, leasing, rent collection, maintenance and reporting—ensuring you get the best market rate.',
    features: [
      'Professional tenant screening & placement with 96% success rate',
      'Automated rent collection & comprehensive financial reporting',
      'Proactive property maintenance & 24/7 emergency response',
      'Legal compliance support & documentation management',
      'Regular property inspections & detailed evaluations',
      'Advanced property management software & landlord portal',
    ],
    benefits: [
      { title: '96% Occupancy Rate', description: 'Industry-leading occupancy via strategic marketing and quality placement', icon: <Target className="h-6 w-6 text-blue-600" /> },
      { title: 'Expert Management Team', description: 'Dedicated managers with years of local market expertise', icon: <Users className="h-6 w-6 text-blue-600" /> },
      { title: 'Technology-Driven', description: 'Real-time visibility through our landlord portal and automation', icon: <Zap className="h-6 w-6 text-blue-600" /> },
      { title: 'Comprehensive Service', description: 'We handle end-to-end management to reduce your admin burden', icon: <Shield className="h-6 w-6 text-blue-600" /> },
    ],
    packages: [
      { name: 'Silver Package', price: '5% of rental income', features: ['Property listing & marketing','Tenant screening & leasing','Tenancy contract creation','Move-in/out inspections','Rental payment collection','Basic reporting'] },
      { name: 'Gold Package', price: '7% of rental income', popular: true, features: ['All Silver Package features','Maintenance coordination','Utility bill management','Service charge payments','Enhanced reporting','Priority support'] },
      { name: 'Platinum Package', price: '10% of rental income', features: ['All Gold Package features','Annual maintenance package','Unlimited emergency callouts','Premium response times','Quarterly inspections','Dedicated property manager'] },
    ],
  },
  {
    id: 'development-consultancy',
    title: 'Development Sales & Consultancy',
    icon: <TrendingUp className="h-8 w-8" />,
    shortDescription: 'Expert guidance for property development projects from concept to completion',
    description:
      'We combine in-house capability and external specialists to define, design and deliver projects to market. With deep local knowledge, we support you at each step of the development lifecycle.',
    features: [
      'Market research & feasibility studies',
      'Product strategy, pricing & release planning',
      'Regulatory coordination & documentation',
      '360° brand, creative & performance media',
      'Broker network activation & sales ops',
      'Governance, reporting & programme control',
    ],
    benefits: [
      { title: 'Local Market Expertise', description: 'Insight into demand, positioning and absorption drivers', icon: <Eye className="h-6 w-6 text-blue-600" /> },
      { title: 'End-to-End Solutions', description: 'From feasibility to handover, one integrated team', icon: <Target className="h-6 w-6 text-blue-600" /> },
      { title: 'Strategic Partnerships', description: 'Access to leading designers, agencies and channel partners', icon: <Users className="h-6 w-6 text-blue-600" /> },
      { title: 'Proven Track Record', description: 'Consistent pre-sales performance and efficient CAC', icon: <Star className="h-6 w-6 text-blue-600" /> },
    ],
    packages: [
      { name: 'Promote Package', price: 'Custom Quote', features: ['Sales & marketing strategy','360° marketing and PR','Sales journey creation','Sales experience center','Launch events coordination','External broker onboarding'] },
      { name: 'Consult Package', price: 'Custom Quote', popular: true, features: ['All Promote features','SPA terms & documentation','Branding & design guidance','Product mix & pricing','Amenity planning','Brand partnership structuring'] },
      { name: 'Complete Package', price: 'Custom Quote', features: ['All Consult features','Market research & analysis','Investor introductions','Feasibility studies','Regulatory compliance','Management & operations'] },
    ],
  },
  {
    id: 'building-management',
    title: 'Building Management',
    icon: <Settings className="h-8 w-8" />,
    shortDescription: 'Professional building management for commercial and residential complexes',
    description:
      'We optimize operations and tenant experience while protecting asset value. Our team coordinates maintenance, security, utilities and vendors with transparent reporting.',
    features: [
      'Facility operations & preventive maintenance',
      'Common area services & landscaping',
      'Security & access control management',
      'Energy & utilities optimization',
      'Vendor management & service contracts',
      'Emergency planning & response',
    ],
    benefits: [
      { title: 'Operational Efficiency', description: 'Lean processes to reduce costs and downtime', icon: <Settings className="h-6 w-6 text-blue-600" /> },
      { title: 'Safety & Compliance', description: 'Regular inspections, records and standards adherence', icon: <Shield className="h-6 w-6 text-blue-600" /> },
      { title: 'Tenant Satisfaction', description: 'Service quality that supports retention and reputation', icon: <Star className="h-6 w-6 text-blue-600" /> },
      { title: 'Asset Protection', description: 'Planned works to sustain value and NPV', icon: <Building className="h-6 w-6 text-blue-600" /> },
    ],
    packages: [
      { name: 'Basic Management', price: '3-5% of gross income', features: ['Daily facility operations','Basic maintenance coordination','Vendor management','Financial reporting','Tenant communications','Monthly inspections'] },
      { name: 'Comprehensive Management', price: '5-8% of gross income', popular: true, features: ['All Basic features','Security system management','Energy optimization','Preventive maintenance','Emergency response 24/7','Quarterly planning reviews'] },
      { name: 'Premium Management', price: '8-12% of gross income', features: ['All Comprehensive features','Dedicated building manager','Advanced analytics','Capital improvement planning','Sustainability initiatives','Premium tenant services'] },
    ],
  },
  {
    id: 'additional-services',
    title: 'Additional Services',
    icon: <Star className="h-8 w-8" />,
    shortDescription: 'Specialized property services to meet all your real estate needs',
    description:
      'From valuations to interior design and smart home integration, we provide targeted services that round out your property needs.',
    features: [
      'Property valuation & appraisal',
      'Investment analysis & ROI reports',
      'Legal compliance & documentation support',
      'Insurance coordination & risk management',
      'Property staging & interior consultation',
      'Smart home technology integration',
    ],
    benefits: [
      { title: 'One-Stop Solutions', description: 'All services coordinated through a single team', icon: <CheckCircle className="h-6 w-6 text-blue-600" /> },
      { title: 'Expert Network', description: 'Specialists across legal, valuation and design', icon: <Users className="h-6 w-6 text-blue-600" /> },
      { title: 'Value Optimization', description: 'Actions focused on maximizing returns', icon: <TrendingUp className="h-6 w-6 text-blue-600" /> },
      { title: 'Custom Solutions', description: 'Tailored scope to suit your situation', icon: <Settings className="h-6 w-6 text-blue-600" /> },
    ],
    packages: [
      { name: 'Valuation Services', price: '$500-2,000', features: ['Property appraisal','Market analysis report','Investment ROI calculation','Comparative market analysis','Digital property report','48-hour turnaround'] },
      { name: 'Legal & Compliance', price: 'Custom Quote', features: ['Document preparation','Legal compliance audit','Contract review services','Regulatory guidance','Dispute resolution support','Ongoing legal consultation'] },
      { name: 'Property Enhancement', price: 'Custom Quote', popular: true, features: ['Interior design consultation','Property staging','Smart home integration','Energy efficiency upgrades','Photography & marketing','ROI improvement strategies'] },
    ],
  },
];

export const clientTestimonials = [
  { name: 'Sarah Johnson', role: 'Property Owner', property: 'Beverly Hills Luxury Apartments', rating: 5, comment: 'Managed my properties for 3+ years. 100% occupancy and +25% income.', image: '/api/placeholder/80/80' },
  { name: 'Michael Chen', role: 'Real Estate Developer', property: 'Downtown LA Mixed-Use', rating: 5, comment: '90% pre-sales before completion thanks to clear strategy.', image: '/api/placeholder/80/80' },
  { name: 'Lisa Rodriguez', role: 'Commercial Owner', property: 'Santa Monica Office', rating: 5, comment: 'Costs down 15% and satisfaction up significantly.', image: '/api/placeholder/80/80' },
  { name: 'David Park', role: 'Portfolio Manager', property: '50-Unit Portfolio', rating: 5, comment: 'Real-time insights and maximized ROI.', image: '/api/placeholder/80/80' },
  { name: 'Jennifer Martinez', role: 'Luxury Owner', property: 'Malibu Villa', rating: 5, comment: 'Premium tenants quickly; prompt maintenance.', image: '/api/placeholder/80/80' },
  { name: 'Robert Kim', role: 'Developer', property: 'Pasadena Retail', rating: 5, comment: 'Comprehensive strategy exceeded projections.', image: '/api/placeholder/80/80' },
];

export const processSteps = [
  { step: '01', title: 'Initial Consultation', description: 'Understand your needs and objectives.' },
  { step: '02', title: 'Property Assessment', description: 'Identify opportunities and constraints.' },
  { step: '03', title: 'Custom Strategy', description: 'Plan to maximize potential and outcomes.' },
  { step: '04', title: 'Implementation', description: 'Execute with clear milestones and updates.' },
  { step: '05', title: 'Ongoing Management', description: 'Monitor, optimize, and report continuously.' },
];

export const whyChooseUs = [
  { icon: <Star className="h-12 w-12 text-blue-600" />, title: 'Industry Expertise', description: '6+ years track record with proven outcomes.' },
  { icon: <Shield className="h-12 w-12 text-blue-600" />, title: 'Trusted & Reliable', description: 'Licensed, insured, and transparent processes.' },
  { icon: <Clock className="h-12 w-12 text-blue-600" />, title: '24/7 Support', description: 'Always-on availability and emergency response.' },
  { icon: <TrendingUp className="h-12 w-12 text-blue-600" />, title: 'Technology-Driven', description: 'Modern tools for efficiency and visibility.' },
];
