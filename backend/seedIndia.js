import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Package from './models/Package.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/e2f-holidays';

const indiaPackages = [
    {
        id: "kerala-backwaters-delight",
        title: "Kerala Backwaters Delight",
        category: "tour",
        duration: "5 Nights / 6 Days",
        destination: "Kerala, India",
        route: "Kochi → Munnar → Thekkady → Alleppey",
        price: 25000,
        description: "Experience the magic of Kerala with its serene backwaters, lush tea gardens, and rich culture. A perfect getaway for nature lovers.",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        itinerary: [
            { day: 1, port: "Kochi", activity: "Arrival at Kochi airport. Transfer to hotel. Evening Kathakali performance." },
            { day: 2, port: "Munnar", activity: "Drive to Munnar. Visit tea plantations and Cheeyappara Waterfalls." },
            { day: 3, port: "Munnar", activity: "Sightseeing in Munnar: Eravikulam National Park and Mattupetty Dam." },
            { day: 4, port: "Thekkady", activity: "Drive to Thekkady. Enjoy a boat ride in Periyar Wildlife Sanctuary." },
            { day: 5, port: "Alleppey", activity: "Transfer to Alleppey. Check into a traditional houseboat for an overnight backwater cruise." },
            { day: 6, port: "Kochi", activity: "Disembark and transfer to Kochi airport for departure." }
        ],
        inclusions: ["5 Nights Accommodation", "Daily Breakfast & Dinner", "AC Houseboat Stay", "Private Cab for transfers", "Local Sightseeing"],
        shows: ["Kathakali Dance Show", "Spice Plantation Tour"],
        ship: "Premium Cab & Houseboat",
        otherDetails: "Entry fees to monuments not included in the standard package."
    },
    {
        id: "rajasthan-royal-heritage",
        title: "Rajasthan Royal Heritage",
        category: "tour",
        duration: "7 Nights / 8 Days",
        destination: "Rajasthan, India",
        route: "Jaipur → Jodhpur → Udaipur",
        price: 32000,
        description: "Step into the land of Kings. Explore majestic forts, grand palaces, and vibrant markets of Rajasthan.",
        image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        itinerary: [
            { day: 1, port: "Jaipur", activity: "Arrive in Jaipur. Check-in and relax. Evening at Chokhi Dhani." },
            { day: 2, port: "Jaipur", activity: "Full day sightseeing: Amber Fort, Hawa Mahal, City Palace." },
            { day: 3, port: "Jodhpur", activity: "Drive to Jodhpur. Visit Mehrangarh Fort and Jaswant Thada." },
            { day: 4, port: "Jodhpur", activity: "Explore the Blue City streets and Umaid Bhawan Palace Museum." },
            { day: 5, port: "Udaipur", activity: "Drive to Udaipur via Ranakpur Jain Temples." },
            { day: 6, port: "Udaipur", activity: "Sightseeing: City Palace, Jagdish Temple, Boat ride on Lake Pichola." },
            { day: 7, port: "Udaipur", activity: "Leisure day for shopping and exploring local markets." },
            { day: 8, port: "Udaipur", activity: "Transfer to airport for departure." }
        ],
        inclusions: ["7 Nights 4-Star Stay", "Daily Breakfast", "AC Innova for Sightseeing", "English Speaking Guide"],
        shows: ["Cultural show at Chokhi Dhani", "Lake Pichola Boat Ride"],
        ship: "Luxury SUV",
        otherDetails: "Camera fees at monuments are extra."
    },
    {
        id: "goa-beach-paradise",
        title: "Goa Beach Paradise",
        category: "tour",
        duration: "4 Nights / 5 Days",
        destination: "Goa, India",
        route: "North Goa → South Goa",
        price: 18000,
        description: "Relax on the sun-kissed beaches of Goa. Enjoy vibrant nightlife, Portuguese architecture, and thrilling water sports.",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        itinerary: [
            { day: 1, port: "North Goa", activity: "Arrival. Transfer to hotel. Evening relax at Baga Beach." },
            { day: 2, port: "North Goa", activity: "Visit Aguada Fort, Anjuna Beach, and Vagator Beach." },
            { day: 3, port: "South Goa", activity: "Drive to South Goa. Visit Mangueshi Temple and Old Goa Churches." },
            { day: 4, port: "South Goa", activity: "Relax at Palolem Beach. Evening Mandovi River Cruise." },
            { day: 5, port: "Goa Airport", activity: "Departure transfer." }
        ],
        inclusions: ["4 Nights Resort Stay", "Breakfast & Dinner", "Airport Transfers", "River Cruise Ticket"],
        shows: ["Mandovi River Cruise"],
        ship: "Private AC Cab",
        otherDetails: "Water sports are not included in the package cost."
    },
    {
        id: "kashmir-heaven-on-earth",
        title: "Kashmir: Heaven on Earth",
        category: "tour",
        duration: "5 Nights / 6 Days",
        destination: "Kashmir, India",
        route: "Srinagar → Gulmarg → Pahalgam",
        price: 28000,
        description: "Witness the unparalleled beauty of Kashmir. Shikara rides, snow-capped peaks, and blooming gardens await.",
        image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        itinerary: [
            { day: 1, port: "Srinagar", activity: "Arrive in Srinagar. Shikara ride on Dal Lake. Overnight in Houseboat." },
            { day: 2, port: "Gulmarg", activity: "Day trip to Gulmarg. Enjoy the Gondola ride." },
            { day: 3, port: "Pahalgam", activity: "Drive to Pahalgam. Visit Saffron fields and Avantipura Ruins." },
            { day: 4, port: "Pahalgam", activity: "Explore Betaab Valley and Aru Valley." },
            { day: 5, port: "Srinagar", activity: "Return to Srinagar. Visit Mughal Gardens (Shalimar & Nishat)." },
            { day: 6, port: "Srinagar Airport", activity: "Departure." }
        ],
        inclusions: ["1 Night Houseboat", "4 Nights Hotel", "Breakfast & Dinner", "Shikara Ride", "All Transfers"],
        shows: ["Gondola Ride (Phase 1)", "Shikara Ride"],
        ship: "Comfortable SUV",
        otherDetails: "Gondola Phase 2 tickets subject to availability."
    },
    {
        id: "golden-triangle-tour",
        title: "Golden Triangle Tour",
        category: "tour",
        duration: "5 Nights / 6 Days",
        destination: "North India",
        route: "Delhi → Agra → Jaipur",
        price: 22000,
        description: "Explore the most popular tourist circuit in India. History, culture, and the magnificent Taj Mahal.",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        itinerary: [
            { day: 1, port: "Delhi", activity: "Arrival. Visit Qutub Minar, India Gate, and Lotus Temple." },
            { day: 2, port: "Agra", activity: "Drive to Agra. Visit Agra Fort and local markets." },
            { day: 3, port: "Agra", activity: "Sunrise visit to Taj Mahal. Later drive to Jaipur via Fatehpur Sikri." },
            { day: 4, port: "Jaipur", activity: "Visit Amber Fort, City Palace, and Jantar Mantar." },
            { day: 5, port: "Jaipur", activity: "Local shopping and leisure time." },
            { day: 6, port: "Delhi", activity: "Return drive to Delhi for departure." }
        ],
        inclusions: ["5 Nights Accommodation", "Daily Breakfast", "AC Vehicle for full tour", "English Speaking Guide"],
        shows: ["Taj Mahal Sunrise Tour"],
        ship: "Luxury Sedan",
        otherDetails: "Taj Mahal remains closed on Fridays."
    },
    {
        id: "andaman-islands-escape",
        title: "Andaman Islands Escape",
        category: "tour",
        duration: "6 Nights / 7 Days",
        destination: "Andaman & Nicobar, India",
        route: "Port Blair → Havelock → Neil Island",
        price: 35000,
        description: "Pristine beaches, crystal clear waters, and historical monuments. A perfect tropical island getaway.",
        image: "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        itinerary: [
            { day: 1, port: "Port Blair", activity: "Arrival. Visit Cellular Jail and attend Light & Sound Show." },
            { day: 2, port: "Havelock", activity: "Ferry to Havelock Island. Relax at Radhanagar Beach." },
            { day: 3, port: "Havelock", activity: "Excursion to Elephant Beach for water sports/snorkeling." },
            { day: 4, port: "Neil Island", activity: "Ferry to Neil Island. Visit Bharatpur and Laxmanpur beaches." },
            { day: 5, port: "Neil Island", activity: "Visit Natural Rock Formation." },
            { day: 6, port: "Port Blair", activity: "Return ferry to Port Blair. Shopping at Sagarika Emporium." },
            { day: 7, port: "Port Blair", activity: "Departure." }
        ],
        inclusions: ["6 Nights Stay", "Breakfast & Dinner", "Private Ferry Tickets", "Airport Pick/Drop"],
        shows: ["Cellular Jail Light & Sound Show"],
        ship: "Private Ferry & Cab",
        otherDetails: "Water sports (Scuba/Sea Walk) at extra cost."
    },
    {
        id: "himachal-mountain-bliss",
        title: "Himachal Mountain Bliss",
        category: "tour",
        duration: "6 Nights / 7 Days",
        destination: "Himachal Pradesh, India",
        route: "Shimla → Manali",
        price: 26000,
        description: "Cool off in the majestic Himalayas. Enjoy scenic drives, snow points, and beautiful valleys.",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        itinerary: [
            { day: 1, port: "Shimla", activity: "Drive from Chandigarh/Delhi to Shimla. Evening at Mall Road." },
            { day: 2, port: "Shimla", activity: "Excursion to Kufri and Jakhoo Temple." },
            { day: 3, port: "Manali", activity: "Drive to Manali via Kullu Valley. Visit shawl factories." },
            { day: 4, port: "Manali", activity: "Local sightseeing: Hadimba Temple, Vashisht Hot Springs." },
            { day: 5, port: "Manali", activity: "Excursion to Solang Valley / Rohtang Pass (subject to permit)." },
            { day: 6, port: "Manali", activity: "Leisure day. Explore Old Manali cafes." },
            { day: 7, port: "Departure", activity: "Drive back for onward journey." }
        ],
        inclusions: ["6 Nights Stay", "MAP Meal Plan", "Private AC Cab"],
        shows: ["Solang Valley Adventure"],
        ship: "Mountain SUV",
        otherDetails: "Rohtang Pass permit fee is extra and subject to NGT rules."
    },
    {
        id: "meghalaya-living-roots",
        title: "Meghalaya Living Roots",
        category: "tour",
        duration: "4 Nights / 5 Days",
        destination: "Meghalaya, India",
        route: "Guwahati → Shillong → Cherrapunji",
        price: 24000,
        description: "Explore the abode of clouds. Waterfalls, caves, and the incredible living root bridges.",
        image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        itinerary: [
            { day: 1, port: "Shillong", activity: "Arrive at Guwahati. Drive to Shillong via Umiam Lake." },
            { day: 2, port: "Cherrapunji", activity: "Drive to Cherrapunji. Visit Elephant Falls and Mawkdok Dympep Valley." },
            { day: 3, port: "Cherrapunji", activity: "Nohkalikai Falls, Seven Sisters Falls, and Mawsmai Cave." },
            { day: 4, port: "Shillong", activity: "Trek to Double Decker Living Root Bridge. Return to Shillong." },
            { day: 5, port: "Guwahati", activity: "Transfer to Guwahati airport/station." }
        ],
        inclusions: ["4 Nights Hotel Stay", "Breakfast", "Dedicated Cab", "Inner Line Permits"],
        shows: ["Root Bridge Trek", "Cave Explorations"],
        ship: "Comfortable Cab",
        otherDetails: "Trekking to root bridges requires physical fitness."
    },
    {
        id: "spiritual-varanasi-ayodhya",
        title: "Spiritual Varanasi & Ayodhya",
        category: "tour",
        duration: "3 Nights / 4 Days",
        destination: "Uttar Pradesh, India",
        route: "Varanasi → Ayodhya",
        price: 15000,
        description: "A deeply spiritual journey through India's holiest cities. Witness the Ganga Aarti and the magnificent Ram Mandir.",
        image: "https://images.unsplash.com/photo-1561359313-0639aad49ca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        itinerary: [
            { day: 1, port: "Varanasi", activity: "Arrival. Evening mesmerising Ganga Aarti at Dashashwamedh Ghat." },
            { day: 2, port: "Varanasi", activity: "Early morning boat ride. Kashi Vishwanath Temple Darshan. Sarnath visit." },
            { day: 3, port: "Ayodhya", activity: "Drive to Ayodhya. Visit Ram Janmabhoomi, Hanuman Garhi, and Saryu River Ghats." },
            { day: 4, port: "Departure", activity: "Return to Varanasi/Lucknow for departure." }
        ],
        inclusions: ["3 Nights Hotel", "Breakfast", "AC Cab for all transfers", "Boat Ride in Ganga"],
        shows: ["Ganga Aarti", "Saryu Aarti"],
        ship: "Premium Sedan",
        otherDetails: "VIP Darshan tickets are not included."
    },
    {
        id: "darjeeling-gangtok-delight",
        title: "Darjeeling & Gangtok Delight",
        category: "tour",
        duration: "5 Nights / 6 Days",
        destination: "Sikkim & West Bengal, India",
        route: "Darjeeling → Gangtok",
        price: 27000,
        description: "Experience the charm of the Northeast. Tea gardens, toy trains, and majestic views of Mt. Kanchenjunga.",
        image: "https://images.unsplash.com/photo-1544085311-11a028465b03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        itinerary: [
            { day: 1, port: "Darjeeling", activity: "Arrive at NJP/Bagdogra. Transfer to Darjeeling. Evening free at Mall Road." },
            { day: 2, port: "Darjeeling", activity: "Tiger Hill sunrise. Visit Batasia Loop, Ghoom Monastery, and Tea Estate." },
            { day: 3, port: "Gangtok", activity: "Drive to Gangtok. Evening stroll at MG Marg." },
            { day: 4, port: "Gangtok", activity: "Excursion to Tsomgo Lake and Baba Mandir." },
            { day: 5, port: "Gangtok", activity: "Gangtok local sightseeing: Rumtek Monastery, Do Drul Chorten." },
            { day: 6, port: "Departure", activity: "Transfer to airport/station for onward journey." }
        ],
        inclusions: ["5 Nights Accommodation", "Breakfast & Dinner", "Exclusive Non-AC Cab (Hilly terrain)"],
        shows: ["Tiger Hill Sunrise View"],
        ship: "Mountain Cab",
        otherDetails: "Nathu La Pass visit is subject to permit availability and extra cost."
    }
];

const seedIndiaPackages = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        // Upsert packages
        for (const pkg of indiaPackages) {
            await Package.findOneAndUpdate(
                { id: pkg.id },
                pkg,
                { upsert: true, new: true }
            );
        }
        
        console.log(`Successfully seeded ${indiaPackages.length} Indian packages!`);
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedIndiaPackages();
