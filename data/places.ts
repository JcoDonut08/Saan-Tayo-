import type { Place } from '@/types/place';

export const places: Place[] = [
  {
    address: 'Makati Central Business District, Makati City',
    categories: ['park'],
    city: 'Makati',
    cost: {
      kind: 'free',
      label: 'Free garden access',
      maxPerPerson: 0,
    },
    id: 'ayala-triangle-gardens',
    lastVerifiedAt: '2026-08-19',
    moods: ['chill'],
    name: 'Ayala Triangle Gardens',
    officialUrl: 'https://www.ayalatriangle.com/gardens',
    primaryCategory: 'park',
    sourceLabel: 'Ayala Triangle',
    summary:
      'A landscaped green space in the Makati CBD with more than a hundred trees and room for an easy city break.',
  },
  {
    address: 'Elliptical Road, Diliman, Quezon City',
    categories: ['park', 'activity', 'food'],
    city: 'Quezon City',
    cost: {
      kind: 'free',
      label: 'Free park entry; some activities cost extra',
      maxPerPerson: 0,
    },
    id: 'quezon-memorial-circle',
    lastVerifiedAt: '2026-08-19',
    moods: ['chill', 'active', 'culture', 'food-trip'],
    name: 'Quezon Memorial Circle',
    officialUrl:
      'https://quezoncity.gov.ph/departments/quezon-memorial-circle-administration-offic/',
    primaryCategory: 'park',
    sourceLabel: 'Quezon City Government',
    summary:
      'A 27-hectare public park with gardens, recreation facilities, museums, food stalls, and open spaces for a full-day tambay.',
  },
  {
    address: 'P. Burgos Drive, Rizal Park, Manila',
    categories: ['museum', 'activity'],
    city: 'Manila',
    cost: {
      kind: 'free',
      label: 'Free admission',
      maxPerPerson: 0,
    },
    id: 'national-museum-natural-history',
    lastVerifiedAt: '2026-08-19',
    moods: ['culture', 'chill'],
    name: 'National Museum of Natural History',
    officialUrl:
      'https://www.nationalmuseum.gov.ph/our-museums/national-museum-of-natural-history/',
    primaryCategory: 'museum',
    sourceLabel: 'National Museum of the Philippines',
    summary:
      'Twelve galleries follow a mountain-to-sea story through the Philippines\u2019 zoological, botanical, and geological collections.',
  },
  {
    address: 'JY Campos Park, 3rd Avenue, BGC, Taguig City',
    categories: ['museum', 'activity'],
    city: 'Taguig',
    cost: {
      kind: 'fixed',
      label: 'Regular adult admission from \u20b1625',
      maxPerPerson: 625,
    },
    id: 'the-mind-museum',
    lastVerifiedAt: '2026-08-19',
    moods: ['culture', 'active'],
    name: 'The Mind Museum',
    officialUrl: 'https://www.themindmuseum.org/visit-us/plan-your-visit',
    primaryCategory: 'museum',
    sourceLabel: 'The Mind Museum',
    summary:
      'A hands-on science museum with more than 250 interactive exhibits across five connected galleries.',
  },
  {
    address: '175 15th Avenue, Socorro, Cubao, Quezon City',
    categories: ['museum', 'activity'],
    city: 'Quezon City',
    cost: {
      kind: 'fixed',
      label: 'Regular adult admission \u20b1500',
      maxPerPerson: 500,
    },
    id: 'art-in-island',
    lastVerifiedAt: '2026-08-19',
    moods: ['culture', 'active'],
    name: 'Art in Island',
    officialUrl: 'https://exploreqc.quezoncity.gov.ph/art-in-island',
    primaryCategory: 'activity',
    sourceLabel: 'Quezon City Tourism Department',
    summary:
      'An interactive art museum where murals, projections, and optical-illusion rooms turn the visit into the activity.',
  },
  {
    address: 'Bonifacio Global City, Taguig City',
    categories: ['mall', 'food', 'activity'],
    city: 'Taguig',
    cost: { kind: 'varies', label: 'Spending varies by stop' },
    id: 'bonifacio-high-street',
    lastVerifiedAt: '2026-08-19',
    moods: ['chill', 'food-trip', 'active'],
    name: 'Bonifacio High Street',
    officialUrl:
      'https://www.ayalamalls.com/explore/ayala-bonifacio-high-street/store/AYALA-ONE-BONIFACIO-HIGH-STREET-1326575',
    primaryCategory: 'mall',
    sourceLabel: 'Ayala Malls',
    summary:
      'A kilometer-long open-air boulevard lined with dining, shopping, and places to slow down between stops.',
  },
  {
    address: 'Seaside Boulevard, Mall of Asia Complex, Pasay City',
    categories: ['mall', 'food', 'activity'],
    city: 'Pasay',
    cost: { kind: 'varies', label: 'Spending varies by activity' },
    id: 'sm-mall-of-asia',
    lastVerifiedAt: '2026-08-19',
    moods: ['food-trip', 'active', 'chill'],
    name: 'SM Mall of Asia',
    officialUrl:
      'https://www.smsupermalls.com/mall-directory/sm-mall-of-asia/information/',
    primaryCategory: 'mall',
    sourceLabel: 'SM Supermalls',
    summary:
      'A large bayside destination that combines dining, shopping, and entertainment in one flexible meetup.',
  },
  {
    address: '106 Esteban Street, Legazpi Village, Makati City',
    categories: ['cafe', 'food'],
    city: 'Makati',
    cost: { kind: 'varies', label: 'Menu prices vary' },
    id: 'yardstick-legazpi',
    lastVerifiedAt: '2026-08-19',
    moods: ['chill', 'study', 'food-trip'],
    name: 'Yardstick Coffee \u2014 Legazpi',
    officialUrl: 'https://store.yardstickcoffee.com/pages/cafe',
    primaryCategory: 'cafe',
    sourceLabel: 'Yardstick Coffee',
    summary:
      'Yardstick\u2019s flagship caf\u00e9 pairs specialty coffee with a full kitchen, a bean shop, and its reservable Flavor Bar.',
  },
  {
    address: '36 Polaris corner Durban Streets, Poblacion, Makati City',
    categories: ['cafe', 'food'],
    city: 'Makati',
    cost: { kind: 'varies', label: 'Menu prices vary' },
    id: 'commune-cafe-bar',
    lastVerifiedAt: '2026-08-19',
    moods: ['chill', 'food-trip'],
    name: 'Commune Caf\u00e9 + Bar',
    officialUrl: 'https://commune.ph/',
    primaryCategory: 'cafe',
    sourceLabel: 'Commune Caf\u00e9 + Bar',
    summary:
      'A Poblacion caf\u00e9 serving Philippine coffee, Filipino comfort food, and light meals in a space built for conversation.',
  },
];

export const placeById = new Map(places.map((place) => [place.id, place]));
