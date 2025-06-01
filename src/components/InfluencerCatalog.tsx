import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Button,
  Badge,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/base-ui';
import { Search, Instagram, MessageCircle, MapPin, Users, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = ['Всі', 'Мода', 'Стиль життя', 'Подорожі', 'Фотографія', 'Фітнес', 'Здоров\'я', 'Технології', 'Гаджети', 'Краса', 'Макіяж', 'Їжа', 'Ресторани'];
const cities = ['Всі міста', 'Київ', 'Львів', 'Одеса', 'Харків', 'Дніпро'];

const InfluencerCatalog = () => {
  const [influencers, setInfluencers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Всі');
  const [selectedCity, setSelectedCity] = useState('Всі міста');
  const [minFollowers, setMinFollowers] = useState('');

  useEffect(() => {
    const fetchInfluencers = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:5112/api/profile/influencers');
        console.log('Дані з беку:', res.data); // Додаємо логування
        const mapped = res.data.map((inf: any) => ({
          id: inf.id,
          name: inf.fullName,
          bio: inf.biography,
          city: inf.city,
          categories: (inf.contentCategories || '').split(',').map((c: string) => c.trim()).filter(Boolean),
          instagram: inf.instagramHandle,
          followers: inf.instagramFollowers || 0,
          engagement: '',
          avatar: inf.photoUrl || '/default-avatar.png'
        }));
        setInfluencers(mapped);
      } catch (err) {
        setInfluencers([]);
        console.error('Помилка при отриманні інфлюенсерів:', err); // Додаємо логування помилки
      } finally {
        setLoading(false);
      }
    };
    fetchInfluencers();
  }, []);

  const filteredInfluencers = influencers.filter(influencer => {
    const matchesSearch =
      influencer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      influencer.bio?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'Всі' || influencer.categories.includes(selectedCategory);
    const matchesCity =
      selectedCity === 'Всі міста' || influencer.city === selectedCity;
    const matchesFollowers =
      !minFollowers || influencer.followers >= parseInt(minFollowers);

    return matchesSearch && matchesCategory && matchesCity && matchesFollowers;
  });

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Каталог інфлюенсерів</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Знайдіть ідеального інфлюенсера для вашого бренду серед перевірених українських креаторів
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-ua-pink-light">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Пошук за ім'ям або біо..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-ua-blue-light focus:border-ua-pink"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="border-ua-blue-light focus:border-ua-pink">
                <SelectValue placeholder="Категорія" />
              </SelectTrigger>
              <SelectContent className="bg-white border-ua-blue-light scroll-smooth max-h-72 overflow-y-auto">
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="border-ua-blue-light focus:border-ua-pink">
                <SelectValue placeholder="Місто" />
              </SelectTrigger>
              <SelectContent className="bg-white border-ua-blue-light scroll-smooth max-h-72 overflow-y-auto">
                {cities.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Input
              type="number"
              placeholder="Мін. підписники"
              value={minFollowers}
              onChange={(e) => setMinFollowers(e.target.value)}
              className="border-ua-blue-light focus:border-ua-pink"
            />
          </div>
        </div>

        {/* Results */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInfluencers.map(influencer => (
            <Card key={influencer.id} className="bg-white/80 backdrop-blur-sm border-ua-pink-light transition-all duration-300 hover:shadow-lg hover:-translate-y-1 will-change-transform flex flex-col h-full">
              <CardHeader className="text-center pb-4">
                <div className="relative mx-auto mb-4">
                  <img
                    src={influencer.avatar}
                    alt={influencer.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-ua-pink-light"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <CardTitle className="text-xl font-bold text-gray-800 min-h-[3rem] flex items-center justify-center">
                  <span className="line-clamp-2 text-center">{influencer.name}</span>
                </CardTitle>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span>{influencer.city}</span>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                <div className="mb-4 flex-1">
                  <p className="text-gray-600 text-sm line-clamp-3 min-h-[4.5rem]">
                    {influencer.bio || "Опис профілю відсутній"}
                  </p>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1 min-h-[2rem]">
                    {influencer.categories.slice(0, 3).map((category: string, idx: number) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="text-xs bg-ua-pink-light text-ua-pink"
                      >
                        {category}
                      </Badge>
                    ))}
                    {influencer.categories.length > 3 && (
                      <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                        +{influencer.categories.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Instagram className="h-4 w-4 text-pink-500" />
                      <span className="text-sm font-medium">
                        {influencer.followers.toLocaleString()}
                      </span>
                    </div>
                    {influencer.engagement && (
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4 text-gray-400" />
                        <span className="text-xs text-gray-500">{influencer.engagement}</span>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={() => {
                      const token = localStorage.getItem('token');
                      if (token) {
                        window.location.href = `/messages/${influencer.id}`;
                      } else {
                        window.location.href = '/login';
                      }
                    }}
                    className="w-full bg-gradient-to-r from-ua-pink to-ua-blue hover:from-ua-pink-soft hover:to-ua-blue-soft text-white"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Зв'язатися
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredInfluencers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">Інфлюенсерів за вашими критеріями не знайдено</p>
            <p className="text-gray-400 mt-2">Спробуйте змінити фільтри пошуку</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default InfluencerCatalog;
