import { pricingConfig, type PricingConfig } from '../config/pricing-config';

export type Season = 'low' | 'mid' | 'high';

export interface PriceDetails {
  subtotal: number;
  longStayDiscountLabel: string;
  longStayPercent: number;
  longStayDiscountAmount: number;
  isEarlyBird: boolean;
  earlyBirdPercent: number;
  earlyBirdDiscountAmount: number;
  finalPrice: number;
  depositAmount: number;
  depositPercent: number;
}

export class PricingService {
  private config: PricingConfig;

  constructor(config: PricingConfig = pricingConfig) {
    this.config = config;
  }

  getPriceAndSeasonForDate(date: Date): { price: number, season: Season } {
    const month = date.getMonth(); // 0-indexed
    
    // Check if it's a holiday
    const specificDateString = date.toISOString().split('T')[0]; // YYYY-MM-DD
    const recurringDateString = specificDateString.substring(5); // MM-DD
    const isHoliday = this.config.holidays.includes(specificDateString) || 
                      this.config.holidays.includes(recurringDateString);

    let price = this.config.basePrice;
    let season: Season = 'low';

    // Determine seasonal base price
    if (isHoliday || this.config.highSeasonMonths.includes(month)) {
      price = price * this.config.highSeasonMultiplier;
      season = 'high';
    } else if (this.config.midSeasonMonths.includes(month)) {
      price = price * this.config.midSeasonMultiplier;
      season = 'mid';
    }

    // Apply holiday surcharge (5%)
    if (isHoliday) {
      price = price * 1.05;
    }

    return { price: Math.round(price), season };
  }

  calculateBookingDetails(startDate: Date, endDate: Date, baseTotalPrice: number, translationService: any): PriceDetails {
    const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const subtotal = baseTotalPrice;
    
    let longStayDiscountLabel = '';
    let longStayMultiplier = 1;

    if (nights >= 30) {
      longStayDiscountLabel = translationService.l.cal_summary_discount_monthly;
      longStayMultiplier = this.config.discounts.monthly;
    } else if (nights >= 14) {
      longStayDiscountLabel = translationService.l.cal_summary_discount_monthly;
      longStayMultiplier = this.config.discounts.biweekly;
    } else if (nights >= 7) {
      longStayDiscountLabel = translationService.l.cal_summary_discount_weekly;
      longStayMultiplier = this.config.discounts.weekly;
    }

    const longStayDiscountAmount = Math.round(subtotal * (1 - longStayMultiplier));

    // Early Bird Logic: 2 months in advance
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const twoMonthsLater = new Date(today);
    twoMonthsLater.setMonth(today.getMonth() + 2);
    
    const isEarlyBird = startDate >= twoMonthsLater;
    const earlyBirdDiscountAmount = isEarlyBird ? Math.round(subtotal * (1 - this.config.discounts.earlyBird)) : 0;
    
    const finalPrice = subtotal - longStayDiscountAmount - earlyBirdDiscountAmount;
    const depositAmount = Math.round(finalPrice * this.config.depositPercent);

    return {
      subtotal,
      longStayDiscountLabel,
      longStayPercent: Math.round((1 - longStayMultiplier) * 100),
      longStayDiscountAmount,
      isEarlyBird,
      earlyBirdPercent: Math.round((1 - this.config.discounts.earlyBird) * 100),
      earlyBirdDiscountAmount,
      finalPrice,
      depositAmount,
      depositPercent: Math.round(this.config.depositPercent * 100)
    };
  }

  getMinNightsForSeason(season: Season): number {
    return this.config.minNights[season];
  }
}

export const pricingService = new PricingService();
