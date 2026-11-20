export interface TravelRoute {
  id: string;
  title: string;
  region: string;
  difficulty: 'Легкий' | 'Середній' | 'Складний';
  duration: string;
  distance: string;
  rating: number;
  description: string;
  points: {
    name: string;
    lat: number;
    lng: number;
    description: string;
  }[];
}

export const travelRoutes: TravelRoute[] = [
  {
    id: 'yaremche-bukovel',
    title: 'Яремче → Буковель',
    region: 'Карпати',
    difficulty: 'Середній',
    duration: '2 дні',
    distance: '35 км',
    rating: 4.9,
    description:
      'Мальовничий маршрут через водоспади, гірські стежки та панорами Карпат.',
    points: [
      {
        name: 'Яремче',
        lat: 48.4479,
        lng: 24.5533,
        description: 'Старт маршруту.',
      },
      {
        name: 'Водоспад Пробій',
        lat: 48.443,
        lng: 24.556,
        description: 'Одна з головних природних памʼяток Яремче.',
      },
      {
        name: 'Буковель',
        lat: 48.357,
        lng: 24.411,
        description: 'Фініш маршруту.',
      },
    ],
  },
  {
    id: 'lviv-old-town',
    title: 'Львів: Старе місто',
    region: 'Львів',
    difficulty: 'Легкий',
    duration: '1 день',
    distance: '8 км',
    rating: 4.8,
    description:
      'Прогулянка історичним центром Львова з головними площами та памʼятками.',
    points: [
      {
        name: 'Площа Ринок',
        lat: 49.8419,
        lng: 24.0315,
        description: 'Серце історичного Львова.',
      },
      {
        name: 'Високий Замок',
        lat: 49.8485,
        lng: 24.0394,
        description: 'Оглядовий майданчик над містом.',
      },
      {
        name: 'Оперний театр',
        lat: 49.8447,
        lng: 24.026,
        description: 'Одна з найвідоміших споруд Львова.',
      },
    ],
  },
  {
    id: 'odesa-coast',
    title: 'Одеське узбережжя',
    region: 'Одеса',
    difficulty: 'Легкий',
    duration: '1 день',
    distance: '14 км',
    rating: 4.7,
    description:
      'Маршрут уздовж моря з пляжами, набережною та місцями для відпочинку.',
    points: [
      {
        name: 'Аркадія',
        lat: 46.435,
        lng: 30.761,
        description: 'Популярна курортна зона.',
      },
      {
        name: 'Траса здоровʼя',
        lat: 46.458,
        lng: 30.755,
        description: 'Мальовнича дорога вздовж моря.',
      },
      {
        name: 'Ланжерон',
        lat: 46.476,
        lng: 30.758,
        description: 'Фініш біля узбережжя.',
      },
    ],
  },
];
