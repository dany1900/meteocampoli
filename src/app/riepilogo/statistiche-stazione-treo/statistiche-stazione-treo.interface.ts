export interface DatoGiornalieroRaw {
  giorno: string;
  mese: number;
  anno: number;
  tempMin: number;
  tempMax: number;
  tempMedia: number;
  ventoMax: number;
  pressioneMin: number;
  pressioneMax: number;
  umiditaMin: number;
  umiditaMax: number;
  pioggia: number;
  pioggiaGiornalieraMax?: number;
}

export interface AnnualRaw {
  totalRain: number;

  maxRainDay: number;        // pioggia giornaliera max (24h se disponibile)
  maxRainDayDate: string;

  minTemp: number;
  minTempDate: string;
  maxTemp: number;
  maxTempDate: string;

  tempMean: number;          // temperatura media annuale stimata

  windMax: number;           // raffica max annua
  pressureMin: number;       // pressione relativa minima annua
  pressureMax: number;       // pressione relativa massima annua
}







export interface StatisticheStazioneTreoInterface {
  giorno?: string;
  tempMin?: string;
  tempMax: string;
  tempMedia: string;
  ventoMax: string;
  pioggia: string;
  pioggiaMaxEvento?: string;
  umiditaMax?: string;
  umiditaMin?: string;
  pressioneMax?: string;
  pressioneMin?: string;
  pioggiaMese?: string;
  pioggiaAnno?: string;
  tempMinMese?: string;
  tempMaxMese?: string;
  tempMediaMese?: string;
  ventoMaxMese?: string;
  umiditaMaxMese?: string;
  pioggiaGiornalieraMax?: string;
}
