import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input, Button, Badge } from '@/components/ui/base-ui';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, DollarSign, Calendar, Users, Building2, MessageCircle } from 'lucide-react';
import axios from 'axios';

interface Producer {
  companyName?: string;
  fullName?: string;
}

interface Category {
  id: string;
  name: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  budget: number;
  link: string;
  isOpen: boolean;
  createdAt: string;
  expiresAt?: string;
  producer?: Producer;
  category?: Category;
}

const ProjectBoard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Завантажуємо проєкти з API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log('Fetching projects from API...');
        const response = await axios.get('http://localhost:5112/api/campaigns/open');
        console.log('API Response:', response);
        console.log('Projects data:', response.data);
        setProjects(response.data);
      } catch (error) {
        console.error('Error loading projects:', error);
        console.error('Error details:', error.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (project.producer?.companyName || project.producer?.fullName || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
                           (project.category?.name.toLowerCase() === selectedCategory.toLowerCase());
    
    const matchesBudget = selectedBudget === 'all' || 
                         project.budget >= parseInt(selectedBudget);
    
    return matchesSearch && matchesCategory && matchesBudget;
  });

  const getCategoryLabel = (category: string) => {
    const categories: Record<string, string> = {
      beauty: 'Краса',
      fitness: 'Фітнес',
      tech: 'Технології',
      food: 'Їжа',
      lifestyle: 'Лайфстайл',
      travel: 'Подорожі',
      косметика: 'Краса',
      технології: 'Технології'
    };
    return categories[category.toLowerCase()] || category;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('uk-UA');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Завантаження проєктів...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Біржа проєктів</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Знайдіть ідеальні проєкти від брендів, які шукають інфлюенсерів для співпраці
          </p>
        </div>

        {/* Search and Filter Section */}
        <Card className="bg-white/80 backdrop-blur-sm border-ua-pink-light mb-6 md:mb-8">
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              <div className="sm:col-span-2 lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Пошук проєктів..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-ua-blue-light focus:border-ua-pink h-10 md:h-11"
                  />
                </div>
              </div>
              <div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="border-ua-blue-light focus:border-ua-pink h-10 md:h-11">
                    <SelectValue placeholder="Категорія" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Всі категорії</SelectItem>
                    <SelectItem value="краса">Краса</SelectItem>
                    <SelectItem value="фітнес">Фітнес</SelectItem>
                    <SelectItem value="технології">Технології</SelectItem>
                    <SelectItem value="їжа">Їжа</SelectItem>
                    <SelectItem value="lifestyle">Лайфстайл</SelectItem>
                    <SelectItem value="подорожі">Подорожі</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={selectedBudget} onValueChange={setSelectedBudget}>
                  <SelectTrigger className="border-ua-blue-light focus:border-ua-pink h-10 md:h-11">
                    <SelectValue placeholder="Бюджет" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Будь-який бюджет</SelectItem>
                    <SelectItem value="2000">2000+ грн</SelectItem>
                    <SelectItem value="5000">5000+ грн</SelectItem>
                    <SelectItem value="10000">10000+ грн</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="group hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-ua-pink-light hover:border-ua-pink flex flex-col h-[450px]">
              <CardHeader className="pb-4 flex-shrink-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-2">
                      <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-ua-pink transition-colors line-clamp-2 leading-tight">
                        {project.name}
                      </CardTitle>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Building2 className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">
                        {project.producer?.companyName || project.producer?.fullName || 'Невідомий бренд'}
                      </span>
                    </div>
                  </div>
                  {project.category && (
                    <Badge variant="outline" className="border-ua-pink text-ua-pink text-xs flex-shrink-0">
                      {getCategoryLabel(project.category.name)}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-6">
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">{project.description}</p>
                
                <div className="grid grid-cols-2 gap-3 py-4 border-t border-gray-100 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-ua-blue flex-shrink-0" />
                    <span className="font-medium truncate">{project.budget} грн</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-ua-blue flex-shrink-0" />
                    <span className="truncate">{project.link || 'Онлайн'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-ua-blue flex-shrink-0" />
                    <span className="truncate">
                      {project.expiresAt ? formatDate(project.expiresAt) : 'Без дедлайну'}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-gray-100 mt-auto">
                  <Button className="flex-1 bg-gradient-to-r from-ua-pink to-ua-pink-soft hover:from-ua-pink-soft hover:to-ua-pink text-white">
                    Відгукнутися
                  </Button>
                  <Link to="/messages">
                    <Button variant="outline" size="icon" className="border-ua-blue text-ua-blue hover:bg-ua-blue hover:text-white">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Проєкти не знайдено</h3>
            <p className="text-gray-600">Спробуйте змінити параметри пошуку або фільтри</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectBoard;
