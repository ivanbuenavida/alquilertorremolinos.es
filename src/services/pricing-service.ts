import { pricingConfig, type PricingConfig } from '../config/pricing-config';

export type Season = 'low' | 'mid' | 'high';

export interface PriceDetails {
  subtotal: number;
  longStayDiscountLabel: string;
  longStayPercent: number;
  longStayDiscountAmount: number;
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
    
    // Check if it's a holiday (use local date components to avoid timezone shifts)
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    const specificDateString = `${y}-${m}-${d}`;
    const recurringDateString = `${m}-${d}`;
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

    const finalPrice = subtotal - longStayDiscountAmount;
    const depositAmount = Math.round(finalPrice * this.config.depositPercent);

    return {
      subtotal,
      longStayDiscountLabel,
      longStayPercent: Math.round((1 - longStayMultiplier) * 100),
      longStayDiscountAmount,
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
