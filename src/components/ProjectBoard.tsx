import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input, Button, Badge } from '@/components/ui/base-ui';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, DollarSign, Calendar, Users, Building2, MessageCircle } from 'lucide-react';

const ProjectBoard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');

  // Mock data для проєктів
  const projects = [
    {
      id: 1,
      title: 'Промо новної лінії косметики',
      brand: 'BeautyBrand UA',
      category: 'beauty',
      budget: '5000-10000',
      location: 'Київ',
      deadline: '2024-07-15',
      followers: '10k+',
      description: 'Шукаємо beauty-блогерів для промо нової лінії органічної косметики. Потрібен контент у Instagram та TikTok.',
      requirements: ['10k+ підписників', 'Beauty-тематика', 'Київ або область'],
      isUrgent: false
    },
    {
      id: 2,
      title: 'Реклама спортивного одягу',
      brand: 'SportWear Pro',
      category: 'fitness',
      budget: '3000-7000',
      location: 'Онлайн',
      deadline: '2024-07-10',
      followers: '5k+',
      description: 'Потрібні фітнес-інфлюенсери для демонстрації нової колекції спортивного одягу.',
      requirements: ['5k+ підписників', 'Фітнес-контент', 'Активний профіль'],
      isUrgent: true
    },
    {
      id: 3,
      title: 'Огляд IT-продукту',
      brand: 'TechStart',
      category: 'tech',
      budget: '8000-15000',
      location: 'Львів',
      deadline: '2024-07-20',
      followers: '20k+',
      description: 'Шукаємо tech-блогерів для детального огляду нашого нового мобільного додатку.',
      requirements: ['20k+ підписників', 'Tech-тематика', 'Досвід з IT-оглядами'],
      isUrgent: false
    },
    {
      id: 4,
      title: 'Промо ресторану',
      brand: 'Delicious Food',
      category: 'food',
      budget: '2000-5000',
      location: 'Одеса',
      deadline: '2024-07-12',
      followers: '3k+',
      description: 'Потрібні фуд-блогери для відвідування та промо нашого нового ресторану.',
      requirements: ['3k+ підписників', 'Food-контент', 'Одеса'],
      isUrgent: true
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesBudget = selectedBudget === 'all' || project.budget.includes(selectedBudget);
    
    return matchesSearch && matchesCategory && matchesBudget;
  });

  const getCategoryLabel = (category: string) => {
    const categories: Record<string, string> = {
      beauty: 'Краса',
      fitness: 'Фітнес',
      tech: 'Технології',
      food: 'Їжа',
      lifestyle: 'Лайфстайл',
      travel: 'Подорожі'
    };
    return categories[category] || category;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <Header />
      
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
        <Card className="bg-white/80 backdrop-blur-sm border-ua-pink-light mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Пошук проєктів..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-ua-blue-light focus:border-ua-pink"
                  />
                </div>
              </div>
              <div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="border-ua-blue-light focus:border-ua-pink">
                    <SelectValue placeholder="Категорія" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Всі категорії</SelectItem>
                    <SelectItem value="beauty">Краса</SelectItem>
                    <SelectItem value="fitness">Фітнес</SelectItem>
                    <SelectItem value="tech">Технології</SelectItem>
                    <SelectItem value="food">Їжа</SelectItem>
                    <SelectItem value="lifestyle">Лайфстайл</SelectItem>
                    <SelectItem value="travel">Подорожі</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={selectedBudget} onValueChange={setSelectedBudget}>
                  <SelectTrigger className="border-ua-blue-light focus:border-ua-pink">
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
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="group hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-ua-pink-light hover:border-ua-pink">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-ua-pink transition-colors">
                        {project.title}
                      </CardTitle>
                      {project.isUrgent && (
                        <Badge className="bg-red-100 text-red-700 border-red-200">
                          Терміново
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Building2 className="h-4 w-4" />
                      <span>{project.brand}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-ua-pink text-ua-pink">
                    {getCategoryLabel(project.category)}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-600 line-clamp-2">{project.description}</p>
                
                <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-ua-blue" />
                    <span className="font-medium">{project.budget} грн</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-ua-blue" />
                    <span>{project.followers}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-ua-blue" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-ua-blue" />
                    <span>{new Date(project.deadline).toLocaleDateString('uk-UA')}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-gray-900">Вимоги:</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.requirements.map((req, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-gray-100">
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

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Проєкти не знайдено</h3>
            <p className="text-gray-600">Спробуйте змінити параметри пошуку або фільтри</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProjectBoard;
