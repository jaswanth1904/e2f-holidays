export const cruisePackages = [
    {
        id: "goa-weekend-3n",
        title: "Goa (Overnight) Weekend Cruise",
        duration: "3 Nights / 4 Days",
        destination: "Goa",
        route: "Mumbai Round Trip",
        ports: ["Mumbai", "Goa", "Goa", "Mumbai"],
        price: 33948,
        description: "Experience the vibrant culture of Goa with an overnight stay. Enjoy beaches, nightlife, and portuguese heritage.",
        image: "https://images.pexels.com/photos/29901876/pexels-photo-29901876.jpeg",
        itinerary: [
            { day: 1, port: "Mumbai", activity: "Embarkation & High Tea. Set sail into the sunset." },
            { day: 2, port: "Goa", activity: "Arrival in Goa. Shore excursions to Calangute & Baga Beach. Overnight docked in Goa." },
            { day: 3, port: "Goa", activity: "Morning in Goa. Departure at 1:00 PM. High Seas entertainment." },
            { day: 4, port: "Mumbai", activity: "Arrival in Mumbai at 8:00 AM. Disembarkation." }
        ],
        inclusions: [
            "All meals at Food Court & Starlight Restaurant",
            "Access to swimming pool, jacuzzi, and fitness center",
            "Entry to casino (gaming chips extra)",
            "Live entertainment shows",
            "Port charges & Gratuity"
        ],
        shows: ["Balle Balle - Musical", "Indian Cinemagic", "Burlesque Theatrical"],
        ship: "Empress",
        safetyOptions: ["Sanitized Cabins", "Temperature Checks", "Onboard Medical Center"],
        otherDetails: "Valid Govt ID required. Foreign nationals need valid Visa."
    },
    {
        id: "mumbai-weekend-2n",
        title: "Mumbai Weekend Cruise",
        duration: "2 Nights / 3 Days",
        destination: "Mumbai",
        route: "Mumbai Round Trip",
        ports: ["Mumbai", "High Seas", "Mumbai"],
        price: 23460,
        description: "A quick getaway to relax and rejuvenate on the high seas. Perfect for first-time cruisers.",
        image: "https://images.pexels.com/photos/706352/pexels-photo-706352.jpeg",
        itinerary: [
            { day: 1, port: "Mumbai", activity: "Boarding starts at 3:00 PM. Sail away party on the pool deck." },
            { day: 2, port: "High Seas", activity: "Full day at sea. Enjoy the casino, spa, and broadway shows." },
            { day: 3, port: "Mumbai", activity: "Return to Mumbai. Breakfast and disembarkation." }
        ],
        inclusions: [
            "Unlimited buffet meals",
            "Ocean view cabin (subject to booking)",
            "Onboard activities & workshops",
            "Usage of pool & gym"
        ],
        shows: ["Magician's Cut", "Romance in Bollywood"],
        ship: "Empress",
        safetyOptions: ["Sanitized Cabins", "Social Distancing Layout", "Contactless Dining"],
        otherDetails: "Carry motion sickness medication if prone to seasickness."
    },
    {
        id: "lakshadweep-3n",
        title: "Lakshadweep Cruise",
        duration: "3 Nights / 4 Days",
        destination: "Lakshadweep",
        route: "Mumbai → Lakshadweep → Mumbai",
        ports: ["Mumbai", "Lakshadweep", "At Sea", "Mumbai"],
        price: 34132,
        description: "Sail to the pristine islands of Lakshadweep. Crystal clear waters and coral reefs await.",
        image: "https://images.pexels.com/photos/31246551/pexels-photo-31246551.jpeg?auto=compress&cs=tinysrgb&w=1600",
        itinerary: [
            { day: 1, port: "Mumbai", activity: "Depart Mumbai in the evening." },
            { day: 2, port: "Lakshadweep", activity: "Arrive at Kadmat Island. Water sports and snorkeling." },
            { day: 3, port: "At Sea", activity: "Cruising back. Gala dinner night." },
            { day: 4, port: "Mumbai", activity: "Arrive in Mumbai morning." }
        ],
        inclusions: [
            "All-inclusive dining",
            "Island transfer via tender boats",
            "Snorkeling gear (basic)",
            "Entertainment access"
        ],
        shows: ["Musical Extravaganza", "Comedy Night"],
        ship: "Empress",
        safetyOptions: ["Enhanced Cleaning", "Crew Vaccinated"],
        otherDetails: "Lakshadweep entry permit included in ticket."
    },
    {
        id: "kochi-highseas-4n",
        title: "Kochi & High Seas Adventure",
        duration: "4 Nights / 5 Days",
        destination: "Kerala",
        route: "Mumbai → Kochi → High Seas → Mumbai",
        ports: ["Mumbai", "Kochi", "High Seas", "Mumbai"],
        price: 42500,
        description: "Explore the Queen of the Arabian Sea, Kochi, combined with relaxing days at sea.",
        image: "https://images.pexels.com/photos/5679123/pexels-photo-5679123.jpeg?auto=compress&cs=tinysrgb&w=1600",
        itinerary: [
            { day: 1, port: "Mumbai", activity: "Departure from Mumbai International Cruise Terminal." },
            { day: 2, port: "At Sea", activity: "Relaxing day at sea. Pool parties and workshops." },
            { day: 3, port: "Kochi", activity: "Visit Fort Kochi, Chinese Fishing Nets. Local cuisine tour." },
            { day: 4, port: "At Sea", activity: "Sailing back north. Farewell dinner." },
            { day: 5, port: "Mumbai", activity: "Arrival in Mumbai." }
        ],
        inclusions: [
            "Accommodation in selected cabin category",
            "5 meals a day",
            "Entry to The Dome (DJ Night)",
            "Kids club access"
        ],
        shows: ["Cultural Kerala Art Forms", "International Dance Troupe"],
        ship: "Empress",
        safetyOptions: ["Health & Safety Protocols", "24/7 Medical Staff"],
        otherDetails: "Shore excursions in Kochi are optional and chargeable."
    },
    {
        id: "chennai-srilanka-5n",
        title: "Sri Lanka & East Coast",
        duration: "5 Nights / 6 Days",
        destination: "Sri Lanka",
        route: "Chennai → Jaffna → Trincomalee → Chennai",
        ports: ["Chennai", "Jaffna", "Trincomalee", "Chennai"],
        price: 55999,
        description: "An international voyage to our neighbor Sri Lanka. Discover Jaffna's history and Trincomalee's beaches.",
        image: "https://images.pexels.com/photos/34779145/pexels-photo-34779145.jpeg?auto=compress&cs=tinysrgb&w=1600",
        itinerary: [
            { day: 1, port: "Chennai", activity: "Embarkation from Chennai Port." },
            { day: 2, port: "At Sea", activity: "Cruising the Bay of Bengal." },
            { day: 3, port: "Jaffna", activity: "Jaffna Fort and Nallur Kandaswamy Temple." },
            { day: 4, port: "Trincomalee", activity: "Koneswaram Temple and Beach relaxation." },
            { day: 5, port: "At Sea", activity: "Return journey. Captain's Dinner." },
            { day: 6, port: "Chennai", activity: "Arrive in Chennai." }
        ],
        inclusions: [
            "Visa assistance (Sri Lanka)",
            "All onboard meals",
            "Port taxes",
            "Travel Insurance"
        ],
        shows: ["Sri Lankan Cultural Night", "Magic & Illusion"],
        ship: "Empress",
        safetyOptions: ["COVID-19 Safe", "Sanitized Excursions"],
        otherDetails: "Passport validity must be at least 6 months from travel date."
    },
    {
        id: "diu-escape-3n",
        title: "Diu Coastal Escape",
        duration: "3 Nights / 4 Days",
        destination: "Diu",
        route: "Mumbai → Diu → Mumbai",
        ports: ["Mumbai", "Diu", "At Sea", "Mumbai"],
        price: 28900,
        description: "Sail to the peaceful island of Diu. Explore the fort, Naida caves, and Nagoa beach.",
        image: "https://images.pexels.com/photos/6779738/pexels-photo-6779738.jpeg?auto=compress&cs=tinysrgb&w=1600",
        itinerary: [
            { day: 1, port: "Mumbai", activity: "Set sail at 4:30 PM." },
            { day: 2, port: "Diu", activity: "Dock at Diu. Visit Diu Fort and St. Paul's Church." },
            { day: 3, port: "At Sea", activity: "Fun day at sea. Casino tournaments." },
            { day: 4, port: "Mumbai", activity: "Disembark at 9:00 AM." }
        ],
        inclusions: [
            "Full board meals",
            "Cabin accommodation",
            "Access to library and card room",
            "Live band performances"
        ],
        shows: ["Retro Bollywood Night", "Stand-up Comedy"],
        ship: "Empress",
        safetyOptions: ["Sanitized Areas", "Masks on Request"],
        otherDetails: "Alcohol service regulated as per state laws."
    },
    {
        id: "sundarbans-river-3n",
        title: "Sundarbans Luxury River Cruise",
        duration: "3 Nights / 4 Days",
        destination: "West Bengal",
        route: "Kolkata Round Trip",
        ports: ["Kolkata", "Namkhana", "Sundarbans", "Kolkata"],
        price: 45000,
        description: "A unique river cruise experience through the world's largest mangrove forest.",
        image: "https://images.pexels.com/photos/33818466/pexels-photo-33818466.jpeg?auto=compress&cs=tinysrgb&w=1600",
        itinerary: [
            { day: 1, port: "Kolkata", activity: "Board at Millennium Park. Sail past Howrah Bridge." },
            { day: 2, port: "Namkhana", activity: "Visit Bhagabatpur Crocodile Project." },
            { day: 3, port: "Sundarbans", activity: "Boat safari to Sudhanyakhali Watch Tower. Tiger spotting chances." },
            { day: 4, port: "Kolkata", activity: "Return to Kolkata." }
        ],
        inclusions: [
            "Guided forest safaris",
            "All meals including local Bengali specialties",
            "Cultural programs (Baul music)",
            "Forest entry fees"
        ],
        shows: ["Folk Music & Dance", "Wildlife Documentary Screening"],
        ship: "River Voyager",
        safetyOptions: ["Eco-friendly & Safe", "Mosquito Protection Provided"],
        otherDetails: "Plastic-free zone. Please adhere to forest guidelines."
    },
    {
        id: "lakshadweep-explore-5n",
        title: "Lakshadweep Explorer",
        duration: "5 Nights / 6 Days",
        destination: "Lakshadweep",
        route: "Mumbai → Kadmat → Kalpeni → Mumbai",
        ports: ["Mumbai", "Kadmat", "Kalpeni", "Mumbai"],
        price: 58000,
        description: "An extended exploration of Lakshadweep visiting two different islands.",
        image: "https://images.pexels.com/photos/13452880/pexels-photo-13452880.jpeg?auto=compress&cs=tinysrgb&w=1600",
        itinerary: [
            { day: 1, port: "Mumbai", activity: "Departure." },
            { day: 2, port: "At Sea", activity: "Cruising." },
            { day: 3, port: "Kadmat", activity: "Water sports and lagoon visit." },
            { day: 4, port: "Kalpeni", activity: "Sightseeing and cultural interaction." },
            { day: 5, port: "At Sea", activity: "Return journey." },
            { day: 6, port: "Mumbai", activity: "Arrival." }
        ],
        inclusions: [
            "Island hopping transfers",
            "All meals and beverages (non-alcoholic)",
            "Snorkeling equipment",
            "Gala Dinner"
        ],
        shows: ["Carnival Night", "Laser Show"],
        ship: "Empress",
        safetyOptions: ["Lifeguards on Duty (Water Sports)", "Medical Assistance"],
        otherDetails: "Subject to weather conditions."
    },
    {
        id: "vizag-andaman-4n",
        title: "Vizag & High Seas",
        duration: "4 Nights / 5 Days",
        destination: "Andaman",
        route: "Chennai → Visakhapatnam → Chennai",
        ports: ["Chennai", "Visakhapatnam", "High Seas", "Chennai"],
        price: 38500,
        description: "Sail along the East Coast to the jewel of the East, Vizag.",
        image: "https://images.pexels.com/photos/1583244/pexels-photo-1583244.jpeg?auto=compress&cs=tinysrgb&w=1600",
        itinerary: [
            { day: 1, port: "Chennai", activity: "Set sail." },
            { day: 2, port: "Visakhapatnam", activity: "Visit RK Beach and Submarine Museum." },
            { day: 3, port: "Visakhapatnam", activity: "Morning in Vizag. Depart afternoon." },
            { day: 4, port: "At Sea", activity: "Full day entertainment." },
            { day: 5, port: "Chennai", activity: "Arrival." }
        ],
        inclusions: [
            "Access to all 5 decks",
            "Buffet dining",
            "Pool access",
            "Port charges"
        ],
        shows: ["Rock & Roll Night", "Indian Classical Fusion"],
        ship: "Empress",
        safetyOptions: ["Crowd Management", "Hygiene Stations"],
        otherDetails: "Boarding closes 2 hours before departure."
    }
];

export const tourPackages = [
    {
        id: "kashmir-paradise-6n",
        title: "Kashmir Paradise: Srinagar & Gulmarg",
        duration: "6 Nights / 7 Days",
        destination: "Kashmir",
        route: "Srinagar → Gulmarg → Pahalgam → Srinagar",
        price: 32500,
        description: "Experience the Heaven on Earth. Stay in a houseboat, ride the Gondola in Gulmarg, and relax by the Lidder river.",
        image: "https://images.unsplash.com/photo-1593417376544-4c4201061e22?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8a2FzaG1pcnxlbnwwfHwwfHx8MA%3D%3D",
        itinerary: [
            { day: 1, port: "Srinagar", activity: "Arrive in Srinagar. Check into Houseboat. Shikara Ride on Dal Lake." },
            { day: 2, port: "Gulmarg", activity: "Day trip to Gulmarg. Gondola Ride (Phase 1 & 2). Snow activities." },
            { day: 3, port: "Pahalgam", activity: "Transfer to Pahalgam via Saffron fields. Visit Aru Valley." },
            { day: 4, port: "Pahalgam", activity: "Day at leisure in Pahalgam. Betaab Valley visit." },
            { day: 5, port: "Srinagar", activity: "Return to Srinagar. Visit Mughal Gardens (Shalimar/Nishat)." },
            { day: 6, port: "Srinagar", activity: "Shopping at Lal Chowk. Shankaracharya Temple visit." },
            { day: 7, port: "Srinagar", activity: "Transfer to airport." }
        ],
        inclusions: ["3 Star Hotels + 1 Night Houseboat", "Daily Breakfast & Dinner", "Non-AC Private Cab (Hill Station)", "Shikara Ride"],
        shows: ["Cultural Folk Music (Houseboat)", "Campfire"],
        ship: "Private Cab",
        safetyOptions: ["Verified Hotels", "Sanitized Cab", "24/7 Driver Support"],
        otherDetails: "Gondola tickets to be booked in advance."
    },
    {
        id: "rajasthan-royal-7n",
        title: "Royal Rajasthan: Jaipur, Jodhpur & Udaipur",
        duration: "7 Nights / 8 Days",
        destination: "Rajasthan",
        route: "Jaipur → Jodhpur → Udaipur",
        price: 45000,
        description: "Walk through the corridors of history. Palaces, forts, and lakes define this royal journey.",
        image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1600&auto=format&fit=crop",
        itinerary: [
            { day: 1, port: "Jaipur", activity: "Arrival in Jaipur. Amber Fort and City Palace." },
            { day: 2, port: "Jaipur", activity: "Hawa Mahal, Jantar Mantar. Chokhi Dhani dinner." },
            { day: 3, port: "Jodhpur", activity: "Drive to Jodhpur. Visit Mehrangarh Fort." },
            { day: 4, port: "Jodhpur", activity: "Jaswant Thada and Umaid Bhawan Palace Museum." },
            { day: 5, port: "Udaipur", activity: "Drive to Udaipur via Ranakpur Jain Temples." },
            { day: 6, port: "Udaipur", activity: "City Palace, Lake Pichola Boat Ride." },
            { day: 7, port: "Udaipur", activity: "Saheliyon Ki Bari and Shopping." },
            { day: 8, port: "Udaipur", activity: "Departure." }
        ],
        inclusions: ["Heritage Hotels", "Daily Breakfast", "AC Private Vehicle", "Guide Services"],
        shows: ["Puppet Show", "Traditional Rajasthani Dance"],
        ship: "Private Vehicle",
        safetyOptions: ["Hygiene-Rated Hotels", "Masked Drivers"],
        otherDetails: "Entry fees to monuments not included."
    },
    {
        id: "thailand-beach-city-5n",
        title: "Thailand: Bangkok & Pattaya",
        duration: "5 Nights / 6 Days",
        destination: "Thailand",
        route: "Bangkok → Pattaya → Bangkok",
        price: 52000,
        description: "The perfect mix of city life and beach vibes. Coral Island tour and Bangkok Temple tour included.",
        image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1600&auto=format&fit=crop",
        itinerary: [
            { day: 1, port: "Pattaya", activity: "Arrive in Bangkok. Transfer to Pattaya. Alcazar Show." },
            { day: 2, port: "Pattaya", activity: "Coral Island Tour by Speedboat with Lunch." },
            { day: 3, port: "Bangkok", activity: "Transfer to Bangkok. Gems Gallery visit." },
            { day: 4, port: "Bangkok", activity: "Bangkok City & Temple Tour (Golden Buddha)." },
            { day: 5, port: "Bangkok", activity: "Day at leisure for shopping (Indra Square/MBK)." },
            { day: 6, port: "Bangkok", activity: "Departure." }
        ],
        inclusions: ["3/4 Star Accommodation", "Daily Breakfast", "Airport Transfers", "Coral Island Tour"],
        shows: ["Alcazar Cabaret", "Cultural Show"],
        ship: "Flight Included",
        safetyOptions: ["SHA+ Certified Hotels", "Travel Insurance Included"],
        otherDetails: "Visa on Arrival fees differ. Check validity."
    },
    {
        id: "dubai-glitz-4n",
        title: "Dazzling Dubai: Burj & Desert",
        duration: "4 Nights / 5 Days",
        destination: "Dubai",
        route: "Dubai City",
        price: 65000,
        description: "Experience the luxury of Dubai. Burj Khalifa, Desert Safari, and Dhow Cruise.",
        image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fER1YmFpfGVufDB8fDB8fHww",
        itinerary: [
            { day: 1, port: "Dubai", activity: "Arrival. Dhow Cruise with Dinner at Marina." },
            { day: 2, port: "Dubai", activity: "Half Day City Tour. Visit Burj Khalifa (124th Floor)." },
            { day: 3, port: "Dubai", activity: "Desert Safari with BBQ Dinner & Belly Dance." },
            { day: 4, port: "Dubai", activity: "Day at leisure or optional Miracle Garden visit." },
            { day: 5, port: "Dubai", activity: "Shopping and Departure." }
        ],
        inclusions: ["4 Star Hotel", "Daily Breakfast", "Visas & Insurance", "All Transfers"],
        shows: ["Belly Dance", "Tanoura Show"],
        ship: "Flight Included",
        safetyOptions: ["COVID Cover Insurance", "Private Transfers"],
        otherDetails: "Tourism Dirham fee to be paid directly at hotel."
    },
    {
        id: "singapore-fun-4n",
        title: "Singapore: City of Gardens",
        duration: "4 Nights / 5 Days",
        destination: "Singapore",
        route: "Singapore",
        price: 72000,
        description: "A futuristic city with lush gardens. Universal Studios and Sentosa Island await.",
        image: "https://images.unsplash.com/photo-1541267226650-673e4bc869c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNpbmdhcG9yZXxlbnwwfHwwfHx8MA%3D%3D",
        itinerary: [
            { day: 1, port: "Singapore", activity: "Arrival. Night Safari tour." },
            { day: 2, port: "Singapore", activity: "Half Day City Tour. Gardens by the Bay." },
            { day: 3, port: "Sentosa", activity: "Sentosa Island Tour (Cable Car, Madame Tussauds)." },
            { day: 4, port: "Singapore", activity: "Full day at Universal Studios." },
            { day: 5, port: "Singapore", activity: "Departure." }
        ],
        inclusions: ["3/4 Star Hotel", "Daily Breakfast", "Visa", "Attraction Tickets"],
        shows: ["Wings of Time", "Light & Sound Show"],
        ship: "Flight Included",
        safetyOptions: ["SG Clean Certified", "Contactless Entry"],
        otherDetails: "Strict laws on littering and chewing gum."
    },
    {
        id: "bali-bliss-5n",
        title: "Bali: Island of Gods",
        duration: "5 Nights / 6 Days",
        destination: "Bali",
        route: "Kuta → Ubud → Kintamani",
        price: 55000,
        description: "Rice terraces, temples, and beaches. Experience the spiritual and natural beauty of Bali.",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1600&auto=format&fit=crop",
        itinerary: [
            { day: 1, port: "Kuta", activity: "Arrival in Bali. Transfer to Kuta hotel." },
            { day: 2, port: "Kintamani", activity: "Full day Kintamani Volcano Tour with Ubud Village." },
            { day: 3, port: "Bali", activity: "Water sports at Benoa Beach. Tanlot Temple sunset." },
            { day: 4, port: "Ubud", activity: "Transfer to Ubud Private Pool Villa." },
            { day: 5, port: "Ubud", activity: "Day at leisure in Ubud. Spa session." },
            { day: 6, port: "Bali", activity: "Departure." }
        ],
        inclusions: ["Hotel + Private Pool Villa", "Daily Breakfast", "Airport Transfers", "English Speaking Driver"],
        shows: ["Kecak Fire Dance", "Barong Dance"],
        ship: "Flight Included",
        safetyOptions: ["CHSE Certified", "Private Vehicles"],
        otherDetails: "Visa on Arrival for Indians (IDR 500,000)."
    },
    {
        id: "maldives-romance-3n",
        title: "Maldives: Luxury Water Villa",
        duration: "3 Nights / 4 Days",
        destination: "Maldives",
        route: "Male Atoll",
        price: 95000,
        description: "Stay in an overwater villa. Turquoise lagoons and white sands. The ultimate honeymoon.",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1600&auto=format&fit=crop",
        itinerary: [
            { day: 1, port: "Maldives", activity: "Arrival. Speedboat transfer to resort. Check-in to Water Villa." },
            { day: 2, port: "Maldives", activity: "Day at leisure. Snorkeling and water sports." },
            { day: 3, port: "Maldives", activity: "Sunset Dolphin Cruise. Candlelight Dinner." },
            { day: 4, port: "Maldives", activity: "Departure." }
        ],
        inclusions: ["Water Villa Stay", "All Meals (Full Board)", "Green Tax", "Speedboat Transfers"],
        shows: ["Live Band", "Crab Racing"],
        ship: "Flight Included",
        safetyOptions: ["Resort Doctor", "Isolated Island Safe Zone"],
        otherDetails: "Alcohol is only allowed in resort islands."
    },
    {
        id: "vietnam-explorer-6n",
        title: "Vietnam: Hanoi, Halong & Ho Chi Minh",
        duration: "6 Nights / 7 Days",
        destination: "Vietnam",
        route: "Hanoi → Halong Bay → Ho Chi Minh",
        price: 68000,
        description: "Cruise Halong Bay, explore the history of Hanoi, and the bustle of Saigon.",
        image: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1600&auto=format&fit=crop",
        itinerary: [
            { day: 1, port: "Hanoi", activity: "Arrival in Hanoi. Rickshaw tour of Old Quarter." },
            { day: 2, port: "Halong Bay", activity: "Transfer to Halong Bay. Overnight Cruise." },
            { day: 3, port: "Hanoi", activity: "Morning Tai Chi on deck. Return to Hanoi. Fly to Ho Chi Minh." },
            { day: 4, port: "Ho Chi Minh", activity: "Cu Chi Tunnels tour." },
            { day: 5, port: "Mekong Delta", activity: "Full day Trip to Mekong Delta." },
            { day: 6, port: "Ho Chi Minh", activity: "War Remnants Museum and Shopping." },
            { day: 7, port: "Ho Chi Minh", activity: "Departure." }
        ],
        inclusions: ["4 Star Hotels", "Halong Bay Cruise", "Domestic Flights", "Visa Approval Letter"],
        shows: ["Water Puppet Show", "Cooking Class"],
        ship: "Flight Included",
        safetyOptions: ["Verified Guides", "Sanitized Transport"],
        otherDetails: "E-Visa required before travel."
    },
    {
        id: "himachal-adventure-5n",
        title: "Himachal: Shimla & Manali",
        duration: "5 Nights / 6 Days",
        destination: "Himachal",
        route: "Shimla → Manali → Chandigarh",
        price: 24000,
        description: "Mountain views, pine forests, and colonial charm. A classic Himalayan road trip.",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1600&auto=format&fit=crop",
        itinerary: [
            { day: 1, port: "Shimla", activity: "Drive from Chandigarh to Shimla. Mall Road walk." },
            { day: 2, port: "Shimla", activity: "Kufri excursion. Jakhu Temple." },
            { day: 3, port: "Manali", activity: "Scenic drive to Manali via Kullu. Shawl factory visit." },
            { day: 4, port: "Manali", activity: "Solang Valley adventure sports. Hadimba Temple." },
            { day: 5, port: "Manali", activity: "Atal Tunnel and Sissu Village excursion." },
            { day: 6, port: "Chandigarh", activity: "Drive back to Chandigarh/Delhi." }
        ],
        inclusions: ["3 Star Hotels", "Breakfast & Dinner", "Private Cab", "Sightseeing"],
        shows: ["Bonfire Music", "Local Folk Dance"],
        ship: "Private Vehicle",
        safetyOptions: ["Hill Expert Drivers", "First Aid Kit in Cab"],
        otherDetails: "Carry heavy woolens in winter."
    },
    {
        id: "japan-cherry-blossom-6n",
        title: "Japan: Tokyo & Kyoto",
        duration: "6 Nights / 7 Days",
        destination: "Japan",
        route: "Tokyo → Kyoto → Osaka",
        price: 185000,
        description: "Witness the Cherry Blossoms. Futuristic technology meets ancient tradition.",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1600&auto=format&fit=crop",
        itinerary: [
            { day: 1, port: "Tokyo", activity: "Arrival. Shibuya Crossing and Shinjuku." },
            { day: 2, port: "Tokyo", activity: "Senso-ji Temple and TeamLabs Planets." },
            { day: 3, port: "Kyoto", activity: "Bullet Train to Kyoto. Fushimi Inari Shrine." },
            { day: 4, port: "Kyoto", activity: "Arashiyama Bamboo Grove and Kinkaku-ji." },
            { day: 5, port: "Osaka", activity: "Transfer to Osaka. Dotonbori food tour." },
            { day: 6, port: "Osaka", activity: "Universal Studios Japan (Super Nintendo World)." },
            { day: 7, port: "Osaka", activity: "Departure from Kansai Airport." }
        ],
        inclusions: ["4 Star Hotels", "JR Pass (7 Days)", "Breakfast", "Visa Assistance"],
        shows: ["Tea Ceremony", "Geisha Performance"],
        ship: "Flight Included",
        safetyOptions: ["High Hygiene Standards", "Insurance"],
        otherDetails: "Japan Visa processing takes 10-15 working days."
    },
    {
        id: "europe-paris-swiss-7n",
        title: "European Dream: Paris & Swiss",
        duration: "7 Nights / 8 Days",
        destination: "Europe",
        route: "Paris → Zurich → Lucerne",
        price: 195000,
        description: "Eiffel Tower, Swiss Alps, and scenic trains. The classic European holiday.",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1600&auto=format&fit=crop",
        itinerary: [
            { day: 1, port: "Paris", activity: "Arrival. Seine River Cruise." },
            { day: 2, port: "Paris", activity: "Eiffel Tower (2nd Level) and Louvre Museum." },
            { day: 3, port: "Paris", activity: "Disney Land Paris (One Day 2 Parks)." },
            { day: 4, port: "Switzerland", activity: "TGV Train to Zurich. Transfer to Lucerne." },
            { day: 5, port: "Lucerne", activity: "Mt. Titlis Tour with Ice Flyer." },
            { day: 6, port: "Interlaken", activity: "Day trip to Interlaken via scenic train." },
            { day: 7, port: "Zurich", activity: "Zurich City Tour and Rhine Falls." },
            { day: 8, port: "Zurich", activity: "Departure." }
        ],
        inclusions: ["4 Star Hotels", "Daily Breakfast", "Internal Trains", "Schengen Visa Assist"],
        shows: ["Moulin Rouge (Optional)", "Swiss Folklore"],
        ship: "Flight Included",
        safetyOptions: ["Verified Euro Standard", "24/7 Helpline"],
        otherDetails: "Schengen Visa requires personal appearance for biometrics."
    },
    {
        id: "bhutan-himalaya-5n",
        title: "Bhutan: Land of Thunder Dragon",
        duration: "5 Nights / 6 Days",
        destination: "Bhutan",
        route: "Paro → Thimphu → Punakha",
        price: 42000,
        description: "Exclusive journey to the happiest country. Monasteries and mountains.",
        image: "https://images.unsplash.com/photo-1608659377506-3b4fec4f7634?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEJodXRhbnxlbnwwfHwwfHx8MA%3D%3D",
        itinerary: [
            { day: 1, port: "Paro", activity: "Arrival. Transfer to Thimphu. Buddha Dordenma." },
            { day: 2, port: "Thimphu", activity: "Full day sightseeing. Motithang Takin Preserve." },
            { day: 3, port: "Punakha", activity: "Drive to Punakha via Dochula Pass." },
            { day: 4, port: "Paro", activity: "Return to Paro. National Museum." },
            { day: 5, port: "Paro", activity: "Hike to Tiger's Nest Monastery." },
            { day: 6, port: "Paro", activity: "Departure." }
        ],
        inclusions: ["3 Star Hotels", "All Meals", "SDF (Daily Fee) Included", "Guide"],
        shows: ["Archery Demonstration", "Mask Dance"],
        ship: "Flight Included",
        safetyOptions: ["Eco-Tourism", "Certified Guides"],
        otherDetails: "Permit required for entry."
    },
    {
        id: "andaman-pure-5n",
        title: "Andaman: Beach Paradise",
        duration: "5 Nights / 6 Days",
        destination: "Andaman",
        route: "Port Blair → Havelock → Neil",
        price: 36000,
        description: "Radhanagar Beach, Elephant Beach, and Cellular Jail history.",
        image: "https://images.unsplash.com/photo-1538826421747-8fc0690ae387?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFuZGFtYW58ZW58MHx8MHx8fDA%3D",
        itinerary: [
            { day: 1, port: "Port Blair", activity: "Arrival. Cellular Jail Light & Sound Show." },
            { day: 2, port: "Havelock", activity: "Ferry to Havelock. Radhanagar Beach sunset." },
            { day: 3, port: "Havelock", activity: "Elephant Beach water sports (Snorkeling)." },
            { day: 4, port: "Neil Island", activity: "Transfer to Neil. Laxmanpur Beach." },
            { day: 5, port: "Port Blair", activity: "Return to Port Blair. Shopping." },
            { day: 6, port: "Port Blair", activity: "Departure." }
        ],
        inclusions: ["3 Star Hotels", "Breakfast", "Ferry Tickets (Makruzz)", "Airport Transfers"],
        shows: ["Light & Sound Show"],
        ship: "Flight Included",
        safetyOptions: ["Sanitized Ferries", "Life Jackets Mandatory"],
        otherDetails: "Ferry timings are subject to weather."
    },
    {
        id: "sri-lanka-ramayana-5n",
        title: "Sri Lanka: Ramayana Trail",
        duration: "5 Nights / 6 Days",
        destination: "Sri Lanka",
        route: "Colombo → Kandy → Nuwara Eliya",
        price: 38000,
        description: "Tracing the epic Ramayana. Sita Amman Temple, Ashok Vatika and beautiful tea gardens.",
        image: "https://images.unsplash.com/photo-1534353739409-c61daeb03f61?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3JpJTIwbGFua2ElMjB0b3VyaXNtfGVufDB8fDB8fHww",
        itinerary: [
            { day: 1, port: "Kandy", activity: "Arrival in Colombo. Transfer to Kandy. Pinnawala Elephant Orphanage." },
            { day: 2, port: "Kandy", activity: "Temple of Tooth Relic. Kandy Lake." },
            { day: 3, port: "Nuwara Eliya", activity: "Drive to Nuwara Eliya. Tea Factory. Sita Amman Temple." },
            { day: 4, port: "Bentota", activity: "Transfer to Bentota beach. Madu River Safari." },
            { day: 5, port: "Colombo", activity: "City tour of Colombo. Shopping." },
            { day: 6, port: "Colombo", activity: "Departure." }
        ],
        inclusions: ["4 Star Hotels", "Daily Breakfast & Dinner", "AC Vehicle", "Visa"],
        shows: ["Kandyan Dance"],
        ship: "Flight Included",
        safetyOptions: ["Tourist Friendly Police", "Certified Hotels"],
        otherDetails: "ETA required for entry."
    },
    {
        id: "nepal-nature-4n",
        title: "Nepal: Kathmandu & Pokhara",
        duration: "4 Nights / 5 Days",
        destination: "Nepal",
        route: "Kathmandu → Pokhara",
        price: 28000,
        description: "Himalayan views, temples, and lakes. Pashupatinath and Davis Falls.",
        image: "https://images.unsplash.com/photo-1611516491426-03025e6043c8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmVwYWx8ZW58MHx8MHx8fDA%3D",
        itinerary: [
            { day: 1, port: "Kathmandu", activity: "Arrival. Pashupatinath Aarti." },
            { day: 2, port: "Pokhara", activity: "Drive to Pokhara (6 hours). Lakeside walk." },
            { day: 3, port: "Pokhara", activity: "Sarangkot sunrise. Davis Fall. Boat ride on Phewa Lake." },
            { day: 4, port: "Kathmandu", activity: "Drive back to Kathmandu. Swayambhunath Stupa." },
            { day: 5, port: "Kathmandu", activity: "Departure." }
        ],
        inclusions: ["3 Star Hotels", "Breakfast", "Private Vehicle", "Sightseeing"],
        shows: ["Tharu Cultural Show"],
        ship: "Flight Included",
        safetyOptions: ["Mountain Safety", "Sanitized Cars"],
        otherDetails: "Indian nationals can use Voter ID for entry."
    }
];
