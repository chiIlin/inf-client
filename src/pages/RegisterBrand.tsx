import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Button,
  Input,
  Textarea,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Label,
  Separator
} from '@/components/ui/base-ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Globe, Users } from 'lucide-react';

const RegisterBrand = () => {
  const industries = [
    'Мода та одяг', 'Краса та косметика', 'Їжа та напої', 'Технології', 
    'Фітнес та здоров\'я', 'Подорожі', 'Освіта', 'Фінанси', 'Нерухомість', 
    'Автомобілі', 'Розваги', 'Інше'
  ];

  const companySizes = [
    'Стартап (1-10 співробітників)',
    'Мала компанія (11-50 співробітників)', 
    'Середня компанія (51-200 співробітників)',
    'Велика компанія (200+ співробітників)'
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-ua-blue to-ua-blue-soft rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">
              <span className="gradient-text">Реєстрація бренду</span>
            </h1>
            <p className="text-xl text-gray-600">
              Знайдіть ідеальних інфлюенсерів для вашого бренду
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-ua-blue-light">
            <CardHeader>
              <CardTitle>Інформація про компанію</CardTitle>
              <CardDescription>
                Розкажіть про ваш бренд та цілі співпраці
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company">Назва компанії *</Label>
                  <Input 
                    id="company"
                    placeholder="Назва вашого бренду"
                    className="border-ua-blue-light focus:border-ua-pink"
                  />
                </div>
                <div>
                  <Label htmlFor="contact-name">Контактна особа *</Label>
                  <Input 
                    id="contact-name"
                    placeholder="Ваше ім'я"
                    className="border-ua-blue-light focus:border-ua-pink"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email"
                    type="email"
                    placeholder="company@email.com"
                    className="border-ua-blue-light focus:border-ua-pink"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input 
                    id="phone"
                    placeholder="+380 (50) 123-45-67"
                    className="border-ua-blue-light focus:border-ua-pink"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="website">Веб-сайт</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="website"
                      placeholder="https://yourwebsite.com"
                      className="pl-10 border-ua-blue-light focus:border-ua-pink"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="industry">Галузь *</Label>
                  <Select>
                    <SelectTrigger className="border-ua-blue-light focus:border-ua-pink">
                      <SelectValue placeholder="Оберіть галузь" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-ua-blue-light scroll-smooth max-h-72 overflow-y-auto">
                      {industries.map(industry => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="company-size">Розмір компанії</Label>
                <Select>
                  <SelectTrigger className="border-ua-blue-light focus:border-ua-pink">
                    <SelectValue placeholder="Оберіть розмір компанії" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-ua-blue-light scroll-smooth max-h-72 overflow-y-auto">
                    {companySizes.map(size => (
                      <SelectItem key={size} value={size}>{size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Опис компанії *</Label>
                <Textarea 
                  id="description"
                  placeholder="Розкажіть про ваш бренд, продукти/послуги, цінності та місію..."
                  className="border-ua-blue-light focus:border-ua-pink min-h-[100px]"
                />
              </div>

              <div>
                <Label htmlFor="goals">Цілі співпраці з інфлюенсерами</Label>
                <Textarea 
                  id="goals"
                  placeholder="Які результати ви очікуєте від співпраці? Які типи контенту вас цікавлять?"
                  className="border-ua-blue-light focus:border-ua-pink min-h-[80px]"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="budget">Орієнтовний бюджет (місячний)</Label>
                  <Select>
                    <SelectTrigger className="border-ua-blue-light focus:border-ua-pink">
                      <SelectValue placeholder="Оберіть бюджет" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-ua-blue-light scroll-smooth max-h-72 overflow-y-auto">
                      <SelectItem value="under-10k">До 10,000 грн</SelectItem>
                      <SelectItem value="10k-25k">10,000 - 25,000 грн</SelectItem>
                      <SelectItem value="25k-50k">25,000 - 50,000 грн</SelectItem>
                      <SelectItem value="50k-100k">50,000 - 100,000 грн</SelectItem>
                      <SelectItem value="over-100k">Понад 100,000 грн</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="target-audience">Цільова аудиторія</Label>
                  <Input 
                    id="target-audience"
                    placeholder="18-35, жінки, Київ"
                    className="border-ua-blue-light focus:border-ua-pink"
                  />
                </div>
              </div>

              <div className="pt-6">
                <Button 
                  className="w-full bg-gradient-to-r from-ua-blue to-ua-blue-soft hover:from-ua-blue-soft hover:to-ua-blue text-white py-3 text-lg font-semibold"
                >
                  <Users className="h-5 w-5 mr-2" />
                  Створити акаунт бренду
                </Button>
                
                <p className="text-sm text-gray-500 text-center mt-4">
                  Вже маєте акаунт? {' '}
                  <Link to="/login" className="text-ua-blue hover:text-ua-blue-soft font-medium">
                    Увійдіть тут
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default RegisterBrand;
