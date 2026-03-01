export interface PricingConfig {
  /** Precio base por noche en temporada baja */
  basePrice: number;

  /** Porcentaje de incremento para fines de semana (viernes, sábado, domingo). Ej: 1.20 = +20% */
  weekendMultiplier: number;

  /** Porcentaje de incremento para temporada media. Ej: 1.30 = +30% respecto al base */
  midSeasonMultiplier: number;

  /** Porcentaje de incremento para temporada alta. Ej: 1.80 = +80% respecto al base */
  highSeasonMultiplier: number;

  /** 
   * Meses de temporada baja (0 = Enero, 11 = Diciembre).
   * Los meses que no estén en mid o high se consideran temporada baja.
   */
  lowSeasonMonths: number[];

  /** Meses de temporada media (0 = Enero, 11 = Diciembre). */
  midSeasonMonths: number[];

  /** Meses de temporada alta (0 = Enero, 11 = Diciembre). */
  highSeasonMonths: number[];

  /**
   * Días festivos (se cobrarán como fin de semana de temporada alta).
   * Formato: 'YYYY-MM-DD' o 'MM-DD' (si se aplica todos los años).
   */
  holidays: string[];
}

export const pricingConfig: PricingConfig = {
  // Precio por defecto en temporada baja (lu-ju)
  basePrice: 85,

  // Fin de semana implica un 20% más sobre el precio de la temporada
  weekendMultiplier: 1.20,

  // La temporada media base cuesta un 30% más que la temporada baja base
  midSeasonMultiplier: 1.30, 

  // La temporada alta base cuesta un 80% más que la temporada baja base
  highSeasonMultiplier: 1.80,

  // Temporada baja: Noviembre, Diciembre, Enero, Febrero, Marzo (excepto indicados abajo)
  lowSeasonMonths: [0, 1, 2, 10, 11],

  // Temporada media: Abril, Mayo, Octubre
  midSeasonMonths: [3, 4, 9],

  // Temporada alta: Junio, Julio, Agosto, Septiembre
  highSeasonMonths: [5, 6, 7, 8],

  // Días festivos específicos que se cobran a precio de fin de semana + temporada alta
  holidays: [
    '02-28', // Día de Andalucía
    '12-25', // Navidad
    '01-01', // Año nuevo
    // Puedes añadir fechas específicas como '2026-04-02' (Semana Santa)
  ]
};
