'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { GiWaterSplash, GiPalmTree, GiElephant,  GiPineTree, GiWheat, GiFamilyHouse, GiGreekTemple } from 'react-icons/gi';
// import { IoCitySharp } from 'react-icons/io5';
import { GiMountains } from 'react-icons/gi';
import { GiVillage } from 'react-icons/gi';
import { GiCityCar } from 'react-icons/gi';


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


const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

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