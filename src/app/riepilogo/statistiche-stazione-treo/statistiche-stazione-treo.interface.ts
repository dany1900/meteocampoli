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
