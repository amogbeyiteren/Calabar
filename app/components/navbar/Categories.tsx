'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { GiWaterSplash, GiPalmTree, GiElephant,  GiPineTree, GiWheat, GiFamilyHouse, GiGreekTemple } from 'react-icons/gi';
// import { IoCitySharp } from 'react-icons/io5';
import { GiMountains } from 'react-icons/gi';
import { GiVillage } from 'react-icons/gi';
import { GiCityCar } from 'react-icons/gi';
import { GiMountainRoad } from 'react-icons/gi';

import { FaRegBuilding, FaWater } from 'react-icons/fa';
import { MdPool } from 'react-icons/md';


import { 
  GiBarn, 
  GiBoatFishing, 
  GiCactus, 
  GiCastle, 
  GiCaveEntrance, 
  GiForestCamp, 
  GiIsland,
  GiWindmill
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';

import CategoryBox from "../CategoryBox";
import Container from '../Container';


export const categories = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'This property is close to the beach!',
  },
  {
    label: 'Waterfront',
    icon: GiWaterSplash,
    description: 'This property is located on the waterfront!',
  },
  {
    label: 'City Center',
    icon: GiCityCar,
    description: 'This property is located in the city center!',
  },
  {
    label: 'Countryside',
    icon: TbMountain,
    description: 'This property is in the countryside!',
  },
  {
    label: 'Poolside',
    icon: TbPool,
    description: 'This property has a beautiful pool!',
  },
  {
    label: 'Islands',
    icon: GiIsland,
    description: 'This property is on an island!',
  },
  {
    label: 'Lakefront',
    icon: GiBoatFishing,
    description: 'This property is located near a lake!',
  },
  {
    label: 'Resort',
    icon: GiPalmTree,
    description: 'This property is a resort!',
  },
  {
    label: 'Safari',
    icon: GiElephant,
    description: 'This property offers safari experiences!',
  },
  {
    label: 'Village',
    icon: GiVillage,
    description: 'This property is located in a village!',
  },
  {
    label: 'Forest',
    icon: GiPineTree,
    description: 'This property is located in a forest!',
  },
  {
    label: 'Farm',
    icon: GiWheat,
    description: 'This property is a farm!',
  },
  {
    label: 'Mountains',
    icon: GiMountains,
    description: 'This property is located in the mountains!',
  },
  {
    label: 'Residential',
    icon: GiFamilyHouse,
    description: 'This property is residential!',
  },
  {
    label: 'Historical',
    icon: GiGreekTemple,
    description: 'This property is historical!',
  },
];






export const centers = [
  {
    label: 'National Museum',
    icon: FaRegBuilding,
    description: 'The National Museum Calabar which is made of old Scandinavian pine has stood for centuries preserving old relics mostly documents, furnishings, and artifacts used during the Colonial Administration.The museum which overlooks the Calabar creek is a good place to learn about the Efik history while browsing through the old items carefully listening to the tour guide taking you back in time. The museum is always open between 9 am to 6 pm daily.',
  },
  {
    label: 'Cross River National Park',
    icon: FaWater,
    description: 'Cross River National Park is the most preserved tropical rainforest in West Africa. It spreads from Oban through to Okwangwo over a landmass of 720 square kilometres which took a period of three years to be fully established. Cross River National park is a sanctuary to almost extinct animals, plants and faunas like the drill monkeys, Red fox, leopards and many more.',
  },
  {
    label: 'Tinapa Resort',
    icon: GiCityCar,
    description: 'The resort is a tourist’s dream located by the Calabar River, Tinapa Resort is a world-class facility where visitors can take advantage of retail and wholesale activities as well as enjoy recreational activities. There is an open exhibition area at Tinapa Free Trade Zone available for trade exhibitions and other events.',
  },
  {
    label: 'Obudu Mountain Resort',
    icon: GiMountainRoad,
    description: 'Obudu Mountain resort is comprised of heights and miles of rolling highs and mountain which is guaranteed to give you a double take on your first visit. The temperate climate and the deep tropical forest allows for the exotic breed of butterflies and faunas to flourish. Adventurers are known to climb the Obudu mountain which takes a number of days with enough rest and food to energise the climber. The serene and picturesque environment is great for a good ole escape from civilisation into the unknown which is sure you would enjoy to the utmost.',
  },
  {
    label: 'Agbokim Waterfalls',
    icon: MdPool,
    description: 'Agbokim waterfall is a seven faced wonder consisting of seven streams cascading over steep cliffs, with its lush vegetation and picturesque scenery, it is ideal for picnics, bird watching and meditation. Agbokim Waterfalls is surrounded by lush greenery, valleys and steep hills which are enveloped in a rainbow-like aura. Its freshness is captivating and has an alluring serenity. It is the ideal location for a vacation to get back into nature and regain your creative productivity and general well being.',
  },
  
];






const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/alllistings';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {categories.map((item) => (
          <CategoryBox 
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
}
 
export default Categories;