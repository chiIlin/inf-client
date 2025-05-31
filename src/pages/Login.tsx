import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button, Input, Label, Separator } from '@/components/ui/base-ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn, Users, Building2 } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-md">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-ua-pink to-ua-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
              <LogIn className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">
              <span className="gradient-text">Вхід</span>
            </h1>
            <p className="text-xl text-gray-600">
              Увійдіть до свого акаунту
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-ua-pink-light">
            <CardHeader>
              <CardTitle>З поверненням!</CardTitle>
              <CardDescription>
                Введіть свої дані для входу в акаунт
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="border-ua-blue-light focus:border-ua-pink"
                />
              </div>

              <div>
                <Label htmlFor="password">Пароль</Label>
                <Input 
                  id="password"
                  type="password"
                  placeholder="Введіть пароль"
                  className="border-ua-blue-light focus:border-ua-pink"
                />
              </div>

              <div className="text-right">
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-ua-blue hover:text-ua-blue-soft"
                >
                  Забули пароль?
                </Link>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-ua-pink to-ua-blue hover:from-ua-pink-soft hover:to-ua-blue-soft text-white py-3 text-lg font-semibold"
              >
                Увійти
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">або</span>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-center text-gray-600 mb-4">Ще немає акаунту?</p>
                
                <Link to="/register-influencer">
                  <Button 
                    variant="outline" 
                    className="w-full border-ua-pink text-ua-pink hover:bg-ua-pink hover:text-white"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Реєстрація як інфлюенсер
                  </Button>
                </Link>
                
                <Link to="/register-brand">
                  <Button 
                    variant="outline" 
                    className="w-full border-ua-blue text-ua-blue hover:bg-ua-blue hover:text-white"
                  >
                    <Building2 className="h-4 w-4 mr-2" />
                    Реєстрація як бренд
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Login;
