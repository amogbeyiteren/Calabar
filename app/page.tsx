'use client'

import { FaRegBuilding } from 'react-icons/fa';
import sampleImage from '../public/images/national.jpeg';
import two from '../public/images/two.jpeg';
import three from '../public/images/three.jpeg';
import four from '../public/images/four.jpeg';
import five from '../public/images/five.jpeg';
import Link from 'next/link';
import Image from 'next/image';

import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { GiWaterSplash, GiPalmTree, GiElephant,  GiPineTree, GiWheat, GiFamilyHouse, GiGreekTemple } from 'react-icons/gi';
// import { IoCitySharp } from 'react-icons/io5';
import { GiMountains } from 'react-icons/gi';
import { GiVillage } from 'react-icons/gi';
import { GiCityCar } from 'react-icons/gi';
import { GiMountainRoad } from 'react-icons/gi';

import { MdPool } from 'react-icons/md';


const centers = [
  {
    label: 'National Museum',
    icon: FaRegBuilding,
    image: sampleImage,
    description: 'The National Museum Calabar which is made of old Scandinavian pine has stood for centuries preserving old relics mostly documents, furnishings, and artifacts used during the Colonial Administration.The museum which overlooks the Calabar creek is a good place to learn about the Efik history while browsing through the old items carefully listening to the tour guide taking you back in time. The museum is always open between 9 am to 6 pm daily.',
    path: '/alllistings'
  },
  {
    label: 'Cross River National Park',
    icon: GiWaterSplash,
    image: two,
    description: 'Cross River National Park is the most preserved tropical rainforest in West Africa. It spreads from Oban through to Okwangwo over a landmass of 720 square kilometres which took a period of three years to be fully established. Cross River National park is a sanctuary to almost extinct animals, plants and faunas like the drill monkeys, Red fox, leopards and many more.',
    path: '/alllistings'
  },
  {
    label: 'Tinapa Resort',
    icon: GiCityCar,
    image: three,
    description: 'The resort is a tourist’s dream located by the Calabar River, Tinapa Resort is a world-class facility where visitors can take advantage of retail and wholesale activities as well as enjoy recreational activities. There is an open exhibition area at Tinapa Free Trade Zone available for trade exhibitions and other events.',
    path: '/alllistings'
  },
  {
    label: 'Obudu Mountain Resort',
    icon: GiMountainRoad,
    image: four,
    description: 'Obudu Mountain resort is comprised of heights and miles of rolling highs and mountain which is guaranteed to give you a double take on your first visit. The temperate climate and the deep tropical forest allows for the exotic breed of butterflies and faunas to flourish. Adventurers are known to climb the Obudu mountain which takes a number of days with enough rest and food to energise the climber. The serene and picturesque environment is great for a good ole escape from civilisation into the unknown which is sure you would enjoy to the utmost.',
    path: '/alllistings'
  },
  {
    label: 'Agbokim Waterfalls',
    icon: MdPool,
    image: five,
    description: 'Agbokim waterfall is a seven faced wonder consisting of seven streams cascading over steep cliffs, with its lush vegetation and picturesque scenery, it is ideal for picnics, bird watching and meditation. Agbokim Waterfalls is surrounded by lush greenery, valleys and steep hills which are enveloped in a rainbow-like aura. Its freshness is captivating and has an alluring serenity. It is the ideal location for a vacation to get back into nature and regain your creative productivity and general well being.',
    path: '/alllistings'
  },
];

function Page() {

  // const [selectedCenter, setSelectedCenter] = useState('');

  // const handleClick = (label:any) => {
  //   setSelectedCenter(label);
  //   localStorage.setItem('selectedCenter', label);
  // };


  const handleCenterClick = (label:any) => {
    localStorage.setItem('currentTouristCenter', label);
  };


  return (
    <div className="mx-32 justify-center my-6 h-screen">
      <h1 className="text-3xl text-gray-600 text-center font-bold mb-8">Calabar Tourist Centers</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {centers.map((center, index) => (
          <div key={index} className="bg-white rounded-lg border p-4 flex flex-col justify-between">
            <div>
              <Image src={center.image} alt={center.label} className="w-full h-48 object-cover mb-4 rounded-t-lg" />
              <div className="flex items-center mb-2">
                <center.icon className="mr-2 text-2xl text-green-500" /> {/* Displaying the icon */}
                <h2 className="text-lg font-semibold">{center.label}</h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">{center.description.slice(0, 120)}...</p> {/* Slice description to show only first 20 characters */}
            </div>
            <Link
              href={center.path}
              className="bg-green-500 text-white py-2 w-[40%] rounded-md hover:bg-blue-600 transition duration-300 ease-in-out flex items-center justify-start px-4"
              onClick={() => handleCenterClick(center.label)} // Add click handler
            >
              Visit Center <span className="ml-2">&rarr;</span> {/* Add right-pointing arrow */}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
