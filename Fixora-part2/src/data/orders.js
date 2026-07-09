const orders = [
    {
    id: "ORD-1042",
    status: "active",
    price: 250,
    currency: "SAR",
    scheduledAt: "Today, 2:30 PM",
    description:
      "Electrical maintenance for a residential apartment. The customer reported a power outage in the living room.",

    service: {
      id: 1,
      name: "Electrical Service",
      image:
        "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
    },

    provider: {
      id: 101,
      name: "Ahmed Al-Ghamdi",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      speciality: "Electrical Technician",
      rating: 4.9,
      reviews: 312,
      experience: 8,
      phone: "+966500000001",
      verified: true,
    },

    location: {
      address: "Prince Sultan Road",
      district: "Al Nakheel",
      city: "Riyadh",
      lat: 24.745,
      lng: 46.658,
    },

    gallery: [
      {
        id: 1,
        image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 2,
        image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1621847468516-1c5ab8b6f4b6?auto=format&fit=crop&w=900&q=80",
      },
    ],

    timeline: [
      {
        id: 1,
        title: "Order Placed",
        time: "09:15 AM",
        description: "Order created successfully.",
        completed: true,
      },
      {
        id: 2,
        title: "Provider Accepted",
        time: "09:30 AM",
        description: "Technician accepted your request.",
        completed: true,
      },
      {
        id: 3,
        title: "On The Way",
        time: "10:10 AM",
        description: "Technician is on the way.",
        completed: true,
      },
      {
        id: 4,
        title: "Service Started",
        time: "--",
        description: "Waiting for arrival.",
        completed: false,
      },
    ],
    },

    {
    id: "ORD-1041",
    status: "completed",
    price: 180,
    currency: "SAR",
    scheduledAt: "Yesterday, 10:00 AM",
    description:
      "Kitchen plumbing repair and leak inspection.",

    service: {
      id: 2,
      name: "Plumbing",
      image:
        "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1200&q=80",
    },

    provider: {
      id: 102,
      name: "Khalid Al-Shahri",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      speciality: "Professional Plumber",
      rating: 4.8,
      reviews: 285,
      experience: 10,
      phone: "+966500000002",
      verified: true,
    },

    location: {
      address: "King Fahd Road",
      district: "Al Olaya",
      city: "Riyadh",
      lat: 24.7136,
      lng: 46.6753,
    },

    gallery: [
      {
        id: 1,
        image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 2,
        image: "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
      },        
    ],

    timeline: [
      {
        id: 1,
        title: "Order Placed",
        time: "08:00 AM",
        description: "",
        completed: true,
      },
      {
        id: 2,
        title: "Provider Accepted",
        time: "08:20 AM",
        description: "",
        completed: true,
      },
      {
        id: 3,
        title: "On The Way",
        time: "09:00 AM",
        description: "",
        completed: true,
      },
      {
        id: 4,
        title: "Completed",
        time: "10:00 AM",
        description: "Service completed successfully.",
        completed: true,
      },
    ],
    },

    {
    id: "ORD-1040",
    status: "cancelled",
    price: 120,
    currency: "SAR",
    scheduledAt: "Today, 8:00 AM",
    description:
      "Deep home cleaning request cancelled by customer.",

    service: {
      id: 3,
      name: "Cleaning",
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
    },

    provider: {
      id: 103,
      name: "Clean House Co.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      speciality: "Cleaning Team",
      rating: 4.7,
      reviews: 450,
      experience: 12,
      phone: "+966500000003",
      verified: true,
    },

    location: {
      address: "Tahlia Street",
      district: "Al Sulimaniyah",
      city: "Riyadh",
      lat: 24.6972,
      lng: 46.6875,
    },

    gallery: [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",

        },
      {
            id: 2,
            image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=80",
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=900&q=80",
        },  
    ],

    timeline: [],
    },

    {
    id: "ORD-1039",
    status: "active",
    price: 350,
    currency: "SAR",
    scheduledAt: "Today, 1:30 PM",
    description:
      "Custom wooden shelf installation.",

    service: {
      id: 4,
      name: "Carpentry",
      image:
        "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=80",
    },

    provider: {
      id: 104,
      name: "Mohammed Ali",
      avatar: "https://randomuser.me/api/portraits/men/28.jpg",
      speciality: "Carpenter",
      rating: 4.9,
      reviews: 214,
      experience: 9,
      phone: "+966500000004",
      verified: true,
    },

    location: {
      address: "King Abdullah Road",
      district: "Al Yasmeen",
      city: "Riyadh",
      lat: 24.8162,
      lng: 46.6279,
    },

    gallery: [
      {
        id: 1,
        image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 2,
        image: "https://images.unsplash.com/photo-1513467655676-561b7d489a88?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
      },
    ],

    timeline: [],
    },

    {
    id: "ORD-1038",
    status: "completed",
    price: 420,
    currency: "SAR",
    scheduledAt: "Yesterday",
    description:
      "Interior wall painting for two bedrooms.",

    service: {
      id: 5,
      name: "Painting",
      image:
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=80",
    },

    provider: {
      id: 105,
      name: "Ahmed Hassan",
      avatar: "https://randomuser.me/api/portraits/men/51.jpg",
      speciality: "Painter",
      rating: 4.6,
      reviews: 175,
      experience: 7,
      phone: "+966500000005",
      verified: true,
    },

    location: {
      address: "Imam Saud Road",
      district: "Al Yasmeen",
      city: "Riyadh",
      lat: 24.789,
      lng: 46.694,
    },

    gallery: [
      {
        id: 1,
        image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 2,
        image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=900&q=80",
      },
    ],

    timeline: [],
    },

    {
  id: "ORD-1037",
  status: "cancelled",
  price: 600,
  currency: "SAR",
  scheduledAt: "2 days ago",
  description: "Furniture moving service cancelled before provider arrival.",

  service: {
    id: 6,
    name: "Furniture Moving",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },

  provider: {
    id: 106,
    name: "Move Fast",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    speciality: "Moving Team",
    rating: 4.7,
    reviews: 520,
    experience: 11,
    phone: "+966500000006",
    verified: true,
  },

  location: {
    address: "King Salman Road",
    district: "Al Wurood",
    city: "Riyadh",
    lat: 24.758,
    lng: 46.654,
  },

  gallery: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    },
  ],

  timeline: [],
    },

    {
  id: "ORD-1036",
  status: "active",
  price: 310,
  currency: "SAR",
  scheduledAt: "Today, 4:00 PM",
  description: "Air conditioner maintenance and gas refill.",

  service: {
    id: 7,
    name: "Air Conditioning",
    image:
      "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=1200&q=80",
  },

  provider: {
    id: 107,
    name: "Sami Fahad",
    avatar: "https://randomuser.me/api/portraits/men/61.jpg",
    speciality: "HVAC Technician",
    rating: 4.8,
    reviews: 201,
    experience: 9,
    phone: "+966500000007",
    verified: true,
  },

  location: {
    address: "Al Shifa Street",
    district: "Al Shifa",
    city: "Riyadh",
    lat: 24.591,
    lng: 46.741,
  },

  gallery: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1581578021517-5d4f3fd4df16?auto=format&fit=crop&w=900&q=80",
    },

    {
      id: 3,
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=80",
    },
  ],

  timeline: [],
    },

    {
  id: "ORD-1035",
  status: "completed",
  price: 480,
  currency: "SAR",
  scheduledAt: "3 days ago",
  description: "Metal gate welding and repair completed successfully.",

  service: {
    id: 8,
    name: "Metalwork",
    image:
      "https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg",
  },

  provider: {
    id: 108,
    name: "Abdullah Mohammed",
    avatar: "https://randomuser.me/api/portraits/men/72.jpg",
    speciality: "Welder",
    rating: 4.5,
    reviews: 163,
    experience: 13,
    phone: "+966500000008",
    verified: true,
  },

  location: {
    address: "Olaya Street",
    district: "Al Muruj",
    city: "Riyadh",
    lat: 24.774,
    lng: 46.676,
  },

  gallery: [
    {
      id: 1,
      image: "https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg",
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/209235/pexels-photo-209235.jpeg",
    },

    {
      id: 3,
      image: "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg",
    },
  ],

  timeline: [],
    },

    {
  id: "ORD-1034",
  status: "active",
  price: 750,
  currency: "SAR",
  scheduledAt: "Today, 11:00 AM",
  description: "Installation of security cameras for a villa.",

  service: {
    id: 9,
    name: "Security Cameras",
    image:
      "https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg",
  },

  provider: {
    id: 109,
    name: "Security Solutions",
    avatar: "https://randomuser.me/api/portraits/men/81.jpg",
    speciality: "Security Systems",
    rating: 4.9,
    reviews: 428,
    experience: 15,
    phone: "+966500000009",
    verified: true,
  },

  location: {
    address: "Al Khaleej Road",
    district: "Al Khaleej",
    city: "Riyadh",
    lat: 24.801,
    lng: 46.815,
  },

  gallery: [
    {
      id: 1,
      image: "https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg",
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/96612/pexels-photo-96612.jpeg",
    },

    {
      id: 3,
      image: "https://images.pexels.com/photos/280076/pexels-photo-280076.jpeg",
    },
  ],

  timeline: [],
    },

    {   
  id: "ORD-1033",
  status: "cancelled",
  price: 220,
  currency: "SAR",
  scheduledAt: "1 week ago",
  description: "Laptop maintenance request cancelled.",

  service: {
    id: 10,
    name: "Device Repair",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  },

  provider: {
    id: 110,
    name: "Repair Center",
    avatar: "https://randomuser.me/api/portraits/men/38.jpg",
    speciality: "Electronics Repair",
    rating: 4.4,
    reviews: 188,
    experience: 8,
    phone: "+966500000010",
    verified: true,
  },

  location: {
    address: "King Abdulaziz Road",
    district: "Al Yarmouk",
    city: "Riyadh",
    lat: 24.811,
    lng: 46.822,
  },

  gallery: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
    },

    {
      id: 3,
      image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=900&q=80",
    },
  ],

  timeline: [],
    },

    {   
  id: "ORD-1032",
  status: "completed",
  price: 90,
  currency: "SAR",
  scheduledAt: "Today",
  description: "Premium car wash service completed.",

  service: {
    id: 11,
    name: "Car Wash",
    image:
      "https://images.unsplash.com/photo-1607861716497-e65ab29fc7ac?auto=format&fit=crop&w=1200&q=80",
  },

  provider: {
    id: 111,
    name: "Wash Pro",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    speciality: "Car Wash",
    rating: 4.8,
    reviews: 391,
    experience: 6,
    phone: "+966500000011",
    verified: true,
  },

  location: {
    address: "Airport Road",
    district: "Al Hamra",
    city: "Riyadh",
    lat: 24.723,
    lng: 46.721,
  },

  gallery: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1607861716497-e65ab29fc7ac?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
    },

    {
      id: 3,
      image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=900&q=80",
    },
  ],

  timeline: [],
    },

    {   
  id: "ORD-1031",
  status: "active",
  price: 550,
  currency: "SAR",
  scheduledAt: "Today, 5:30 PM",
  description: "Ceramic tile installation for kitchen floor.",

  service: {
    id: 12,
    name: "Tile Installation",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
  },

  provider: {
    id: 112,
    name: "Omar Saeed",
    avatar: "https://randomuser.me/api/portraits/men/24.jpg",
    speciality: "Tile Installer",
    rating: 4.9,
    reviews: 254,
    experience: 9,
    phone: "+966500000012",
    verified: true,
  },

  location: {
    address: "Al Rimal Road",
    district: "Al Rimal",
    city: "Riyadh",
    lat: 24.855,
    lng: 46.902,
  },

  gallery: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
    },
  ],

  timeline: [],
    }
];

export default orders;