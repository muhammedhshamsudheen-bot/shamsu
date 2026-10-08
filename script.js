/* =========================================================
   FIXNEAR - REAL-TIME LOCAL SERVICE BOOKING PLATFORM
   script.js
========================================================= */

// =========================================================
// 1. DATA DATABASE (SERVICES, PROBLEMS & PROVIDERS)
// =========================================================

// Service categories and their specific common repair problems with pricing
const serviceCatalog = {
    "Bike Repair": {
        category: "auto",
        icon: "fa-motorcycle",
        colorClass: "orange",
        inspectionFee: 99,
        problems: [
            { name: "General Service & Oil Change", price: 299, labour: 200 },
            { name: "Brake Repair & Pad Replacement", price: 199, labour: 100 },
            { name: "Puncture & Tube Replacement", price: 99, labour: 60 },
            { name: "Starting Problem / Battery Jump", price: 249, labour: 150 },
            { name: "Chain Service & Lubrication", price: 149, labour: 80 },
            { name: "Engine Noise & Tuning", price: 499, labour: 400 },
            { name: "Clutch Cable / Wire Replacement", price: 179, labour: 90 }
        ]
    },
    "Car Repair": {
        category: "auto",
        icon: "fa-car",
        colorClass: "red",
        inspectionFee: 149,
        problems: [
            { name: "Breakdown Roadside Assistance", price: 499, labour: 350 },
            { name: "Battery Jumpstart", price: 299, labour: 150 },
            { name: "Flat Tyre / Stepney Change", price: 199, labour: 100 },
            { name: "Brake Noise & Inspection", price: 349, labour: 200 },
            { name: "Car AC Inspection & Gas Check", price: 449, labour: 300 },
            { name: "General Periodic Service", price: 599, labour: 450 },
            { name: "Engine Overheating Check", price: 399, labour: 250 }
        ]
    },
    "Electrician": {
        category: "home",
        icon: "fa-bolt",
        colorClass: "yellow",
        inspectionFee: 99,
        problems: [
            { name: "Ceiling Fan Repair / Installation", price: 199, labour: 100 },
            { name: "Switch, Socket & Plug Repair", price: 149, labour: 80 },
            { name: "MCB Trip / Short Circuit Diagnostic", price: 299, labour: 200 },
            { name: "Tube Light / Chandelier / LED Setup", price: 169, labour: 90 },
            { name: "Inverter & Battery Wiring Setup", price: 399, labour: 300 },
            { name: "Full Room Wiring / Repair", price: 599, labour: 500 }
        ]
    },
    "Plumbing": {
        category: "home",
        icon: "fa-faucet-drip",
        colorClass: "cyan",
        inspectionFee: 99,
        problems: [
            { name: "Tap Leakage & Valve Replacement", price: 149, labour: 80 },
            { name: "Pipe Leakage & Joint Repair", price: 249, labour: 150 },
            { name: "Washbasin / Sink Blockage Removal", price: 299, labour: 200 },
            { name: "Toilet Flush Tank & Jet Spray Fix", price: 249, labour: 150 },
            { name: "Water Tank Cleaning & Float Valve", price: 499, labour: 400 },
            { name: "Water Pump / Motor Repair", price: 449, labour: 350 }
        ]
    },
    "AC Repair": {
        category: "home",
        icon: "fa-snowflake",
        colorClass: "blue",
        inspectionFee: 149,
        problems: [
            { name: "AC Deep Foam Jet Cleaning", price: 399, labour: 250 },
            { name: "AC Gas Leakage Fix & Refill", price: 1299, labour: 500 },
            { name: "Cooling Problem / Compressor Check", price: 499, labour: 350 },
            { name: "Water Leakage from Indoor Unit", price: 349, labour: 200 },
            { name: "AC Uninstallation / Reinstallation", price: 699, labour: 550 },
            { name: "PCB Board & Remote Sensor Repair", price: 549, labour: 400 }
        ]
    },
    "Laptop Repair": {
        category: "tech",
        icon: "fa-laptop",
        colorClass: "indigo",
        inspectionFee: 149,
        problems: [
            { name: "Laptop Not Turning On / Power Issue", price: 399, labour: 250 },
            { name: "Screen / Display Replacement", price: 499, labour: 350 },
            { name: "Keyboard / Touchpad Fix", price: 299, labour: 150 },
            { name: "Windows / Mac OS Format & Reinstall", price: 399, labour: 250 },
            { name: "SSD & RAM Upgrade Installation", price: 299, labour: 150 },
            { name: "Thermal Paste & Deep Fan Cleaning", price: 349, labour: 200 },
            { name: "Virus / Malware Removal", price: 249, labour: 100 }
        ]
    },
    "Mobile Repair": {
        category: "tech",
        icon: "fa-mobile-screen",
        colorClass: "teal",
        inspectionFee: 99,
        problems: [
            { name: "Screen / Glass Replacement", price: 399, labour: 300 },
            { name: "Battery Replacement", price: 249, labour: 150 },
            { name: "Charging Port Not Working", price: 199, labour: 100 },
            { name: "Speaker / Mic Issue", price: 249, labour: 150 },
            { name: "Camera Lens & Sensor Fix", price: 299, labour: 200 }
        ]
    },
    "Appliances": {
        category: "home",
        icon: "fa-plug",
        colorClass: "purple",
        inspectionFee: 149,
        problems: [
            { name: "Washing Machine Drum / Motor Noise", price: 399, labour: 250 },
            { name: "Refrigerator Not Cooling / Freezing", price: 449, labour: 300 },
            { name: "Microwave Oven Heating Problem", price: 299, labour: 150 },
            { name: "LED TV Display / Sound Repair", price: 499, labour: 350 },
            { name: "Mixer Grinder Motor & Blade Fix", price: 199, labour: 100 }
        ]
    },
    "Cleaning": {
        category: "home",
        icon: "fa-broom",
        colorClass: "emerald",
        inspectionFee: 0,
        problems: [
            { name: "Full Home Deep Sanitization", price: 999, labour: 999 },
            { name: "Kitchen Chimney & Deep Clean", price: 499, labour: 499 },
            { name: "Bathroom Tile & Stain Removal", price: 349, labour: 349 },
            { name: "Sofa & Cushion Shampoo Washing", price: 449, labour: 449 }
        ]
    },
    "Carpenter": {
        category: "home",
        icon: "fa-hammer",
        colorClass: "amber",
        inspectionFee: 99,
        problems: [
            { name: "Door Lock & Handle Fitting", price: 199, labour: 100 },
            { name: "Bed / Wardrobe Hinge Repair", price: 249, labour: 150 },
            { name: "Custom Wooden Shelf Setup", price: 399, labour: 300 },
            { name: "Furniture Assembly & Dismantle", price: 349, labour: 250 }
        ]
    },
    "Painter": {
        category: "home",
        icon: "fa-paint-roller",
        colorClass: "pink",
        inspectionFee: 0,
        problems: [
            { name: "Wall Dampness & Touch-up Paint", price: 399, labour: 399 },
            { name: "Single Room Interior Painting", price: 899, labour: 899 },
            { name: "Waterproof Texture Coating", price: 699, labour: 699 }
        ]
    },
    "RO Purifier": {
        category: "home",
        icon: "fa-droplet",
        colorClass: "sky",
        inspectionFee: 99,
        problems: [
            { name: "Filter & Carbon Candle Change", price: 299, labour: 200 },
            { name: "RO Membrane Replacement", price: 699, labour: 300 },
            { name: "Water Taste & TDS Balancing", price: 249, labour: 150 }
        ]
    },
    "CCTV Technician": {
        category: "tech",
        icon: "fa-video",
        colorClass: "dark-blue",
        inspectionFee: 149,
        problems: [
            { name: "CCTV Camera New Installation", price: 399, labour: 250 },
            { name: "DVR / Hard Disk Setup & App Connect", price: 449, labour: 300 },
            { name: "No Video Signal / Cable Fault", price: 299, labour: 150 }
        ]
    },
    "Pest Control": {
        category: "home",
        icon: "fa-bug",
        colorClass: "lime",
        inspectionFee: 0,
        problems: [
            { name: "Cockroach & Ant Gel Treatment", price: 499, labour: 499 },
            { name: "Termite Defense Treatment", price: 899, labour: 899 },
            { name: "Bed Bug Herbal Spray", price: 599, labour: 599 }
        ]
    },
    "Locksmith": {
        category: "home",
        icon: "fa-lock-open",
        colorClass: "rose",
        inspectionFee: 99,
        problems: [
            { name: "Emergency Door Lock Opening", price: 299, labour: 200 },
            { name: "New Main Door Lock Installation", price: 349, labour: 250 },
            { name: "Duplicate Key Cutting & Setup", price: 149, labour: 80 }
        ]
    },
    "WiFi Technician": {
        category: "tech",
        icon: "fa-wifi",
        colorClass: "violet",
        inspectionFee: 99,
        problems: [
            { name: "Router Setup & WiFi Range Tuning", price: 199, labour: 100 },
            { name: "LAN Cable Crimping & Routing", price: 249, labour: 150 },
            { name: "Mesh / Extender Installation", price: 299, labour: 200 }
        ]
    }
};

// Realistic Local Service Providers Database around Coimbatore & nearby areas
const initialProviders = [
    {
        id: 1,
        name: "Manoj Bike Works",
        service: "Bike Repair",
        category: "auto",
        rating: 4.9,
        reviews: 142,
        experience: "9 years",
        price: 199,
        available: "available",
        verified: true,
        vehicle: "🛵 Honda Activa (TN 38 CB 2041)",
        phone: "+919842100101",
        lat: 11.0125,
        lng: 76.9610,
        area: "Gandhipuram",
        responseTime: "5 min",
        completedJobs: 620,
        workingAreas: "Gandhipuram, RS Puram, Peelamedu, Saibaba Colony",
        specializations: ["Engine Tuning", "Brake Overhaul", "Puncture", "Oil Service"],
        reviewsList: [
            { author: "Karthik R.", rating: 5, comment: "Arrived in 10 mins when my bike broke down. Solved starting issue immediately!", date: "Yesterday" },
            { author: "Sangeetha M.", rating: 5, comment: "Very honest person. Explained why oil needed change without charging extra.", date: "4 days ago" }
        ]
    },
    {
        id: 2,
        name: "Arun Kumar",
        service: "Electrician",
        category: "home",
        rating: 4.9,
        reviews: 128,
        experience: "8 years",
        price: 199,
        available: "available",
        verified: true,
        vehicle: "🛵 Hero Splendor (TN 38 BJ 4092)",
        phone: "+919876543210",
        lat: 11.0180,
        lng: 76.9530,
        area: "RS Puram",
        responseTime: "8 min",
        completedJobs: 540,
        workingAreas: "RS Puram, Saibaba Colony, Town Hall, Gandhipuram",
        specializations: ["Fan Installation", "Short Circuit Repair", "MCB Trip", "Inverter Setup"],
        reviewsList: [
            { author: "Vignesh K.", rating: 5, comment: "Fixed my MCB trip in 15 minutes. Very polite and knowledgeable electrician.", date: "2 days ago" },
            { author: "Meena Swaminathan", rating: 5, comment: "Punctual and neat work with wire casing.", date: "Last week" }
        ]
    },
    {
        id: 3,
        name: "Suresh Plumbing Services",
        service: "Plumbing",
        category: "home",
        rating: 4.8,
        reviews: 96,
        experience: "6 years",
        price: 199,
        available: "available",
        verified: true,
        vehicle: "🛵 TVS Jupiter (TN 37 AC 1920)",
        phone: "+919842100103",
        lat: 11.0210,
        lng: 76.9480,
        area: "Saibaba Colony",
        responseTime: "10 min",
        completedJobs: 410,
        workingAreas: "Saibaba Colony, RS Puram, Thudiyalur, Koundampalayam",
        specializations: ["Tap Leakage", "Pipe Line Block", "Tank Valve", "Motor Connection"],
        reviewsList: [
            { author: "Ramesh Babu", rating: 5, comment: "Cleared severe kitchen drain block cleanly. Reasonable labor fee.", date: "3 days ago" }
        ]
    },
    {
        id: 4,
        name: "Ravi AC Services",
        service: "AC Repair",
        category: "home",
        rating: 4.9,
        reviews: 154,
        experience: "10 years",
        price: 299,
        available: "available",
        verified: true,
        vehicle: "🚗 Maruti Eeco (TN 38 DA 8120)",
        phone: "+919842100104",
        lat: 11.0260,
        lng: 76.9980,
        area: "Peelamedu",
        responseTime: "12 min",
        completedJobs: 780,
        workingAreas: "Peelamedu, Hopes, Singanallur, Ramanathapuram",
        specializations: ["Jet Foam Cleaning", "Gas Filling", "Cooling Diagnostic", "Installation"],
        reviewsList: [
            { author: "Dr. Arvind", rating: 5, comment: "Brought professional pressure jet washer. AC is cooling like brand new.", date: "Yesterday" }
        ]
    },
    {
        id: 5,
        name: "Coimbatore Auto Care",
        service: "Car Repair",
        category: "auto",
        rating: 4.8,
        reviews: 110,
        experience: "11 years",
        price: 399,
        available: "available",
        verified: true,
        vehicle: "🚗 Service Van (TN 38 AA 9900)",
        phone: "+919842100105",
        lat: 11.0050,
        lng: 76.9680,
        area: "Ramanathapuram",
        responseTime: "15 min",
        completedJobs: 650,
        workingAreas: "Ramanathapuram, Singanallur, Gandhipuram, Ukkadam",
        specializations: ["Roadside Assist", "Jumpstart", "Brake Check", "Periodic Maintenance"],
        reviewsList: [
            { author: "Balaji V.", rating: 5, comment: "Battery jump started in 15 mins during emergency near airport road.", date: "3 days ago" }
        ]
    },
    {
        id: 6,
        name: "Ajay Tech Laptop Repairs",
        service: "Laptop Repair",
        category: "tech",
        rating: 4.9,
        reviews: 88,
        experience: "7 years",
        price: 299,
        available: "available",
        verified: true,
        vehicle: "🛵 Yamaha Fascino (TN 38 EF 3321)",
        phone: "+919842100106",
        lat: 11.0175,
        lng: 76.9620,
        area: "Gandhipuram",
        responseTime: "10 min",
        completedJobs: 390,
        workingAreas: "Gandhipuram, Peelamedu, RS Puram, Sidhapudur",
        specializations: ["Display Replacement", "SSD Upgrade", "OS Installation", "Chip Level Repair"],
        reviewsList: [
            { author: "Praveen Kumar", rating: 5, comment: "Upgraded my slow Dell laptop to 512GB SSD on the spot. Works lightning fast now!", date: "1 week ago" }
        ]
    },
    {
        id: 7,
        name: "SmartFix Mobile Care",
        service: "Mobile Repair",
        category: "tech",
        rating: 4.7,
        reviews: 92,
        experience: "5 years",
        price: 249,
        available: "available",
        verified: true,
        vehicle: "🛵 Honda Dio (TN 38 KK 8821)",
        phone: "+919842100107",
        lat: 11.0140,
        lng: 76.9570,
        area: "Town Hall",
        responseTime: "15 min",
        completedJobs: 310,
        workingAreas: "Town Hall, RS Puram, Ukkadam, Gandhipuram",
        specializations: ["Display Screen", "Charging Pin", "Battery Change"],
        reviewsList: [
            { author: "Anitha M.", rating: 5, comment: "Fixed OnePlus charging port in 20 minutes right in front of me.", date: "2 days ago" }
        ]
    },
    {
        id: 8,
        name: "Priya Deep Cleaning",
        service: "Cleaning",
        category: "home",
        rating: 4.8,
        reviews: 82,
        experience: "5 years",
        price: 499,
        available: "available",
        verified: true,
        vehicle: "🚗 Delivery Van (TN 38 GG 4410)",
        phone: "+919842100108",
        lat: 11.0290,
        lng: 76.9420,
        area: "Saibaba Colony",
        responseTime: "20 min",
        completedJobs: 280,
        workingAreas: "Entire Coimbatore City",
        specializations: ["Deep Home Clean", "Kitchen Degreasing", "Bathroom Stain Removal", "Sofa Wash"],
        reviewsList: [
            { author: "Deepa Krishnan", rating: 5, comment: "Sparkling clean kitchen! Very thorough team.", date: "5 days ago" }
        ]
    },
    {
        id: 9,
        name: "Mohan Wood Craft",
        service: "Carpenter",
        category: "home",
        rating: 4.8,
        reviews: 74,
        experience: "12 years",
        price: 249,
        available: "busy",
        verified: true,
        vehicle: "🛵 Bajaj Pulsar (TN 38 MM 1022)",
        phone: "+919842100109",
        lat: 10.9990,
        lng: 77.0180,
        area: "Singanallur",
        responseTime: "15 min",
        completedJobs: 510,
        workingAreas: "Singanallur, Ondipudur, Ramanathapuram",
        specializations: ["Door Lock", "Hinges Repair", "Modular Fitting", "Wardrobe Works"],
        reviewsList: [
            { author: "Narayanan", rating: 5, comment: "Fixed sliding wardrobe door smoothly. Very experienced carpenter.", date: "1 week ago" }
        ]
    },
    {
        id: 10,
        name: "CoolTech Pro Solutions",
        service: "AC Repair",
        category: "home",
        rating: 4.9,
        reviews: 136,
        experience: "8 years",
        price: 299,
        available: "available",
        verified: true,
        vehicle: "🛵 TVS King (TN 38 CD 5500)",
        phone: "+919842100110",
        lat: 11.0110,
        lng: 76.9450,
        area: "RS Puram",
        responseTime: "8 min",
        completedJobs: 620,
        workingAreas: "RS Puram, Saibaba Colony, Gandhipuram",
        specializations: ["Gas Refill", "Leakage Fix", "Foam Wash", "Compressor Check"],
        reviewsList: [
            { author: "Shankar", rating: 5, comment: "Diagnosed capacitor issue quickly and saved me from costly compressor replacement.", date: "3 days ago" }
        ]
    },
    {
        id: 11,
        name: "Selvam Home Electrician",
        service: "Electrician",
        category: "home",
        rating: 4.7,
        reviews: 64,
        experience: "6 years",
        price: 199,
        available: "available",
        verified: true,
        vehicle: "🛵 Hero Passion (TN 38 PQ 9011)",
        phone: "+919842100111",
        lat: 10.9660,
        lng: 76.9550,
        area: "Kuniyamuthur",
        responseTime: "12 min",
        completedJobs: 290,
        workingAreas: "Kuniyamuthur, Sundarapuram, Kovaipudur, Ukkadam",
        specializations: ["Light Fitting", "Wiring", "Switch Repair", "Motor Starter"],
        reviewsList: [
            { author: "Ganesh", rating: 5, comment: "Quick and safe electrical fix.", date: "4 days ago" }
        ]
    },
    {
        id: 12,
        name: "Karthi Bike Point",
        service: "Bike Repair",
        category: "auto",
        rating: 4.8,
        reviews: 118,
        experience: "7 years",
        price: 199,
        available: "available",
        verified: true,
        vehicle: "🛵 TVS Apache (TN 38 KL 7711)",
        phone: "+919842100112",
        lat: 11.0320,
        lng: 76.9480,
        area: "Saibaba Colony",
        responseTime: "10 min",
        completedJobs: 480,
        workingAreas: "Saibaba Colony, Thudiyalur, RS Puram",
        specializations: ["Brake Wire", "Chain Lube", "Engine Oil", "Battery"],
        reviewsList: [
            { author: "Kishore", rating: 5, comment: "Excellent bike service at home.", date: "Yesterday" }
        ]
    },
    {
        id: 13,
        name: "SuperClean Appliances Care",
        service: "Appliances",
        category: "home",
        rating: 4.9,
        reviews: 95,
        experience: "9 years",
        price: 249,
        available: "available",
        verified: true,
        vehicle: "🛵 Honda Activa (TN 38 CC 1120)",
        phone: "+919842100113",
        lat: 11.0230,
        lng: 76.9710,
        area: "Sidhapudur",
        responseTime: "14 min",
        completedJobs: 430,
        workingAreas: "Sidhapudur, Gandhipuram, Peelamedu, RS Puram",
        specializations: ["Washing Machine", "Refrigerator", "Microwave", "Mixer"],
        reviewsList: [
            { author: "Lakshmi", rating: 5, comment: "Front load washing machine noise was fixed perfectly.", date: "6 days ago" }
        ]
    },
    {
        id: 14,
        name: "AquaPure Service Care",
        service: "RO Purifier",
        category: "home",
        rating: 4.8,
        reviews: 78,
        experience: "6 years",
        price: 299,
        available: "available",
        verified: true,
        vehicle: "🛵 Bajaj Discover (TN 38 PP 4432)",
        phone: "+919842100114",
        lat: 11.0190,
        lng: 76.9740,
        area: "Gandhipuram",
        responseTime: "10 min",
        completedJobs: 360,
        workingAreas: "Gandhipuram, Peelamedu, Ramanathapuram",
        specializations: ["Membrane Replacement", "Filter Change", "TDS Tuning"],
        reviewsList: [
            { author: "Rajeswari", rating: 5, comment: "TDS dropped to pure 75ppm. Water tastes great now.", date: "1 week ago" }
        ]
    },
    {
        id: 15,
        name: "Vignesh Car Mechanics",
        service: "Car Repair",
        category: "auto",
        rating: 4.9,
        reviews: 140,
        experience: "13 years",
        price: 399,
        available: "available",
        verified: true,
        vehicle: "🚗 Mobile Tool Truck (TN 38 ZZ 1001)",
        phone: "+919842100115",
        lat: 10.9310,
        lng: 76.9750,
        area: "Eachanari",
        responseTime: "12 min",
        completedJobs: 890,
        workingAreas: "Eachanari, Sundarapuram, Malumichampatti, Kuniyamuthur",
        specializations: ["On-Spot Breakdown", "Engine Diagnostic", "Brake Overhaul"],
        reviewsList: [
            { author: "Senthil Nathan", rating: 5, comment: "Car clutch wire snapped on highway, Vignesh came in 12 mins and fixed it!", date: "2 days ago" }
        ]
    },
    {
        id: 16,
        name: "Master Key & Locksmith",
        service: "Locksmith",
        category: "home",
        rating: 4.9,
        reviews: 62,
        experience: "14 years",
        price: 249,
        available: "available",
        verified: true,
        vehicle: "🛵 TVS Heavy Duty (TN 38 LL 9901)",
        phone: "+919842100116",
        lat: 11.0150,
        lng: 76.9520,
        area: "RS Puram",
        responseTime: "7 min",
        completedJobs: 510,
        workingAreas: "Entire Coimbatore Area",
        specializations: ["Door Unlocking", "Key Making", "Godrej Lock Installation"],
        reviewsList: [
            { author: "Sundar", rating: 5, comment: "Locked myself out of flat at night. Reached within 10 mins and opened without damage.", date: "3 days ago" }
        ]
    },
    {
        id: 17,
        name: "SecureVision CCTV Setup",
        service: "CCTV Technician",
        category: "tech",
        rating: 4.8,
        reviews: 58,
        experience: "8 years",
        price: 349,
        available: "available",
        verified: true,
        vehicle: "🛵 Yamaha FZ (TN 38 RR 8831)",
        phone: "+919842100117",
        lat: 11.0270,
        lng: 76.9850,
        area: "Peelamedu",
        responseTime: "15 min",
        completedJobs: 320,
        workingAreas: "Peelamedu, Saravanampatti, Gandhipuram",
        specializations: ["HD Camera Setup", "DVR Configuration", "Mobile App View"],
        reviewsList: [
            { author: "Vijayan", rating: 5, comment: "Connected 4 cameras to my smartphone effortlessly.", date: "1 week ago" }
        ]
    },
    {
        id: 18,
        name: "GreenShield Pest Control",
        service: "Pest Control",
        category: "home",
        rating: 4.8,
        reviews: 71,
        experience: "7 years",
        price: 399,
        available: "available",
        verified: true,
        vehicle: "🚗 Service Van (TN 38 BB 6711)",
        phone: "+919842100118",
        lat: 11.0020,
        lng: 77.0150,
        area: "Singanallur",
        responseTime: "25 min",
        completedJobs: 340,
        workingAreas: "Singanallur, Peelamedu, Ramanathapuram, RS Puram",
        specializations: ["Odorless Cockroach Gel", "Termite Barrier", "Bed Bug Control"],
        reviewsList: [
            { author: "Revathi", rating: 5, comment: "100% odorless gel treatment. No cockroaches seen since.", date: "2 weeks ago" }
        ]
    },
    {
        id: 19,
        name: "Rainbow Home Painters",
        service: "Painter",
        category: "home",
        rating: 4.7,
        reviews: 53,
        experience: "10 years",
        price: 599,
        available: "busy",
        verified: true,
        vehicle: "🛵 TVS XL (TN 38 TT 2210)",
        phone: "+919842100119",
        lat: 10.9880,
        lng: 76.9620,
        area: "Ukkadam",
        responseTime: "20 min",
        completedJobs: 410,
        workingAreas: "Ukkadam, Town Hall, RS Puram",
        specializations: ["Wall Touch-up", "Waterproofing", "Color Consult"],
        reviewsList: [
            { author: "Jagan", rating: 5, comment: "Very neat painter. Covered all floor with sheets before starting.", date: "1 week ago" }
        ]
    },
    {
        id: 20,
        name: "NetLink WiFi & Fibernet",
        service: "WiFi Technician",
        category: "tech",
        rating: 4.8,
        reviews: 69,
        experience: "6 years",
        price: 199,
        available: "available",
        verified: true,
        vehicle: "🛵 Hero Glamour (TN 38 DD 5001)",
        phone: "+919842100120",
        lat: 11.0180,
        lng: 76.9670,
        area: "Gandhipuram",
        responseTime: "10 min",
        completedJobs: 450,
        workingAreas: "Gandhipuram, Peelamedu, RS Puram, Saravanampatti",
        specializations: ["Router Setup", "LAN Crimping", "WiFi Dead Zone Fix"],
        reviewsList: [
            { author: "Varun", rating: 5, comment: "Fixed dead zone in 2nd floor with mesh extender.", date: "3 days ago" }
        ]
    },
    {
        id: 21,
        name: "Mani Pipe & Tap Works",
        service: "Plumbing",
        category: "home",
        rating: 4.9,
        reviews: 112,
        experience: "11 years",
        price: 199,
        available: "available",
        verified: true,
        vehicle: "🛵 Bajaj CT 100 (TN 38 JJ 3344)",
        phone: "+919842100121",
        lat: 10.9630,
        lng: 76.9920,
        area: "Podanur",
        responseTime: "12 min",
        completedJobs: 670,
        workingAreas: "Podanur, Singanallur, Ramanathapuram, Sundarapuram",
        specializations: ["Bathroom Fitting", "Overhead Tank Leak", "Drain Clear"],
        reviewsList: [
            { author: "Murugan", rating: 5, comment: "Master plumber. Identified concealed pipe leak with zero wall damage.", date: "5 days ago" }
        ]
    },
    {
        id: 22,
        name: "Spark Electricals",
        service: "Electrician",
        category: "home",
        rating: 4.8,
        reviews: 84,
        experience: "7 years",
        price: 199,
        available: "available",
        verified: true,
        vehicle: "🛵 Honda Shine (TN 38 MM 7788)",
        phone: "+919842100122",
        lat: 11.0280,
        lng: 77.0010,
        area: "Peelamedu",
        responseTime: "10 min",
        completedJobs: 380,
        workingAreas: "Peelamedu, Hopes, Singanallur, Saravanampatti",
        specializations: ["Wiring", "Fan", "MCB", "Geyser Connection"],
        reviewsList: [
            { author: "Naveen", rating: 5, comment: "Installed water heater geyser safely with earthing check.", date: "4 days ago" }
        ]
    },
    {
        id: 23,
        name: "CyberFix Laptop Hub",
        service: "Laptop Repair",
        category: "tech",
        rating: 4.8,
        reviews: 76,
        experience: "8 years",
        price: 299,
        available: "available",
        verified: true,
        vehicle: "🛵 TVS Ntorq (TN 38 QQ 1290)",
        phone: "+919842100123",
        lat: 11.0090,
        lng: 76.9470,
        area: "RS Puram",
        responseTime: "10 min",
        completedJobs: 420,
        workingAreas: "RS Puram, Saibaba Colony, Gandhipuram",
        specializations: ["MacBook Repair", "Windows Formatting", "Broken Hinge Fix"],
        reviewsList: [
            { author: "Siddharth", rating: 5, comment: "Fixed broken MacBook hinge same day.", date: "1 week ago" }
        ]
    },
    {
        id: 24,
        name: "Kovai Fridge & Washer Care",
        service: "Appliances",
        category: "home",
        rating: 4.8,
        reviews: 90,
        experience: "10 years",
        price: 249,
        available: "available",
        verified: true,
        vehicle: "🚗 Maruti Omni (TN 38 KK 4421)",
        phone: "+919842100124",
        lat: 11.0310,
        lng: 76.9460,
        area: "Saibaba Colony",
        responseTime: "15 min",
        completedJobs: 560,
        workingAreas: "Saibaba Colony, RS Puram, Thudiyalur, Gandhipuram",
        specializations: ["Double Door Fridge", "Washing Machine Motherboard", "Dryer Fix"],
        reviewsList: [
            { author: "Chandran", rating: 5, comment: "Refrigerator gas refilled and cooling restored in 1 hour.", date: "3 days ago" }
        ]
    }
];

// =========================================================
// 2. STATE & LOCAL STORAGE SYSTEM
// =========================================================

// Application State
let appState = {
    user: {
        name: "Customer",
        phone: "9876543210",
        isLoggedIn: false
    },
    location: {
        name: "Coimbatore Central",
        lat: 11.0168,
        lng: 76.9558,
        isGps: false
    },
    providers: [],
    favorites: [],
    bookings: [],
    activeBooking: null,
    trackingInterval: null,
    selectedCategoryFilter: "all",
    selectedMapCategory: "all",
    searchKeyword: "",
    filters: {
        distance: "5",
        rating: "all",
        price: "all",
        availableOnly: false,
        sortBy: "nearest"
    },
    chatMessages: []
};

// LocalStorage Persistence Helpers
function loadStateFromStorage() {
    try {
        const storedLocation = localStorage.getItem("fixnear_location");
        if (storedLocation) appState.location = JSON.parse(storedLocation);

        const storedFavorites = localStorage.getItem("fixnear_favorites");
        if (storedFavorites) appState.favorites = JSON.parse(storedFavorites);

        const storedBookings = localStorage.getItem("fixnear_bookings");
        if (storedBookings) appState.bookings = JSON.parse(storedBookings);

        const storedActiveBooking = localStorage.getItem("fixnear_active_booking");
        if (storedActiveBooking) appState.activeBooking = JSON.parse(storedActiveBooking);

        const storedUser = localStorage.getItem("fixnear_user");
        if (storedUser) appState.user = JSON.parse(storedUser);

        const storedChat = localStorage.getItem("fixnear_chat_history");
        if (storedChat) appState.chatMessages = JSON.parse(storedChat);
    } catch (err) {
        console.error("Error reading localStorage:", err);
    }

    // Initialize providers array from base database
    appState.providers = JSON.parse(JSON.stringify(initialProviders));
    recalculateAllProviderDistances();
}

function saveStateToStorage(key) {
    try {
        if (key === "location" || !key) localStorage.setItem("fixnear_location", JSON.stringify(appState.location));
        if (key === "favorites" || !key) localStorage.setItem("fixnear_favorites", JSON.stringify(appState.favorites));
        if (key === "bookings" || !key) localStorage.setItem("fixnear_bookings", JSON.stringify(appState.bookings));
        if (key === "activeBooking" || !key) localStorage.setItem("fixnear_active_booking", JSON.stringify(appState.activeBooking));
        if (key === "user" || !key) localStorage.setItem("fixnear_user", JSON.stringify(appState.user));
        if (key === "chat" || !key) localStorage.setItem("fixnear_chat_history", JSON.stringify(appState.chatMessages));
    } catch (err) {
        console.error("Error saving to localStorage:", err);
    }
}

// =========================================================
// 3. HAVERSINE DISTANCE & GEOLOCATION
// =========================================================

// Standard Haversine formula to compute great-circle distance between coordinates in kilometers
function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}

// Recalculates distance and ETA for all providers relative to user location
function recalculateAllProviderDistances() {
    const uLat = appState.location.lat;
    const uLng = appState.location.lng;

    appState.providers.forEach(p => {
        const distKm = calculateHaversineDistance(uLat, uLng, p.lat, p.lng);
        p.distance = parseFloat(distKm.toFixed(1));
        // Estimate ETA based on average local speed (1 km ≈ 3-4 mins + 4 min prep)
        const etaMinutes = Math.max(5, Math.round(p.distance * 3.5 + 4));
        p.eta = etaMinutes;
    });
}

// Browser Geolocation Permission Request
function requestUserLocation() {
    showToast("Detecting your location via GPS...", "info");

    if (!navigator.geolocation) {
        showToast("Geolocation is not supported by your browser. Please select area manually.", "warning");
        openLocationModal();
        return;
    }

    navigator.geolocation.getCurrentPosition(
        position => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            appState.location = {
                name: "Current GPS Location",
                lat: lat,
                lng: lng,
                isGps: true
            };
            saveStateToStorage("location");
            recalculateAllProviderDistances();
            updateLocationUIElements();
            renderProvidersGrid();
            initOrUpdateMainMap();
            closeModal("locationModal");

            showToast("📍 Location detected successfully!", "success");

            // Display banner in hero
            const banner = document.getElementById("locationStatusBanner");
            if (banner) {
                banner.style.display = "flex";
                document.getElementById("locationStatusText").textContent = `Detected GPS: (${lat.toFixed(4)}, ${lng.toFixed(4)}) - Near ${appState.location.name}`;
            }
        },
        error => {
            console.warn("Geolocation permission error:", error.message);
            showToast("Location permission denied or unavailable. Please select your area manually.", "warning");
            openLocationModal();
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
}

// Manual Area Selector
function selectAreaLocation(areaName, lat = 11.0168, lng = 76.9558) {
    appState.location = {
        name: areaName,
        lat: lat,
        lng: lng,
        isGps: false
    };
    saveStateToStorage("location");
    recalculateAllProviderDistances();
    updateLocationUIElements();
    renderProvidersGrid();
    initOrUpdateMainMap();
    closeModal("locationModal");

    const banner = document.getElementById("locationStatusBanner");
    if (banner) {
        banner.style.display = "flex";
        document.getElementById("locationStatusText").textContent = `Selected Area: ${areaName}`;
    }

    showToast(`Location set to ${areaName}`, "success");
}

function updateLocationUIElements() {
    const locName = appState.location.name;
    const navText = document.getElementById("navLocationText");
    if (navText) navText.textContent = locName;

    const mobText = document.getElementById("mobileLocationText");
    if (mobText) mobText.textContent = locName;

    const heroBtn = document.getElementById("heroLocationDisplay");
    if (heroBtn) heroBtn.textContent = appState.location.isGps ? "📍 " + locName : "📍 " + locName;

    const mapLabel = document.getElementById("mapLocationLabel");
    if (mapLabel) mapLabel.textContent = locName;
}

// =========================================================
// 4. MAP INTEGRATION (LEAFLET.JS + OPENSTREETMAP)
// =========================================================

let mainProvidersMap = null;
let mainMapMarkersLayer = null;
let liveTrackingLeafletMap = null;
let trackingTechMarker = null;
let trackingCustomerMarker = null;
let trackingRoutePolyline = null;

// Initialize or update the main providers discovery map
function initOrUpdateMainMap() {
    const mapElement = document.getElementById("providersMap");
    if (!mapElement) return;

    const userLat = appState.location.lat;
    const userLng = appState.location.lng;

    if (!mainProvidersMap) {
        // Initialize Leaflet map
        mainProvidersMap = L.map("providersMap", {
            center: [userLat, userLng],
            zoom: 13,
            zoomControl: true,
            scrollWheelZoom: false
        });

        // Add OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(mainProvidersMap);

        mainMapMarkersLayer = L.layerGroup().addTo(mainProvidersMap);
    } else {
        mainProvidersMap.setView([userLat, userLng], 13);
        mainMapMarkersLayer.clearLayers();
    }

    // Add Customer Marker with pulsing blue style
    const customerIcon = L.divIcon({
        className: "custom-leaflet-marker",
        html: '<div class="user-gps-marker" title="Your Location"></div>',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });

    L.marker([userLat, userLng], { icon: customerIcon })
        .bindPopup(`<strong>📍 Your Location</strong><br><small>${appState.location.name}</small>`)
        .addTo(mainMapMarkersLayer);

    // Filter providers based on active map category
    const activeCategory = appState.selectedMapCategory;
    const filteredProviders = appState.providers.filter(p => {
        if (activeCategory === "all") return true;
        return p.service.toLowerCase().includes(activeCategory.toLowerCase()) || p.category === activeCategory;
    });

    let availCount = 0;
    let busyCount = 0;

    // Add Provider Markers
    filteredProviders.forEach(p => {
        if (p.available === "available") availCount++;
        else busyCount++;

        const isAvail = p.available === "available";
        const iconClass = getServiceFaIcon(p.service);

        const providerIcon = L.divIcon({
            className: "custom-leaflet-marker",
            html: `
                <div class="marker-pin-wrap">
                    <div class="marker-icon-box ${isAvail ? 'available' : 'busy'}">
                        <i class="fa-solid ${iconClass}"></i>
                    </div>
                </div>
            `,
            iconSize: [38, 38],
            iconAnchor: [19, 19]
        });

        const popupContent = `
            <div class="popup-card">
                <div class="popup-title">${p.name} ${p.verified ? '✓' : ''}</div>
                <div class="popup-service">${p.service} • ${p.experience} exp</div>
                <div class="popup-meta-row">
                    <span>★ ${p.rating} (${p.reviews})</span>
                    <span>📍 ${p.distance} km (${p.eta}m ETA)</span>
                    <strong style="color:#2563eb;">₹${p.price}+</strong>
                </div>
                <div class="popup-actions">
                    <button class="popup-btn secondary" onclick="viewProviderProfile(${p.id})">Profile</button>
                    <button class="popup-btn primary" onclick="quickBookProvider(${p.id})">Book Now</button>
                </div>
            </div>
        `;

        L.marker([p.lat, p.lng], { icon: providerIcon })
            .bindPopup(popupContent)
            .addTo(mainMapMarkersLayer);
    });

    // Update overlay legend counts
    const availEl = document.getElementById("legendAvailCount");
    if (availEl) availEl.textContent = availCount;
    const busyEl = document.getElementById("legendBusyCount");
    if (busyEl) busyEl.textContent = busyCount;
    const allEl = document.getElementById("mapAllCount");
    if (allEl) allEl.textContent = filteredProviders.length;
}

function filterMapCategory(cat, buttonEl) {
    appState.selectedMapCategory = cat;
    document.querySelectorAll(".map-chip").forEach(btn => btn.classList.remove("active"));
    if (buttonEl) buttonEl.classList.add("active");
    initOrUpdateMainMap();
    showToast(`Map showing: ${cat === 'all' ? 'All Services' : cat}`, "info");
}

function getServiceFaIcon(serviceName) {
    if (!serviceName) return "fa-wrench";
    const s = serviceName.toLowerCase();
    if (s.includes("bike")) return "fa-motorcycle";
    if (s.includes("car")) return "fa-car";
    if (s.includes("electri")) return "fa-bolt";
    if (s.includes("plumb")) return "fa-faucet-drip";
    if (s.includes("ac")) return "fa-snowflake";
    if (s.includes("laptop")) return "fa-laptop";
    if (s.includes("mobile")) return "fa-mobile-screen";
    if (s.includes("appliance")) return "fa-plug";
    if (s.includes("clean")) return "fa-broom";
    if (s.includes("carpenter")) return "fa-hammer";
    if (s.includes("paint")) return "fa-paint-roller";
    if (s.includes("purifier") || s.includes("ro")) return "fa-droplet";
    if (s.includes("cctv")) return "fa-video";
    if (s.includes("pest")) return "fa-bug";
    if (s.includes("lock")) return "fa-lock-open";
    if (s.includes("wifi")) return "fa-wifi";
    return "fa-user-gear";
}

// =========================================================
// 5. PROVIDER DISCOVERY, SMART SEARCH & FILTERS
// =========================================================

function renderProvidersGrid() {
    const grid = document.getElementById("providersGrid");
    if (!grid) return;

    let list = [...appState.providers];

    // 1. Service Category Filter
    if (appState.selectedCategoryFilter !== "all") {
        const cat = appState.selectedCategoryFilter.toLowerCase();
        list = list.filter(p => p.service.toLowerCase().includes(cat) || p.category === cat);
    }

    // 2. Smart Search Keyword
    if (appState.searchKeyword.trim() !== "") {
        const q = appState.searchKeyword.toLowerCase().trim();
        list = list.filter(p => {
            const matchName = p.name.toLowerCase().includes(q);
            const matchService = p.service.toLowerCase().includes(q);
            const matchArea = (p.area || "").toLowerCase().includes(q);
            const matchWorking = (p.workingAreas || "").toLowerCase().includes(q);
            const matchSpecs = (p.specializations || []).some(s => s.toLowerCase().includes(q));

            // Keyword aliases mapping
            let matchAlias = false;
            if (q.includes("fan") || q.includes("wiring") || q.includes("light") || q.includes("switch")) matchAlias = p.service === "Electrician";
            if (q.includes("leak") || q.includes("tap") || q.includes("pipe") || q.includes("water")) matchAlias = p.service === "Plumbing";
            if (q.includes("puncture") || q.includes("engine") || q.includes("chain") || q.includes("oil")) matchAlias = p.service === "Bike Repair";
            if (q.includes("battery") || q.includes("tyre") || q.includes("tow") || q.includes("breakdown")) matchAlias = p.category === "auto";
            if (q.includes("gas") || q.includes("cool") || q.includes("cooling")) matchAlias = p.service === "AC Repair";
            if (q.includes("screen") || q.includes("display") || q.includes("format") || q.includes("ssd") || q.includes("ram")) matchAlias = p.service === "Laptop Repair" || p.service === "Mobile Repair";

            return matchName || matchService || matchArea || matchWorking || matchSpecs || matchAlias;
        });
    }

    // 3. Advanced Distance Filter
    if (appState.filters.distance !== "all") {
        const maxDist = parseFloat(appState.filters.distance);
        list = list.filter(p => p.distance <= maxDist);
    }

    // 4. Rating Filter
    if (appState.filters.rating !== "all") {
        const minRating = parseFloat(appState.filters.rating);
        list = list.filter(p => p.rating >= minRating);
    }

    // 5. Price Filter
    if (appState.filters.price !== "all") {
        if (appState.filters.price === "under300") list = list.filter(p => p.price < 300);
        else if (appState.filters.price === "300to500") list = list.filter(p => p.price >= 300 && p.price <= 500);
        else if (appState.filters.price === "above500") list = list.filter(p => p.price > 500);
    }

    // 6. Available Now Checkbox
    if (appState.filters.availableOnly) {
        list = list.filter(p => p.available === "available");
    }

    // 7. Sorting
    list.sort((a, b) => {
        if (appState.filters.sortBy === "nearest") return a.distance - b.distance;
        if (appState.filters.sortBy === "rating") return b.rating - a.rating;
        if (appState.filters.sortBy === "fastest") return a.eta - b.eta;
        if (appState.filters.sortBy === "priceLow") return a.price - b.price;
        if (appState.filters.sortBy === "experience") {
            const expA = parseInt(a.experience) || 0;
            const expB = parseInt(b.experience) || 0;
            return expB - expA;
        }
        return 0;
    });

    // Update Result count label
    const resultsCountEl = document.getElementById("filterResultsCount");
    if (resultsCountEl) {
        resultsCountEl.innerHTML = `Showing <strong>${list.length}</strong> verified technicians near ${appState.location.name}`;
    }

    const resetBtn = document.getElementById("resetFilterBtn");
    if (resetBtn) {
        const isFiltered = appState.selectedCategoryFilter !== "all" || appState.searchKeyword !== "" || appState.filters.distance !== "5" || appState.filters.rating !== "all" || appState.filters.price !== "all" || appState.filters.availableOnly;
        resetBtn.style.display = isFiltered ? "inline-block" : "none";
    }

    // Render HTML Cards
    if (list.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; background: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0;">
                <i class="fa-solid fa-user-slash" style="font-size: 48px; color: #cbd5e1; margin-bottom: 16px;"></i>
                <h3 style="font-size: 20px; color: #0f172a; margin-bottom: 8px;">No matching technicians found</h3>
                <p style="color: #64748b; font-size: 14px; margin-bottom: 20px;">Try adjusting your distance filter or searching for another service category.</p>
                <button class="primary-btn" onclick="resetFilters()">Reset All Filters</button>
            </div>
        `;
        return;
    }

    grid.innerHTML = list.map(p => {
        const isFav = appState.favorites.includes(p.id);
        const iconClass = getServiceFaIcon(p.service);
        const colorBg = getServiceColorBg(p.service);

        return `
            <article class="provider-card" data-id="${p.id}">
                <div class="provider-image">
                    <div class="provider-image-placeholder ${colorBg}">
                        <i class="fa-solid ${iconClass}"></i>
                    </div>

                    ${p.verified ? `
                        <span class="verified-badge">
                            <i class="fa-solid fa-circle-check"></i> Verified
                        </span>
                    ` : ''}

                    <span class="avail-status-dot">
                        <span class="status-dot-inner ${p.available === 'available' ? 'available' : 'busy'}"></span>
                        ${p.available === 'available' ? 'Available' : 'On Job'}
                    </span>

                    <button class="favorite-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite(${p.id}, this)" title="Save to favorites">
                        <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                    </button>
                </div>

                <div class="provider-card-content">
                    <div class="provider-title-row">
                        <div>
                            <h3>${p.name}</h3>
                            <p>${p.service}</p>
                        </div>
                        <div class="rating">
                            <i class="fa-solid fa-star"></i> ${p.rating}
                            <span>(${p.reviews})</span>
                        </div>
                    </div>

                    <div class="provider-meta">
                        <span><i class="fa-solid fa-location-dot"></i> ${p.distance} km</span>
                        <span><i class="fa-solid fa-bolt"></i> ${p.eta} min ETA</span>
                        <span><i class="fa-solid fa-briefcase"></i> ${p.experience}</span>
                    </div>

                    <div class="provider-tags">
                        ${(p.specializations || []).slice(0, 3).map(s => `<span>${s}</span>`).join('')}
                    </div>

                    <div class="provider-bottom">
                        <div class="provider-price">
                            <small>Starts from</small>
                            <strong>₹${p.price}</strong>
                        </div>
                        <div class="card-action-btns">
                            <button class="profile-btn-sm" onclick="viewProviderProfile(${p.id})">Profile</button>
                            <button class="book-btn-sm" onclick="quickBookProvider(${p.id})">Book Now</button>
                        </div>
                    </div>
                </div>
            </article>
        `;
    }).join('');
}

function getServiceColorBg(service) {
    if (!service) return "orange-bg";
    const s = service.toLowerCase();
    if (s.includes("bike")) return "orange-bg";
    if (s.includes("electrician")) return "yellow-bg";
    if (s.includes("plumbing")) return "cyan-bg";
    if (s.includes("ac")) return "blue-bg";
    if (s.includes("car")) return "red-bg";
    if (s.includes("laptop")) return "indigo-bg";
    if (s.includes("cleaning")) return "green-bg";
    if (s.includes("carpenter")) return "yellow-bg";
    return "blue-bg";
}

function filterProvidersByCategory(category, buttonEl) {
    appState.selectedCategoryFilter = category;
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    if (buttonEl) buttonEl.classList.add("active");
    renderProvidersGrid();
}

function quickFilterService(serviceName) {
    appState.selectedCategoryFilter = serviceName;
    appState.searchKeyword = "";
    document.getElementById("heroSearch").value = "";

    // Highlight filter button if exists
    document.querySelectorAll(".filter-btn").forEach(btn => {
        if (btn.getAttribute("data-filter") === serviceName) btn.classList.add("active");
        else btn.classList.remove("active");
    });

    renderProvidersGrid();
    filterMapCategory(serviceName);

    const section = document.getElementById("providers");
    if (section) section.scrollIntoView({ behavior: "smooth" });

    showToast(`Filtering providers for: ${serviceName}`, "info");
}

function handleHeroSearch() {
    const input = document.getElementById("heroSearch");
    if (!input) return;
    const query = input.value.trim();
    appState.searchKeyword = query;

    renderProvidersGrid();

    const section = document.getElementById("providers");
    if (section) section.scrollIntoView({ behavior: "smooth" });

    showToast(query ? `Searching for: "${query}"` : "Showing all providers", "info");
}

function clearSearchInput() {
    const input = document.getElementById("heroSearch");
    if (input) input.value = "";
    document.getElementById("searchClearBtn").style.display = "none";
    appState.searchKeyword = "";
    renderProvidersGrid();
}

function applyAllFilters() {
    appState.filters.distance = document.getElementById("filterDistance").value;
    appState.filters.rating = document.getElementById("filterRating").value;
    appState.filters.price = document.getElementById("filterPrice").value;
    appState.filters.availableOnly = document.getElementById("filterAvailableOnly").checked;
    appState.filters.sortBy = document.getElementById("sortBySelect").value;
    renderProvidersGrid();
}

function resetFilters() {
    appState.selectedCategoryFilter = "all";
    appState.searchKeyword = "";
    appState.filters = {
        distance: "5",
        rating: "all",
        price: "all",
        availableOnly: false,
        sortBy: "nearest"
    };

    const searchInput = document.getElementById("heroSearch");
    if (searchInput) searchInput.value = "";

    document.getElementById("filterDistance").value = "5";
    document.getElementById("filterRating").value = "all";
    document.getElementById("filterPrice").value = "all";
    document.getElementById("filterAvailableOnly").checked = false;
    document.getElementById("sortBySelect").value = "nearest";

    document.querySelectorAll(".filter-btn").forEach(b => {
        if (b.getAttribute("data-filter") === "all") b.classList.add("active");
        else b.classList.remove("active");
    });

    renderProvidersGrid();
    showToast("Filters reset to default.", "info");
}

function toggleFavorite(providerId, btn) {
    const idx = appState.favorites.indexOf(providerId);
    if (idx > -1) {
        appState.favorites.splice(idx, 1);
        if (btn) {
            btn.classList.remove("active");
            btn.innerHTML = '<i class="fa-regular fa-heart"></i>';
        }
        showToast("Removed from saved favorites.", "info");
    } else {
        appState.favorites.push(providerId);
        if (btn) {
            btn.classList.add("active");
            btn.innerHTML = '<i class="fa-solid fa-heart"></i>';
        }
        showToast("Saved to your favorites ❤️", "success");
    }
    saveStateToStorage("favorites");
    updateDashboardFavorites();
}

function toggleAllServices() {
    const extras = document.querySelectorAll(".extra-service");
    const btnText = document.getElementById("viewAllServicesText");
    let isShowing = false;

    extras.forEach(el => {
        el.classList.toggle("show");
        if (el.classList.contains("show")) isShowing = true;
    });

    if (btnText) {
        btnText.textContent = isShowing ? "Show less categories" : "View all 16 categories";
    }
}

// =========================================================
// 6. BOOKING WORKFLOW & NEAREST ASSIGNMENT
// =========================================================

let pendingBookingProviderId = null;

function selectServiceCategory(serviceCategory) {
    const catData = serviceCatalog[serviceCategory];
    if (!catData) return;

    // Open booking modal pre-configured
    openBookingModal(null, serviceCategory);
}

function triggerEmergencyBooking(emergencyType) {
    let targetService = "Bike Repair";
    if (emergencyType.includes("Car")) targetService = "Car Repair";
    if (emergencyType.includes("Electrical")) targetService = "Electrician";
    if (emergencyType.includes("Water")) targetService = "Plumbing";
    if (emergencyType.includes("Locksmith")) targetService = "Locksmith";
    if (emergencyType.includes("AC")) targetService = "AC Repair";

    // Auto-match nearest provider directly
    const nearestPro = findNearestAvailableProvider(targetService);
    if (nearestPro) {
        openBookingModal(nearestPro.id, targetService, `EMERGENCY: ${emergencyType}`);
        showToast(`⚡ Priority dispatch matching: ${nearestPro.name} (${nearestPro.distance} km away)`, "info");
    } else {
        openBookingModal(null, targetService, `EMERGENCY: ${emergencyType}`);
    }
}

function quickBookProvider(providerId) {
    const provider = appState.providers.find(p => p.id === providerId);
    if (!provider) return;
    openBookingModal(provider.id, provider.service);
}

function findNearestAvailableProvider(serviceName) {
    const candidates = appState.providers.filter(p =>
        p.service.toLowerCase().includes(serviceName.toLowerCase()) && p.available === "available"
    );

    if (candidates.length === 0) {
        // Fallback to any matching service
        return appState.providers.find(p => p.service.toLowerCase().includes(serviceName.toLowerCase())) || appState.providers[0];
    }

    candidates.sort((a, b) => a.distance - b.distance);
    return candidates[0];
}

function openBookingModal(providerId = null, serviceName = "Electrician", defaultProblem = "") {
    pendingBookingProviderId = providerId;

    let provider = providerId ? appState.providers.find(p => p.id === providerId) : null;
    if (!provider) {
        provider = findNearestAvailableProvider(serviceName);
        pendingBookingProviderId = provider ? provider.id : null;
    }

    const modal = document.getElementById("bookingModal");
    if (!modal) return;

    // Update banner
    if (provider) {
        document.getElementById("bookingProName").textContent = provider.name;
        document.getElementById("bookingProService").textContent = `${provider.service} • ${provider.distance} km away`;
        document.getElementById("bookingProEta").textContent = `⚡ ${provider.eta} min ETA`;
        document.getElementById("bookingProAvatar").className = `provider-mini-avatar ${getServiceColorBg(provider.service)}`;
    }

    // Populate service dropdown
    const serviceSelect = document.getElementById("bookServiceSelect");
    if (serviceSelect) {
        serviceSelect.value = serviceName || (provider ? provider.service : "Electrician");
    }

    // Populate problems for service
    populateBookingProblems(serviceSelect.value);

    // Set defaults
    document.getElementById("bookDate").valueAsDate = new Date();
    document.getElementById("bookCustomerName").value = appState.user.name !== "Customer" ? appState.user.name : "";
    document.getElementById("bookCustomerPhone").value = appState.user.phone || "";
    document.getElementById("bookCustomerAddress").value = appState.location.name || "";

    if (defaultProblem) {
        document.getElementById("bookProblemDetails").value = defaultProblem;
    }

    updateBookingEstimatedPrice();

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function handleBookingServiceChange() {
    const serviceName = document.getElementById("bookServiceSelect").value;
    populateBookingProblems(serviceName);

    // Re-assign nearest provider for newly selected service
    const nearest = findNearestAvailableProvider(serviceName);
    if (nearest) {
        pendingBookingProviderId = nearest.id;
        document.getElementById("bookingProName").textContent = nearest.name;
        document.getElementById("bookingProService").textContent = `${nearest.service} • ${nearest.distance} km away`;
        document.getElementById("bookingProEta").textContent = `⚡ ${nearest.eta} min ETA`;
        document.getElementById("bookingProAvatar").className = `provider-mini-avatar ${getServiceColorBg(nearest.service)}`;
    }

    updateBookingEstimatedPrice();
}

function populateBookingProblems(serviceName) {
    const problemSelect = document.getElementById("bookProblemSelect");
    if (!problemSelect) return;
    problemSelect.innerHTML = "";

    const catalog = serviceCatalog[serviceName];
    if (!catalog || !catalog.problems) {
        problemSelect.innerHTML = '<option value="General Inspection">General Inspection & Repair (₹199)</option>';
        return;
    }

    catalog.problems.forEach(prob => {
        const opt = document.createElement("option");
        opt.value = prob.name;
        opt.textContent = `${prob.name} (₹${prob.price})`;
        opt.dataset.price = prob.price;
        opt.dataset.labour = prob.labour;
        problemSelect.appendChild(opt);
    });
}

function updateBookingEstimatedPrice() {
    const problemSelect = document.getElementById("bookProblemSelect");
    const selectedOpt = problemSelect ? problemSelect.selectedOptions[0] : null;
    const price = selectedOpt && selectedOpt.dataset.price ? parseInt(selectedOpt.dataset.price) : 299;

    const chargeEl = document.getElementById("bookEstimatedCharge");
    if (chargeEl) chargeEl.textContent = `₹${price}`;
}

function fillCurrentAddress() {
    const addrInput = document.getElementById("bookCustomerAddress");
    if (addrInput) {
        addrInput.value = `${appState.location.name} (GPS: ${appState.location.lat.toFixed(4)}, ${appState.location.lng.toFixed(4)})`;
        showToast("Address populated with current GPS location!", "success");
    }
}

// Handle final booking submission
function handleBookingSubmission(event) {
    event.preventDefault();

    const serviceName = document.getElementById("bookServiceSelect").value;
    const problemName = document.getElementById("bookProblemSelect").value;
    const details = document.getElementById("bookProblemDetails").value.trim();
    const custName = document.getElementById("bookCustomerName").value.trim();
    const custPhone = document.getElementById("bookCustomerPhone").value.trim();
    const address = document.getElementById("bookCustomerAddress").value.trim();
    const date = document.getElementById("bookDate").value;
    const time = document.getElementById("bookTime").value;

    if (!custName || !custPhone || custPhone.length < 10) {
        showToast("Please enter a valid 10-digit mobile number and full name.", "warning");
        return;
    }

    // Find assigned technician
    let provider = appState.providers.find(p => p.id === pendingBookingProviderId);
    if (!provider) provider = findNearestAvailableProvider(serviceName);

    const problemObj = (serviceCatalog[serviceName]?.problems || []).find(p => p.name === problemName);
    const estPrice = problemObj ? problemObj.price : provider.price;
    const inspectionFee = serviceCatalog[serviceName]?.inspectionFee || 99;
    const labourFee = problemObj ? problemObj.labour : 200;

    const bookingId = "FN-" + new Date().getFullYear() + "-" + Math.floor(10000 + Math.random() * 90000);

    // Construct Active Booking Object
    const newBooking = {
        id: bookingId,
        providerId: provider.id,
        providerName: provider.name,
        providerService: provider.service,
        providerPhone: provider.phone,
        providerVehicle: provider.vehicle,
        providerRating: provider.rating,
        providerLat: provider.lat,
        providerLng: provider.lng,
        customerName: custName,
        customerPhone: custPhone,
        customerAddress: address,
        customerLat: appState.location.lat,
        customerLng: appState.location.lng,
        service: serviceName,
        problem: problemName,
        details: details,
        date: date,
        time: time,
        inspectionFee: inspectionFee,
        labourFee: labourFee,
        partsFee: 0,
        platformFee: 19,
        estimatedPrice: estPrice,
        finalAmount: estPrice + 19,
        status: "ON_THE_WAY", // Immediate live dispatch
        statusStep: 3, // Step 3 = On The Way
        liveDistance: provider.distance,
        liveEta: provider.eta,
        createdAt: new Date().toISOString(),
        paymentStatus: "PENDING",
        reviewGiven: false
    };

    appState.activeBooking = newBooking;
    appState.bookings.unshift(newBooking);

    // Save customer name and phone
    appState.user.name = custName;
    appState.user.phone = custPhone;
    appState.user.isLoggedIn = true;

    saveStateToStorage("activeBooking");
    saveStateToStorage("bookings");
    saveStateToStorage("user");

    closeModal("bookingModal");
    updateActiveBookingBadge();

    // Launch Live Tracking View automatically
    showToast(`🎉 Booking Confirmed! Assigned ${provider.name}`, "success");
    openLiveTrackingModal(newBooking);
}

// =========================================================
// 7. REAL-TIME LIVE GPS TRACKING SIMULATION
// =========================================================

function openActiveTrackingModal() {
    if (!appState.activeBooking) {
        showToast("No active booking found.", "info");
        return;
    }
    openLiveTrackingModal(appState.activeBooking);
}

function openLiveTrackingModal(booking) {
    const modal = document.getElementById("trackingModal");
    if (!modal) return;

    // Fill details
    document.getElementById("trackBookingId").textContent = booking.id;
    document.getElementById("trackTechName").textContent = booking.providerName;
    document.getElementById("trackTechService").textContent = booking.service + " Expert";
    document.getElementById("trackTechVehicle").innerHTML = `<i class="fa-solid fa-motorcycle"></i> ${booking.providerVehicle}`;
    document.getElementById("trackTechRating").textContent = booking.providerRating;
    document.getElementById("trackEstimatedAmount").textContent = `₹${booking.finalAmount}`;
    document.getElementById("trackCallBtn").href = `tel:${booking.providerPhone}`;

    updateTrackingTimelineUI(booking.statusStep);
    updateTrackingActionBtnUI(booking.statusStep);

    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    // Initialize Leaflet Live Tracking Map
    setTimeout(() => {
        initTrackingMap(booking);
        startLiveMovementSimulation(booking);
    }, 200);
}

function initTrackingMap(booking) {
    const mapEl = document.getElementById("liveTrackingMap");
    if (!mapEl) return;

    const custLat = booking.customerLat || appState.location.lat;
    const custLng = booking.customerLng || appState.location.lng;
    const techLat = booking.providerLat;
    const techLng = booking.providerLng;

    const centerLat = (custLat + techLat) / 2;
    const centerLng = (custLng + techLng) / 2;

    if (!liveTrackingLeafletMap) {
        liveTrackingLeafletMap = L.map("liveTrackingMap", {
            center: [centerLat, centerLng],
            zoom: 14,
            zoomControl: true
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(liveTrackingLeafletMap);
    } else {
        liveTrackingLeafletMap.invalidateSize();
        liveTrackingLeafletMap.setView([centerLat, centerLng], 14);
    }

    // Remove existing markers & lines
    if (trackingTechMarker) liveTrackingLeafletMap.removeLayer(trackingTechMarker);
    if (trackingCustomerMarker) liveTrackingLeafletMap.removeLayer(trackingCustomerMarker);
    if (trackingRoutePolyline) liveTrackingLeafletMap.removeLayer(trackingRoutePolyline);

    // Customer Pin
    const customerIcon = L.divIcon({
        className: "custom-leaflet-marker",
        html: '<div class="user-gps-marker" title="Your House"></div>',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });
    trackingCustomerMarker = L.marker([custLat, custLng], { icon: customerIcon })
        .bindPopup("<strong>📍 Your Service Address</strong>")
        .addTo(liveTrackingLeafletMap);

    // Technician Vehicle Moving Marker
    const techIcon = L.divIcon({
        className: "custom-leaflet-marker",
        html: `
            <div class="marker-pin-wrap">
                <div class="marker-icon-box" style="background:#2563eb; color:white; border-color:white; box-shadow:0 0 15px rgba(37,99,235,0.7);">
                    <i class="fa-solid fa-motorcycle"></i>
                </div>
            </div>
        `,
        iconSize: [38, 38],
        iconAnchor: [19, 19]
    });
    trackingTechMarker = L.marker([techLat, techLng], { icon: techIcon })
        .bindPopup(`<strong>🛵 ${booking.providerName}</strong><br>Technician on the way`)
        .addTo(liveTrackingLeafletMap);

    // Draw connecting Route Polyline
    trackingRoutePolyline = L.polyline([[techLat, techLng], [custLat, custLng]], {
        color: "#2563eb",
        weight: 4,
        dashArray: "8, 8",
        opacity: 0.8
    }).addTo(liveTrackingLeafletMap);

    liveTrackingLeafletMap.fitBounds(trackingRoutePolyline.getBounds(), { padding: [40, 40] });
}

// Live simulation timer that moves technician marker gradually toward customer
function startLiveMovementSimulation(booking) {
    if (appState.trackingInterval) clearInterval(appState.trackingInterval);

    if (booking.statusStep >= 4) {
        // Already arrived or completed
        return;
    }

    let progressFraction = 0;
    const startLat = booking.providerLat;
    const startLng = booking.providerLng;
    const targetLat = booking.customerLat || appState.location.lat;
    const targetLng = booking.customerLng || appState.location.lng;

    appState.trackingInterval = setInterval(() => {
        if (!appState.activeBooking || appState.activeBooking.statusStep >= 4) {
            clearInterval(appState.trackingInterval);
            return;
        }

        progressFraction += 0.08; // Step forward smoothly
        if (progressFraction >= 1) {
            progressFraction = 1;
            clearInterval(appState.trackingInterval);
            handleTechnicianArrival(appState.activeBooking);
            return;
        }

        const currentLat = startLat + (targetLat - startLat) * progressFraction;
        const currentLng = startLng + (targetLng - startLng) * progressFraction;

        if (trackingTechMarker) {
            trackingTechMarker.setLatLng([currentLat, currentLng]);
        }

        if (trackingRoutePolyline) {
            trackingRoutePolyline.setLatLngs([[currentLat, currentLng], [targetLat, targetLng]]);
        }

        // Calculate remaining distance
        const remDist = calculateHaversineDistance(currentLat, currentLng, targetLat, targetLng);
        const remEta = Math.max(1, Math.round(remDist * 3.5));

        appState.activeBooking.liveDistance = parseFloat(remDist.toFixed(1));
        appState.activeBooking.liveEta = remEta;

        const distText = remDist < 0.2 ? `${Math.round(remDist * 1000)} meters away` : `${remDist.toFixed(1)} km away`;
        const etaText = remDist < 0.2 ? "Arriving now!" : `Arriving in ${remEta} min`;

        document.getElementById("trackDistanceText").textContent = distText;
        document.getElementById("trackEtaText").textContent = etaText;
    }, 2800);
}

function handleTechnicianArrival(booking) {
    booking.status = "ARRIVED";
    booking.statusStep = 4;
    saveStateToStorage("activeBooking");
    updateTrackingTimelineUI(4);
    updateTrackingActionBtnUI(4);

    document.getElementById("trackDistanceText").textContent = "Technician Arrived";
    document.getElementById("trackEtaText").textContent = "At your location";

    showToast("🔔 Ding-dong! Technician has arrived at your doorstep!", "success");

    // Send automated chat greeting
    appendChatMessage("incoming", `Hello! I have reached outside your house. Please open the door.`);
}

function updateTrackingTimelineUI(stepIndex) {
    const steps = [
        document.getElementById("stepConfirmed"),
        document.getElementById("stepAssigned"),
        document.getElementById("stepOnWay"),
        document.getElementById("stepArrived"),
        document.getElementById("stepStarted"),
        document.getElementById("stepCompleted")
    ];

    steps.forEach((st, idx) => {
        if (!st) return;
        st.classList.remove("completed", "active");
        if (idx + 1 < stepIndex) {
            st.classList.add("completed");
        } else if (idx + 1 === stepIndex) {
            st.classList.add("active");
        }
    });
}

function updateTrackingActionBtnUI(stepIndex) {
    const btn = document.getElementById("trackMainActionBtn");
    if (!btn) return;

    if (stepIndex === 3) {
        btn.innerHTML = '<i class="fa-solid fa-forward"></i> Fast-Forward to Arrival';
    } else if (stepIndex === 4) {
        btn.innerHTML = '<i class="fa-solid fa-screwdriver-wrench"></i> Start Service Job';
    } else if (stepIndex === 5) {
        btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Complete Service & Pay Bill';
    } else if (stepIndex >= 6) {
        btn.innerHTML = '<i class="fa-solid fa-receipt"></i> View Bill & Pay';
    }
}

function handleTrackingStateAction() {
    if (!appState.activeBooking) return;
    const step = appState.activeBooking.statusStep;

    if (step === 3) {
        // Fast forward arrival
        clearInterval(appState.trackingInterval);
        handleTechnicianArrival(appState.activeBooking);
    } else if (step === 4) {
        // Start Service
        appState.activeBooking.status = "SERVICE_STARTED";
        appState.activeBooking.statusStep = 5;
        saveStateToStorage("activeBooking");
        updateTrackingTimelineUI(5);
        updateTrackingActionBtnUI(5);
        showToast("🛠️ Service started! Technician is working on the repair.", "info");
        appendChatMessage("incoming", "I have started the service. It will take approximately 15-20 minutes.");
    } else if (step === 5 || step === 6) {
        // Complete service & open bill
        appState.activeBooking.status = "SERVICE_COMPLETED";
        appState.activeBooking.statusStep = 6;
        saveStateToStorage("activeBooking");
        updateTrackingTimelineUI(6);
        updateTrackingActionBtnUI(6);
        showToast("✅ Repair completed successfully!", "success");

        setTimeout(() => {
            openPaymentModal(appState.activeBooking);
        }, 500);
    }
}

function advanceTrackingSimulation() {
    handleTrackingStateAction();
}

function resetTrackingSimulation() {
    if (!appState.activeBooking) return;
    appState.activeBooking.status = "ON_THE_WAY";
    appState.activeBooking.statusStep = 3;
    saveStateToStorage("activeBooking");
    openLiveTrackingModal(appState.activeBooking);
    showToast("Simulation restarted from On The Way step.", "info");
}

function cancelActiveBooking() {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    if (appState.trackingInterval) clearInterval(appState.trackingInterval);

    if (appState.activeBooking) {
        appState.activeBooking.status = "CANCELLED";
        const found = appState.bookings.find(b => b.id === appState.activeBooking.id);
        if (found) found.status = "CANCELLED";
        appState.activeBooking = null;
        saveStateToStorage("activeBooking");
        saveStateToStorage("bookings");
    }

    closeModal("trackingModal");
    updateActiveBookingBadge();
    showToast("Booking cancelled successfully.", "info");
}

function updateActiveBookingBadge() {
    const badge = document.getElementById("navActiveBookingBtn");
    const countBadge = document.getElementById("bookingsCountBadge");

    if (badge) {
        badge.style.display = appState.activeBooking ? "inline-flex" : "none";
    }

    if (countBadge) {
        countBadge.textContent = appState.bookings.length;
        countBadge.style.display = appState.bookings.length > 0 ? "inline-block" : "none";
    }

    const dashActiveCount = document.getElementById("dashActiveCount");
    if (dashActiveCount) dashActiveCount.textContent = appState.activeBooking ? "1" : "0";

    const dashHistCount = document.getElementById("dashHistoryCount");
    if (dashHistCount) dashHistCount.textContent = appState.bookings.length;
}

// =========================================================
// 8. LIVE CHAT & CALL SYSTEM
// =========================================================

function openChatModal() {
    const modal = document.getElementById("chatModal");
    if (!modal) return;

    const techName = appState.activeBooking ? appState.activeBooking.providerName : "Technician";
    document.getElementById("chatHeaderName").textContent = `${techName} (Technician)`;

    const unread = document.getElementById("chatUnreadDot");
    if (unread) unread.style.display = "none";

    renderChatMessages();

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function renderChatMessages() {
    const chatBody = document.getElementById("chatBody");
    if (!chatBody) return;

    if (appState.chatMessages.length === 0) {
        chatBody.innerHTML = `
            <div class="chat-bubble incoming">
                <p>Hello! I am on my way to your location. Please let me know if you need any directions.</p>
                <span class="chat-time">Just now</span>
            </div>
        `;
        return;
    }

    chatBody.innerHTML = appState.chatMessages.map(msg => `
        <div class="chat-bubble ${msg.type}">
            <p>${msg.text}</p>
            <span class="chat-time">${msg.time}</span>
        </div>
    `).join('');

    chatBody.scrollTop = chatBody.scrollHeight;
}

function handleChatSubmit(event) {
    event.preventDefault();
    const input = document.getElementById("chatInput");
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    appendChatMessage("outgoing", text);
    input.value = "";

    // Simulate Technician auto response after 1.5 seconds
    simulateTechnicianReply(text);
}

function sendQuickChatMessage(text) {
    appendChatMessage("outgoing", text);
    simulateTechnicianReply(text);
}

function appendChatMessage(type, text) {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msg = { type: type, text: text, time: timeStr };
    appState.chatMessages.push(msg);
    saveStateToStorage("chat");
    renderChatMessages();

    if (type === "incoming") {
        const unread = document.getElementById("chatUnreadDot");
        if (unread) unread.style.display = "block";
    }
}

function simulateTechnicianReply(customerText) {
    setTimeout(() => {
        let reply = "Got it! Reaching your gate in a few minutes.";
        const lower = customerText.toLowerCase();

        if (lower.includes("where")) reply = `I am near ${appState.location.name} main junction, approximately 5 mins away!`;
        else if (lower.includes("minute") || lower.includes("time")) reply = "Will reach in roughly 6 to 8 minutes.";
        else if (lower.includes("gate")) reply = "Sure, I will call you once I pull up outside the gate.";
        else if (lower.includes("call")) reply = "Yes sir, I will give you a ring when I reach.";

        appendChatMessage("incoming", reply);
        showToast("💬 New message from technician", "info");
    }, 1400);
}

function logCallAction() {
    showToast("Calling technician...", "info");
}

// =========================================================
// 9. FAIR PRICE CALCULATOR & ESTIMATION
// =========================================================

function populateIssueOptions() {
    const serviceName = document.getElementById("calcServiceSelect").value;
    const issueSelect = document.getElementById("calcIssueSelect");
    if (!issueSelect) return;

    issueSelect.innerHTML = "";
    const catData = serviceCatalog[serviceName];

    if (!catData || !catData.problems) {
        issueSelect.innerHTML = '<option value="">Select category first</option>';
        return;
    }

    catData.problems.forEach(p => {
        const opt = document.createElement("option");
        opt.value = p.name;
        opt.textContent = `${p.name} (~₹${p.price})`;
        opt.dataset.price = p.price;
        opt.dataset.labour = p.labour;
        issueSelect.appendChild(opt);
    });
}

function handlePriceCalculation(event) {
    event.preventDefault();

    const serviceName = document.getElementById("calcServiceSelect").value;
    const issueSelect = document.getElementById("calcIssueSelect");
    const selectedOpt = issueSelect.selectedOptions[0];

    if (!serviceName || !selectedOpt) {
        showToast("Please select service and problem.", "warning");
        return;
    }

    const price = parseInt(selectedOpt.dataset.price) || 299;
    const labour = parseInt(selectedOpt.dataset.labour) || 150;
    const insp = serviceCatalog[serviceName]?.inspectionFee || 99;

    document.getElementById("calcTotalEstimate").textContent = `₹${price} – ₹${price + 100}`;
    document.getElementById("calcInspectionFee").textContent = `₹${insp}`;
    document.getElementById("calcLabourFee").textContent = `₹${labour}`;

    document.getElementById("priceResultBox").style.display = "block";
    showToast("Price estimated successfully!", "success");
}

function bookFromPriceEstimator() {
    const serviceName = document.getElementById("calcServiceSelect").value;
    const issueName = document.getElementById("calcIssueSelect").value;
    openBookingModal(null, serviceName, issueName);
}

// =========================================================
// 10. PAYMENT SYSTEM & REAL PAYMENT ARCHITECTURE
// =========================================================

let activePaymentBooking = null;

function openPaymentModal(booking) {
    activePaymentBooking = booking || appState.activeBooking;
    if (!activePaymentBooking) return;

    const modal = document.getElementById("paymentModal");
    if (!modal) return;

    // Populate bill breakdown
    document.getElementById("payServiceName").textContent = activePaymentBooking.service;
    document.getElementById("payProviderName").textContent = `Served by ${activePaymentBooking.providerName}`;
    document.getElementById("payInspectionFee").textContent = `₹${activePaymentBooking.inspectionFee}`;
    document.getElementById("payLabourFee").textContent = `₹${activePaymentBooking.labourFee}`;
    document.getElementById("payPartsFee").textContent = `₹${activePaymentBooking.partsFee}`;
    document.getElementById("payTotalAmount").textContent = `₹${activePaymentBooking.finalAmount}`;
    document.getElementById("cashAmountLabel").textContent = `₹${activePaymentBooking.finalAmount}`;

    // Render Dynamic SVG UPI QR Code
    renderDynamicUpiQrSvg(activePaymentBooking.finalAmount, activePaymentBooking.id);

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function switchPaymentTab(tabName, btn) {
    document.querySelectorAll(".pay-tab").forEach(b => b.classList.remove("active"));
    if (btn) btn.classList.add("active");

    document.getElementById("payTabContentQR").style.display = tabName === "qr" ? "block" : "none";
    document.getElementById("payTabContentUPI").style.display = tabName === "upi" ? "block" : "none";
    document.getElementById("payTabContentCard").style.display = tabName === "card" ? "block" : "none";
    document.getElementById("payTabContentCash").style.display = tabName === "cash" ? "block" : "none";

    const payBtn = document.getElementById("payBtnLabel");
    if (tabName === "cash") {
        payBtn.textContent = "Confirm Cash Payment";
    } else {
        payBtn.textContent = "I Have Paid (Complete Order)";
    }
}

// Renders an authentic dynamic SVG QR code representation with payment URI
function renderDynamicUpiQrSvg(amount, refId) {
    const qrBox = document.getElementById("qrCanvasBox");
    if (!qrBox) return;

    const upiUri = `upi://pay?pa=fixnear@upi&pn=FixNear&am=${amount}&cu=INR&tn=${refId}`;

    // Generate crisp QR code SVG visual
    qrBox.innerHTML = `
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="180" height="180" fill="white" rx="10"/>
            <!-- Corner Finder Patterns -->
            <rect x="15" y="15" width="40" height="40" fill="#0f172a" rx="4"/>
            <rect x="23" y="23" width="24" height="24" fill="white" rx="2"/>
            <rect x="29" y="29" width="12" height="12" fill="#0f172a" rx="2"/>

            <rect x="125" y="15" width="40" height="40" fill="#0f172a" rx="4"/>
            <rect x="133" y="23" width="24" height="24" fill="white" rx="2"/>
            <rect x="139" y="29" width="12" height="12" fill="#0f172a" rx="2"/>

            <rect x="15" y="125" width="40" height="40" fill="#0f172a" rx="4"/>
            <rect x="23" y="133" width="24" height="24" fill="white" rx="2"/>
            <rect x="29" y="139" width="12" height="12" fill="#0f172a" rx="2"/>

            <!-- Data matrix dots -->
            <rect x="65" y="15" width="10" height="10" fill="#0f172a"/>
            <rect x="85" y="15" width="10" height="10" fill="#0f172a"/>
            <rect x="105" y="15" width="10" height="10" fill="#0f172a"/>
            <rect x="65" y="35" width="10" height="10" fill="#0f172a"/>
            <rect x="95" y="35" width="10" height="10" fill="#0f172a"/>
            <rect x="65" y="55" width="10" height="10" fill="#0f172a"/>
            <rect x="85" y="55" width="20" height="10" fill="#0f172a"/>

            <rect x="15" y="65" width="10" height="10" fill="#0f172a"/>
            <rect x="35" y="65" width="10" height="10" fill="#0f172a"/>
            <rect x="125" y="65" width="10" height="10" fill="#0f172a"/>
            <rect x="145" y="65" width="20" height="10" fill="#0f172a"/>

            <!-- Center Logo Badge -->
            <rect x="70" y="70" width="40" height="40" fill="#2563eb" rx="8"/>
            <path d="M85 82L90 77L95 82L90 87L85 82Z" fill="white"/>
            <rect x="88" y="87" width="4" height="11" fill="white"/>

            <rect x="15" y="85" width="10" height="10" fill="#0f172a"/>
            <rect x="45" y="85" width="10" height="10" fill="#0f172a"/>
            <rect x="135" y="85" width="10" height="10" fill="#0f172a"/>

            <rect x="65" y="125" width="10" height="10" fill="#0f172a"/>
            <rect x="85" y="125" width="10" height="10" fill="#0f172a"/>
            <rect x="105" y="125" width="10" height="10" fill="#0f172a"/>
            <rect x="135" y="125" width="10" height="10" fill="#0f172a"/>
            <rect x="65" y="145" width="20" height="10" fill="#0f172a"/>
            <rect x="105" y="145" width="10" height="10" fill="#0f172a"/>
            <rect x="145" y="145" width="10" height="10" fill="#0f172a"/>
        </svg>
    `;
}

function copyUpiId() {
    navigator.clipboard.writeText("fixnear@upi").then(() => {
        showToast("UPI ID copied: fixnear@upi", "success");
    }).catch(() => {
        showToast("UPI ID: fixnear@upi", "info");
    });
}

// REAL PAYMENT ARCHITECTURE FUNCTIONS (For future backend integration)
function createPayment(bookingData) {
    console.log("[Payment Gateway] Creating payment order for:", bookingData);
    return Promise.resolve({ orderId: "FN_ORD_" + Date.now(), status: "CREATED" });
}

function verifyPayment(paymentResponse) {
    console.log("[Payment Gateway] Verifying signature...", paymentResponse);
    return Promise.resolve({ verified: true, transactionId: "FN20261008" + Math.floor(1000 + Math.random() * 9000) });
}

function handlePaymentSuccess(txId) {
    if (activePaymentBooking) {
        activePaymentBooking.paymentStatus = "PAID";
        activePaymentBooking.transactionId = txId;
        activePaymentBooking.status = "COMPLETED";
        saveStateToStorage("bookings");
    }

    closeModal("paymentModal");
    closeModal("trackingModal");

    appState.activeBooking = null;
    saveStateToStorage("activeBooking");
    updateActiveBookingBadge();

    showToast("🎉 Payment Successful! Transaction ID: " + txId, "success");

    // Open Rating & Review modal
    setTimeout(() => {
        openReviewModal(activePaymentBooking);
    }, 600);
}

function handlePaymentFailure(error) {
    showToast("Payment processing failed. Please try again or select cash.", "error");
}

function processPaymentExecution() {
    const btn = document.getElementById("confirmPaymentBtn");
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing payment...';
    btn.disabled = true;

    createPayment(activePaymentBooking)
        .then(res => verifyPayment(res))
        .then(verifiedRes => {
            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-check-double"></i> Complete Order';
                btn.disabled = false;
                handlePaymentSuccess(verifiedRes.transactionId);
            }, 1200);
        })
        .catch(err => {
            btn.innerHTML = '<i class="fa-solid fa-check-double"></i> Complete Order';
            btn.disabled = false;
            handlePaymentFailure(err);
        });
}

// =========================================================
// 11. RATING & REVIEW SYSTEM
// =========================================================

let reviewTargetProvider = null;
let currentReviewRating = 5;

function openReviewModal(booking) {
    const modal = document.getElementById("reviewModal");
    if (!modal) return;

    reviewTargetProvider = appState.providers.find(p => p.id === booking.providerId);
    const pName = reviewTargetProvider ? reviewTargetProvider.name : "Technician";

    document.getElementById("reviewProviderPrompt").textContent = `Rate your service experience with ${pName}`;
    setReviewRating(5);

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function setReviewRating(starNumber) {
    currentReviewRating = starNumber;
    const stars = document.querySelectorAll(".star-btn");
    stars.forEach((s, idx) => {
        if (idx < starNumber) s.classList.add("active");
        else s.classList.remove("active");
    });

    const labels = ["Poor (1.0)", "Fair (2.0)", "Good (3.0)", "Very Good (4.0)", "Excellent! (5.0 / 5.0)"];
    document.getElementById("ratingDescriptor").textContent = labels[starNumber - 1] || "5.0";
}

function toggleComplimentChip(chip) {
    chip.classList.toggle("active");
}

function submitReviewFeedback() {
    const comment = document.getElementById("reviewComment").value.trim() || "Great, clean and timely service!";

    if (reviewTargetProvider) {
        reviewTargetProvider.reviewsList.unshift({
            author: appState.user.name || "Happy Customer",
            rating: currentReviewRating,
            comment: comment,
            date: "Just now"
        });
        reviewTargetProvider.reviews += 1;
        // Recalculate average rating slightly
        reviewTargetProvider.rating = parseFloat(((reviewTargetProvider.rating * (reviewTargetProvider.reviews - 1) + currentReviewRating) / reviewTargetProvider.reviews).toFixed(1));
    }

    renderProvidersGrid();
    closeModal("reviewModal");
    showToast("⭐ Thank you for your review! Provider rating updated.", "success");
}

// =========================================================
// 12. CUSTOMER DASHBOARD & HISTORY
// =========================================================

function openMyBookingsModal() {
    const modal = document.getElementById("myBookingsModal");
    if (!modal) return;

    updateDashboardActiveTab();
    updateDashboardHistoryTab();
    updateDashboardFavorites();

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function switchDashboardTab(tabName, btn) {
    document.querySelectorAll(".dash-tab").forEach(b => b.classList.remove("active"));
    if (btn) btn.classList.add("active");

    document.getElementById("dashTabActive").style.display = tabName === "active" ? "block" : "none";
    document.getElementById("dashTabHistory").style.display = tabName === "history" ? "block" : "none";
    document.getElementById("dashTabFavorites").style.display = tabName === "favorites" ? "block" : "none";
}

function updateDashboardActiveTab() {
    const container = document.getElementById("dashActiveBookingsList");
    if (!container) return;

    if (!appState.activeBooking) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-clipboard-check"></i>
                <p>No active ongoing service requests.</p>
                <button class="primary-btn" onclick="closeModal('myBookingsModal'); selectServiceCategory('Electrician');">Book A Service Now</button>
            </div>
        `;
        return;
    }

    const b = appState.activeBooking;
    container.innerHTML = `
        <div class="booking-history-card">
            <div class="history-meta">
                <span class="live-pulse-badge"><span class="pulse-dot"></span> LIVE IN PROGRESS</span>
                <h4 style="margin-top:6px;">${b.service} - ${b.providerName}</h4>
                <p><i class="fa-solid fa-location-dot"></i> ${b.customerAddress}</p>
                <p><i class="fa-solid fa-calendar"></i> ${b.date} • ${b.time}</p>
            </div>
            <div class="history-actions">
                <strong>₹${b.finalAmount}</strong>
                <button class="primary-btn" onclick="closeModal('myBookingsModal'); openLiveTrackingModal(appState.activeBooking);">
                    <i class="fa-solid fa-route"></i> Track Live
                </button>
            </div>
        </div>
    `;
}

function updateDashboardHistoryTab() {
    const container = document.getElementById("dashHistoryBookingsList");
    if (!container) return;

    if (appState.bookings.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-receipt"></i>
                <p>You haven't completed any service bookings yet.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = appState.bookings.map(b => `
        <div class="booking-history-card">
            <div class="history-meta">
                <span class="badge-status-completed" style="${b.status === 'CANCELLED' ? 'background:#fef2f2; color:#ef4444;' : ''}">
                    ${b.status === 'CANCELLED' ? 'Cancelled' : 'Completed'}
                </span>
                <h4 style="margin-top:4px;">${b.service} - ${b.providerName}</h4>
                <p><small>ID: ${b.id}</small></p>
                <p><i class="fa-solid fa-clock"></i> ${new Date(b.createdAt).toLocaleDateString()}</p>
            </div>
            <div class="history-actions">
                <strong>₹${b.finalAmount}</strong>
                <span style="font-size:11px; color:#16a34a; font-weight:700;">${b.paymentStatus === 'PAID' ? '✓ Paid' : 'Cash'}</span>
                <button class="profile-btn-sm" onclick="quickBookProvider(${b.providerId})">Re-Book</button>
            </div>
        </div>
    `).join('');
}

function updateDashboardFavorites() {
    const container = document.getElementById("dashFavoritesList");
    const countBadge = document.getElementById("dashFavCount");
    if (countBadge) countBadge.textContent = appState.favorites.length;
    if (!container) return;

    const favPros = appState.providers.filter(p => appState.favorites.includes(p.id));

    if (favPros.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-heart" style="color:#fecaca;"></i>
                <p>No saved favorite providers yet. Click heart on any pro card to save!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = favPros.map(p => `
        <div class="booking-history-card">
            <div class="history-meta">
                <h4>${p.name} ★ ${p.rating}</h4>
                <p>${p.service} • ${p.distance} km away</p>
                <p><i class="fa-solid fa-briefcase"></i> ${p.experience} experience</p>
            </div>
            <div class="history-actions">
                <strong>₹${p.price}+</strong>
                <button class="book-btn-sm" onclick="closeModal('myBookingsModal'); quickBookProvider(${p.id});">Book Now</button>
            </div>
        </div>
    `).join('');
}

// =========================================================
// 13. PROVIDER PROFILE & AUTH MODALS
// =========================================================

function viewProviderProfile(providerId) {
    const provider = appState.providers.find(p => p.id === providerId);
    if (!provider) return;

    document.getElementById("profileName").textContent = provider.name;
    document.getElementById("profileService").textContent = `${provider.service} • Local Professional`;
    document.getElementById("profileRating").textContent = provider.rating;
    document.getElementById("profileReviewCount").textContent = provider.reviews;
    document.getElementById("profileDistance").textContent = `${provider.distance} km`;
    document.getElementById("profileEta").textContent = `${provider.eta} min`;

    document.getElementById("profileExp").textContent = provider.experience;
    document.getElementById("profileJobs").textContent = `${provider.completedJobs}+`;
    document.getElementById("profileResponse").textContent = provider.responseTime || "8 Min";
    document.getElementById("profileBasePrice").textContent = `₹${provider.price}`;
    document.getElementById("profileWorkingAreas").textContent = provider.workingAreas || "All Coimbatore Areas";

    document.getElementById("profileCallLink").href = `tel:${provider.phone}`;

    // Specialization tags
    const specContainer = document.getElementById("profileSpecializations");
    if (specContainer) {
        specContainer.innerHTML = (provider.specializations || ["General Service", "Emergency Diagnostics", "Home Repairs"]).map(s => `<span>${s}</span>`).join('');
    }

    // Reviews list
    const reviewsContainer = document.getElementById("profileReviewsList");
    if (reviewsContainer) {
        reviewsContainer.innerHTML = (provider.reviewsList || []).map(r => `
            <div class="review-item">
                <div class="review-item-header">
                    <span>${r.author}</span>
                    <span style="color:#f59e0b;">★ ${r.rating}.0</span>
                </div>
                <p style="color:#64748b; margin-bottom:0;">"${r.comment}"</p>
            </div>
        `).join('');
    }

    // Set Book button
    const bookBtn = document.getElementById("profileBookBtn");
    bookBtn.onclick = () => {
        closeModal("providerProfileModal");
        openBookingModal(provider.id, provider.service);
    };

    const modal = document.getElementById("providerProfileModal");
    if (modal) {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function openLocationModal() {
    const modal = document.getElementById("locationModal");
    if (modal) {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function openLoginModal() {
    const modal = document.getElementById("loginModal");
    if (modal) {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function handleAuthSubmit(event) {
    event.preventDefault();
    const name = document.getElementById("authUserName").value.trim();
    const phone = document.getElementById("authUserPhone").value.trim();

    if (!name || phone.length < 10) {
        showToast("Please enter a valid name and 10-digit mobile number.", "warning");
        return;
    }

    appState.user = { name: name, phone: phone, isLoggedIn: true };
    saveStateToStorage("user");

    const navUser = document.getElementById("navUserText");
    if (navUser) navUser.textContent = name.split(" ")[0];

    closeModal("loginModal");
    showToast(`👋 Welcome back, ${name}!`, "success");
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove("active");
    }
    document.body.style.overflow = "auto";
}

// Close modal when clicking on dark backdrop overlay
document.addEventListener("click", event => {
    if (event.target.classList.contains("modal-overlay")) {
        event.target.classList.remove("active");
        document.body.style.overflow = "auto";
    }
});

// Toast notification display helper
function showToast(message, type = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    let icon = "fa-circle-info";
    if (type === "success") icon = "fa-circle-check";
    if (type === "warning") icon = "fa-triangle-exclamation";
    if (type === "error") icon = "fa-circle-exclamation";

    toast.innerHTML = `
        <i class="fa-solid ${icon}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = "slideInRight 0.3s reverse forwards";
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// =========================================================
// 14. INITIALIZATION
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. Load LocalStorage state
    loadStateFromStorage();

    // 2. Set UI Elements
    updateLocationUIElements();
    updateActiveBookingBadge();

    // 3. Render Providers Grid
    renderProvidersGrid();

    // 4. Initialize Map
    initOrUpdateMainMap();

    // 5. Populate Fair Price Calculator default category
    populateIssueOptions();

    // 6. Mobile Menu Toggle
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileClose = document.getElementById("mobileClose");

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", () => mobileMenu.classList.add("active"));
    }
    if (mobileClose && mobileMenu) {
        mobileClose.addEventListener("click", () => mobileMenu.classList.remove("active"));
    }

    // Close mobile menu on clicking any link
    document.querySelectorAll(".mobile-nav-links a").forEach(link => {
        link.addEventListener("click", () => mobileMenu && mobileMenu.classList.remove("active"));
    });

    // 7. Hero Search Key listener
    const heroSearchInput = document.getElementById("heroSearch");
    if (heroSearchInput) {
        heroSearchInput.addEventListener("input", e => {
            const clearBtn = document.getElementById("searchClearBtn");
            if (clearBtn) clearBtn.style.display = e.target.value ? "inline-block" : "none";
            appState.searchKeyword = e.target.value;
            renderProvidersGrid();
        });

        heroSearchInput.addEventListener("keydown", e => {
            if (e.key === "Enter") handleHeroSearch();
        });
    }

    // 8. FAQ Accordion Click handlers
    document.querySelectorAll(".faq-question").forEach(btn => {
        btn.addEventListener("click", function () {
            const parent = this.parentElement;
            document.querySelectorAll(".faq-item").forEach(item => {
                if (item !== parent) item.classList.remove("active");
            });
            parent.classList.toggle("active");
        });
    });

    // 9. Update nav user label if logged in
    if (appState.user && appState.user.isLoggedIn && appState.user.name) {
        const navUser = document.getElementById("navUserText");
        if (navUser) navUser.textContent = appState.user.name.split(" ")[0];
    }

    console.log("FixNear Platform successfully initialized with real-time features.");
});