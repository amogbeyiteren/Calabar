// Define places in Calabar, Nigeria with coordinates
const calabarPlaces = [
  { name: 'Tinapa Resort', code: 'TIN', coordinates: [4.9707, 8.3213] },
  { name: 'Calabar Museum', code: 'CAL', coordinates: [4.9465, 8.3365] },
  { name: 'Slave History Museum', code: 'SLA', coordinates: [4.9419, 8.3244] },
  { name: 'Marina Resort', code: 'MAR', coordinates: [4.9487, 8.3349] },
  { name: 'Calabar Botanical Gardens', code: 'BOT', coordinates: [4.9514, 8.3159] },
  { name: 'Kwa Falls', code: 'KWA', coordinates: [5.0012, 8.2039] },
  { name: 'Mary Slessor Tomb', code: 'MAR', coordinates: [4.9497, 8.3167] },
  { name: 'Duke Town Church', code: 'DTC', coordinates: [4.9502, 8.3178] },
  { name: 'Millennium Park', code: 'MIL', coordinates: [4.9479, 8.3252] },
  { name: 'Calabar Drill Monkey Sanctuary', code: 'DRM', coordinates: [4.9133, 8.2975] },
  { name: 'Aqua Marina Luxury Apartments', code: 'AQU', coordinates: [4.9435, 8.3257] },
  { name: 'Cross River State National Park', code: 'CRP', coordinates: [4.9712, 8.2569] },
  { name: 'Atimbo Wildlife Sanctuary', code: 'AWS', coordinates: [4.9081, 8.3386] },
  { name: 'Transcorp Hotels', code: 'THL', coordinates: [4.9546, 8.3221] },
  { name: 'Calabar River', code: 'CRR', coordinates: [4.9586, 8.3310] }
  // Add more places as needed
];

// Modify the code to use places in Calabar
const formattedCalabarPlaces = calabarPlaces.map((place) => ({
  value: place.code,
  label: place.name,
  coordinates: place.coordinates
}));

const useCalabarPlaces = () => {
  const getAll = () => formattedCalabarPlaces;

  const getByValue = (value: string) => {
    return formattedCalabarPlaces.find((item) => item.value === value);
  }

  return {
    getAll,
    getByValue
  }
};

export default useCalabarPlaces;
