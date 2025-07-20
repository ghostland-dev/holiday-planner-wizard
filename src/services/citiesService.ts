// Service pour l'auto-complétion des villes
// Utilise l'API REST Countries et OpenStreetMap pour les suggestions

export interface City {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  population?: number;
}

// Base de données simplifiée des villes populaires pour l'éco-tourisme
const POPULAR_ECO_CITIES: City[] = [
  { id: '1', name: 'Costa Rica', country: 'Costa Rica', latitude: 9.7489, longitude: -83.7534 },
  { id: '2', name: 'Reykjavik', country: 'Islande', latitude: 64.1466, longitude: -21.9426 },
  { id: '3', name: 'Vancouver', country: 'Canada', latitude: 49.2827, longitude: -123.1207 },
  { id: '4', name: 'Wellington', country: 'Nouvelle-Zélande', latitude: -41.2924, longitude: 174.7787 },
  { id: '5', name: 'Stockholm', country: 'Suède', latitude: 59.3293, longitude: 18.0686 },
  { id: '6', name: 'Copenhagen', country: 'Danemark', latitude: 55.6761, longitude: 12.5683 },
  { id: '7', name: 'Amsterdam', country: 'Pays-Bas', latitude: 52.3702, longitude: 4.8952 },
  { id: '8', name: 'Oslo', country: 'Norvège', latitude: 59.9139, longitude: 10.7522 },
  { id: '9', name: 'Zurich', country: 'Suisse', latitude: 47.3769, longitude: 8.5417 },
  { id: '10', name: 'Helsinki', country: 'Finlande', latitude: 60.1699, longitude: 24.9384 },
  { id: '11', name: 'Ljubljana', country: 'Slovénie', latitude: 46.0569, longitude: 14.5058 },
  { id: '12', name: 'Porto', country: 'Portugal', latitude: 41.1579, longitude: -8.6291 },
  { id: '13', name: 'Freiburg', country: 'Allemagne', latitude: 47.9990, longitude: 7.8421 },
  { id: '14', name: 'Kyoto', country: 'Japon', latitude: 35.0116, longitude: 135.7681 },
  { id: '15', name: 'Melbourne', country: 'Australie', latitude: -37.8136, longitude: 144.9631 }
];

export const searchCities = async (query: string): Promise<City[]> => {
  // Si la requête est vide, retourner les suggestions populaires
  if (!query || query.length < 2) {
    return POPULAR_ECO_CITIES.slice(0, 8);
  }

  // Filtrer d'abord dans nos suggestions populaires
  const filteredPopular = POPULAR_ECO_CITIES.filter(city =>
    city.name.toLowerCase().includes(query.toLowerCase()) ||
    city.country.toLowerCase().includes(query.toLowerCase())
  );

  // Si on a des résultats dans les populaires, les retourner
  if (filteredPopular.length > 0) {
    return filteredPopular.slice(0, 8);
  }

  // Sinon, utiliser l'API Nominatim d'OpenStreetMap (gratuite)
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=8&addressdetails=1&featuretype=city`
    );
    
    if (!response.ok) {
      throw new Error('Erreur lors de la recherche');
    }

    const data = await response.json();
    
    return data
      .filter((item: any) => item.type === 'city' || item.type === 'town' || item.class === 'place')
      .map((item: any, index: number) => ({
        id: `nominatim_${index}`,
        name: item.display_name.split(',')[0],
        country: item.display_name.split(',').slice(-1)[0].trim(),
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lon),
      }))
      .slice(0, 8);
  } catch (error) {
    console.error('Erreur lors de la recherche de villes:', error);
    // En cas d'erreur, retourner les résultats filtrés des villes populaires
    return POPULAR_ECO_CITIES.filter(city =>
      city.name.toLowerCase().includes(query.toLowerCase()) ||
      city.country.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);
  }
};

export const getCityById = (id: string): City | undefined => {
  return POPULAR_ECO_CITIES.find(city => city.id === id);
};