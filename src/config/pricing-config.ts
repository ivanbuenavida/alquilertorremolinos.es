export interface PricingConfig {
  /** Base price per night during low season */
  basePrice: number;

  /** Percentage increase for weekends (Friday, Saturday, Sunday). Ex: 1.20 = +20% */
  weekendMultiplier: number;

  /** Percentage increase for mid season. Ex: 1.30 = +30% over base */
  midSeasonMultiplier: number;

  /** Percentage increase for high season. Ex: 1.80 = +80% over base */
  highSeasonMultiplier: number;

  /** Minimum nights required. [Low, Mid, High] */
  minNights: {
    low: number;
    mid: number;
    high: number;
  };

  /** 
   * Low season months (0 = January, 11 = December).
   * Months not in mid or high are considered low season.
   */
  lowSeasonMonths: number[];

  /** Mid season months (0 = January, 11 = December). */
  midSeasonMonths: number[];

  /** High season months (0 = January, 11 = December). */
  highSeasonMonths: number[];

  /**
   * Holidays (charged as high season weekend).
   * Format: 'YYYY-MM-DD' or 'MM-DD' (if applies every year).
   */
  holidays: string[];

  /**
   * Discounts based on stay duration.
   * Format: { [days]: multiplier } where 0.80 = -20%
   */
  discounts: {
    weekly: number;      // 7 days
    biweekly: number;    // 14 days
    monthly: number;     // 30 days
  };
}

export const pricingConfig: PricingConfig = {
  // Default price during low season (Mon-Thu)
  basePrice: 80,

  // Weekend implies a 20% increase over the seasonal price
  weekendMultiplier: 1.20,

  // Base mid season costs 30% more than base low season
  midSeasonMultiplier: 1.30, 

  // Base high season costs 80% more than base low season
  highSeasonMultiplier: 1.80,

  // Minimum nights depending on the season of the start date
  minNights: {
    low: 3,
    mid: 4,
    high: 7
  },

  // Low season: November, December, January, February, March (except indicated below)
  lowSeasonMonths: [0, 1, 2, 10, 11],

  // Mid season: April, May, October
  midSeasonMonths: [3, 4, 9],

  // High season: June, July, August, September
  highSeasonMonths: [5, 6, 7, 8],

  // Specific holidays charged at high season weekend price
  holidays: [
    '02-28', // Andalusia Day
    '12-25', // Christmas
    '01-01', // New Year
    // You can add specific dates like '2026-04-02' (Holy Week)
  ],

  // Discounts: 7d = 20%, 14d = 30%, 30d = 40%
  discounts: {
    weekly: 0.80,
    biweekly: 0.75,
    monthly: 0.70
  }
};
