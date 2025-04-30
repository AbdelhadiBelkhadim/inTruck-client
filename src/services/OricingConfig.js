// Pricing configuration for inTruck
// This file contains pricing parameters used for calculating delivery costs

export const pricingConfig = {
  // Base price for any delivery in DHM
  basePrice: 50,
  
  // Price per kilometer in DHM
  pricePerKm: 5,
  
  // Weight pricing tiers in DHM per kg
  weightPricing: {
    // Weight <= 5kg
    light: {
      multiplier: 1.0,
      description: 'Light package (up to 5kg)'
    },
    // Weight > 5kg and <= 20kg
    medium: {
      multiplier: 1.3,
      description: 'Medium package (5-20kg)'
    },
    // Weight > 20kg
    heavy: {
      multiplier: 1.8,
      description: 'Heavy package (over 20kg)'
    }
  },
  
  // Minimum price in DHM
  minimumPrice: 70,
  
  // Express delivery multiplier
  expressMultiplier: 1.5,
  
  // Vehicle types and their multipliers
  vehicleTypes: {
    motorcycle: {
      multiplier: 0.8,
      maxWeight: 15,
      description: 'Motorcycle (up to 15kg)'
    },
    car: {
      multiplier: 1.0,
      maxWeight: 50,
      description: 'Car (up to 50kg)'
    },
    van: {
      multiplier: 1.3,
      maxWeight: 200,
      description: 'Van (up to 200kg)'
    },
    truck: {
      multiplier: 2.0,
      maxWeight: 1000,
      description: 'Truck (up to 1000kg)'
    }
  },
  
  // City-specific pricing adjustments
  cityMultipliers: {
    'Casablanca': 1.2,
    'Rabat': 1.15,
    'Marrakech': 1.1,
    'Tangier': 1.1,
    // Add more cities as needed
    'default': 1.0
  },
  
  // Distance tiers for varying prices
  distanceTiers: [
    { maxKm: 10, multiplier: 1.2 },   // 0-10km: higher price per km
    { maxKm: 50, multiplier: 1.0 },   // 10-50km: standard price
    { maxKm: 200, multiplier: 0.8 },  // 50-200km: slightly discounted
    { maxKm: null, multiplier: 0.7 }  // >200km: more discounted for long distances
  ],
  
  // Calculate price based on distance and package details
  calculatePrice: function(distanceKm, packageDetails, options = {}) {
    // Get the appropriate weight multiplier
    let weightMultiplier = 1.0;
    if (packageDetails.weight <= 5) {
      weightMultiplier = this.weightPricing.light.multiplier;
    } else if (packageDetails.weight <= 20) {
      weightMultiplier = this.weightPricing.medium.multiplier;
    } else {
      weightMultiplier = this.weightPricing.heavy.multiplier;
    }
    
    // Get distance tier multiplier
    let distanceMultiplier = 1.0;
    for (const tier of this.distanceTiers) {
      if (tier.maxKm === null || distanceKm <= tier.maxKm) {
        distanceMultiplier = tier.multiplier;
        break;
      }
    }
    
    // Get city multiplier (if provided)
    const cityMultiplier = options.city ? 
      (this.cityMultipliers[options.city] || this.cityMultipliers.default) : 
      this.cityMultipliers.default;
    
    // Get vehicle multiplier (if provided)
    const vehicleMultiplier = options.vehicleType ? 
      (this.vehicleTypes[options.vehicleType]?.multiplier || 1.0) : 
      1.0;
    
    // Express delivery multiplier (if requested)
    const expressMultiplier = options.express ? this.expressMultiplier : 1.0;
    
    // Calculate the final price
    let price = this.basePrice + (distanceKm * this.pricePerKm * distanceMultiplier);
    price *= weightMultiplier;
    price *= cityMultiplier;
    price *= vehicleMultiplier;
    price *= expressMultiplier;
    
    // Ensure minimum price
    price = Math.max(price, this.minimumPrice);
    
    // Round to 2 decimal places
    return Math.round(price * 100) / 100;
  }
}; 