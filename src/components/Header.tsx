import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/base-ui';
import { Menu, X, Users, Building2 } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-ua-pink-light sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-ua-pink to-ua-blue rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">UA Influencer Connect</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/catalog" className="text-gray-700 hover:text-ua-pink transition-colors">
              Каталог
            </Link>
            <Link to="/how-it-works" className="text-gray-700 hover:text-ua-pink transition-colors">
              Як це працює
            </Link>
            {/* <Link to="/pricing" className="text-gray-700 hover:text-ua-pink transition-colors">
              Тарифи
            </Link> */}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/login">
              <Button variant="ghost" className="text-ua-blue hover:text-ua-pink">
                Увійти
              </Button>
            </Link>
            <Link to="/register-influencer">
              <Button className="bg-gradient-to-r from-ua-pink to-ua-pink-soft hover:from-ua-pink-soft hover:to-ua-pink text-white">
                <Users className="h-4 w-4 mr-2" />
                Інфлюенсер
              </Button>
            </Link>
            <Link to="/register-brand">
              <Button className="bg-gradient-to-r from-ua-blue to-ua-blue-soft hover:from-ua-blue-soft hover:to-ua-blue text-white">
                <Building2 className="h-4 w-4 mr-2" />
                Бренд
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-ua-pink-light pt-4">
            <nav className="flex flex-col space-y-3">
              <Link to="/catalog" className="text-gray-700 hover:text-ua-pink transition-colors py-2">
                Каталог
              </Link>
              <Link to="/how-it-works" className="text-gray-700 hover:text-ua-pink transition-colors py-2">
                Як це працює
              </Link>
              {/* <Link to="/pricing" className="text-gray-700 hover:text-ua-pink transition-colors py-2">
                Тарифи
              </Link> */}
              <div className="flex flex-col space-y-2 pt-3 border-t border-ua-pink-light">
                <Link to="/login">
                  <Button variant="ghost" className="w-full text-ua-blue hover:text-ua-pink">
                    Увійти
                  </Button>
                </Link>
                <Link to="/register-influencer">
                  <Button className="w-full bg-gradient-to-r from-ua-pink to-ua-pink-soft hover:from-ua-pink-soft hover:to-ua-pink text-white">
                    <Users className="h-4 w-4 mr-2" />
                    Інфлюенсер
                  </Button>
                </Link>
                <Link to="/register-brand">
                  <Button className="w-full bg-gradient-to-r from-ua-blue to-ua-blue-soft hover:from-ua-blue-soft hover:to-ua-blue text-white">
                    <Building2 className="h-4 w-4 mr-2" />
                    Бренд
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
