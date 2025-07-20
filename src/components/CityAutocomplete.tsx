import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Search, Globe } from 'lucide-react';
import { searchCities, City } from '@/services/citiesService';

interface CityAutocompleteProps {
  value: string;
  onChange: (value: string, city?: City) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
}

const CityAutocomplete: React.FC<CityAutocompleteProps> = ({
  value,
  onChange,
  placeholder = "Ex: Costa Rica, Norvège, Nouvelle-Zélande...",
  label = "Destination souhaitée",
  required = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: cities = [], isLoading } = useQuery({
    queryKey: ['cities', query],
    queryFn: () => searchCities(query),
    enabled: query.length >= 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);
    onChange(newValue);
    setIsOpen(true);
  };

  const handleCitySelect = (city: City) => {
    const cityName = `${city.name}, ${city.country}`;
    setQuery(cityName);
    onChange(cityName, city);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  return (
    <div className="relative space-y-3">
      <Label className="text-mobile sm:text-base font-semibold flex items-center gap-2">
        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
        {label}
      </Label>
      
      <div className="relative">
        <Input
          ref={inputRef}
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="input-mobile pr-10"
          required={required}
        />
        
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
          ) : (
            <Search className="h-4 w-4 text-muted-foreground" />
          )}
        </div>

        {/* Dropdown des suggestions */}
        {isOpen && cities.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute z-50 w-full mt-1 bg-white border border-border rounded-xl shadow-lg max-h-60 overflow-y-auto scrollbar-thin"
          >
            {cities.map((city, index) => (
              <button
                key={city.id}
                type="button"
                onClick={() => handleCitySelect(city)}
                className="w-full text-left px-4 py-3 hover:bg-primary/5 transition-colors duration-200 border-b border-border/50 last:border-b-0 focus:outline-none focus:bg-primary/10"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <Globe className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground truncate">
                      {city.name}
                    </div>
                    <div className="text-sm text-muted-foreground truncate">
                      {city.country}
                      {city.population && (
                        <span className="ml-2 text-xs">
                          • {(city.population / 1000000).toFixed(1)}M hab.
                        </span>
                      )}
                    </div>
                  </div>
                  <MapPin className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                </div>
              </button>
            ))}
            
            {/* Suggestion d'exploration */}
            <div className="px-4 py-2 bg-primary/5 border-t border-border/50">
              <p className="text-xs text-muted-foreground text-center">
                💡 Explorez nos destinations éco-responsables recommandées
              </p>
            </div>
          </div>
        )}

        {/* Message si aucun résultat */}
        {isOpen && !isLoading && cities.length === 0 && query.length >= 2 && (
          <div
            ref={dropdownRef}
            className="absolute z-50 w-full mt-1 bg-white border border-border rounded-xl shadow-lg p-4 text-center"
          >
            <Globe className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Aucune destination trouvée pour "{query}"
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Essayez avec le nom d'une ville ou d'un pays
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CityAutocomplete;