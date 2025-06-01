import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button, Input, Badge } from '@/components/ui/base-ui';
import { Users, Building2, Briefcase, FileText, Search, Ban, Trash2, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

interface AdminStats {
  totalUsers: number;
  influencersCount: number;
  brandsCount: number;
  campaignsCount: number;
  applicationsCount: number;
  topCities: { city: string; count: number }[];
}

interface AdminUser {
  id: string;
  fullName?: string;
  companyName?: string;
  email: string;
  roles: string[];
  city?: string;
  isBlocked: boolean;
  photoUrl?: string;
  instagramFollowers?: number;
  industry?: string;
}

const AdminDashboard = () => {
  const { toast } = useToast();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  // Завантаження статистики
  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5112/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast({
        title: "Помилка",
        description: "Не вдалося завантажити статистику",
        variant: "destructive"
      });
    }
  };

  // Завантаження користувачів
  const fetchUsers = async (page = 1, search = '', role = '') => {
    try {
      setUsersLoading(true);
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(search && { search }),
        ...(role && { role })
      });

      const response = await axios.get(`http://localhost:5112/api/admin/users?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Помилка",
        description: "Не вдалося завантажити користувачів",
        variant: "destructive"
      });
    } finally {
      setUsersLoading(false);
    }
  };

  // Блокування/розблокування користувача
  const toggleUserBlock = async (userId: string, currentBlocked: boolean) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5112/api/admin/users/${userId}/block`, 
        { isBlocked: !currentBlocked },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast({
        title: "Успіх",
        description: currentBlocked ? "Користувача розблоковано" : "Користувача заблоковано"
      });

      // Оновлюємо список
      fetchUsers(currentPage, searchTerm, roleFilter);
    } catch (error) {
      console.error('Error toggling user block:', error);
      toast({
        title: "Помилка",
        description: "Не вдалося змінити статус користувача",
        variant: "destructive"
      });
    }
  };

  // Видалення користувача
  const deleteUser = async (userId: string) => {
    if (!confirm('Ви впевнені, що хочете видалити цього користувача?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5112/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast({
        title: "Успіх",
        description: "Користувача видалено"
      });

      // Оновлюємо список та статистику
      fetchUsers(currentPage, searchTerm, roleFilter);
      fetchStats();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: "Помилка",
        description: "Не вдалося видалити користувача",
        variant: "destructive"
      });
    }
  };

  // Пошук
  const handleSearch = () => {
    setCurrentPage(1);
    fetchUsers(1, searchTerm, roleFilter);
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchStats(), fetchUsers()]);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <p>Завантаження адмінки...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Адміністративна панель</span>
          </h1>
          <p className="text-xl text-gray-600">
            Керування платформою UA Influencer Connect
          </p>
        </div>

        {/* Статистика */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Загалом користувачів</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Інфлюенсерів</CardTitle>
                <Users className="h-4 w-4 text-ua-pink" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-ua-pink">{stats.influencersCount}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Брендів</CardTitle>
                <Building2 className="h-4 w-4 text-ua-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-ua-blue">{stats.brandsCount}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Кампаній</CardTitle>
                <Briefcase className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.campaignsCount}</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Топ міст */}
        {stats && stats.topCities.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Топ міст</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {stats.topCities.map((city, index) => (
                  <div key={city.city} className="flex justify-between items-center">
                    <span>{index + 1}. {city.city}</span>
                    <Badge variant="secondary">{city.count} користувачів</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Управління користувачами */}
        <Card>
          <CardHeader>
            <CardTitle>Управління користувачами</CardTitle>
            <CardDescription>
              Перегляд, пошук та модерація користувачів платформи
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Фільтри та пошук */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Пошук по імені, email або компанії..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Всі ролі</option>
                <option value="Person">Інфлюенсери</option>
                <option value="Company">Бренди</option>
              </select>
              <Button onClick={handleSearch}>
                <Search className="h-4 w-4 mr-2" />
                Пошук
              </Button>
            </div>

            {/* Список користувачів */}
            {usersLoading ? (
              <p className="text-center py-8">Завантаження користувачів...</p>
            ) : (
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="border rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
                        {user.photoUrl ? (
                          <img src={`http://localhost:5112${user.photoUrl}`} alt="" className="w-full h-full rounded-full object-cover" />
                        ) : (
                          <span className="text-white font-semibold">
                            {(user.fullName || user.companyName || user.email)[0].toUpperCase()}
                          </span>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="font-semibold">
                          {user.fullName || user.companyName || 'Без імені'}
                          {user.isBlocked && <Badge variant="destructive" className="ml-2">Заблокований</Badge>}
                        </h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <div className="flex gap-2 mt-1">
                          {user.roles.map(role => (
                            <Badge key={role} variant={role === 'Person' ? 'default' : 'secondary'}>
                              {role === 'Person' ? 'Інфлюенсер' : 'Бренд'}
                            </Badge>
                          ))}
                          {user.city && <Badge variant="outline">{user.city}</Badge>}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={user.isBlocked ? "default" : "destructive"}
                        onClick={() => toggleUserBlock(user.id, user.isBlocked)}
                      >
                        <Ban className="h-4 w-4 mr-1" />
                        {user.isBlocked ? 'Розблокувати' : 'Заблокувати'}
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteUser(user.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Пагінація */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => fetchUsers(currentPage - 1, searchTerm, roleFilter)}
                >
                  Попередня
                </Button>
                
                <span className="px-4 py-2">
                  Сторінка {currentPage} з {totalPages}
                </span>
                
                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => fetchUsers(currentPage + 1, searchTerm, roleFilter)}
                >
                  Наступна
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AdminDashboard;