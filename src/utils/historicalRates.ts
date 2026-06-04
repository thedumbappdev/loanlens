export interface HistoricalRateData {
  year: number;
  mortgage: number;
  personal: number;
  auto: number;
  business: number;
  student: number;
}

export const historicalRates: HistoricalRateData[] = [
  { year: 1970, mortgage: 8.5, personal: 12.0, auto: 9.5, business: 10.5, student: 7.0 },
  { year: 1971, mortgage: 7.6, personal: 11.0, auto: 8.8, business: 9.8, student: 6.5 },
  { year: 1972, mortgage: 7.4, personal: 10.5, auto: 8.5, business: 9.5, student: 6.0 },
  { year: 1973, mortgage: 8.2, personal: 11.5, auto: 9.2, business: 10.2, student: 6.5 },
  { year: 1974, mortgage: 9.5, personal: 13.0, auto: 10.5, business: 12.0, student: 7.5 },
  { year: 1975, mortgage: 9.0, personal: 12.5, auto: 10.0, business: 11.5, student: 7.0 },
  { year: 1976, mortgage: 8.8, personal: 12.0, auto: 9.8, business: 11.0, student: 6.8 },
  { year: 1977, mortgage: 8.9, personal: 11.8, auto: 9.5, business: 10.8, student: 6.5 },
  { year: 1978, mortgage: 9.6, personal: 12.5, auto: 10.2, business: 11.5, student: 7.0 },
  { year: 1979, mortgage: 10.8, personal: 14.0, auto: 11.5, business: 13.0, student: 8.0 },
  { year: 1980, mortgage: 12.9, personal: 17.0, auto: 13.5, business: 15.5, student: 9.0 },
  { year: 1981, mortgage: 14.7, personal: 19.0, auto: 15.5, business: 17.5, student: 10.0 },
  { year: 1982, mortgage: 13.8, personal: 17.5, auto: 14.0, business: 16.0, student: 9.5 },
  { year: 1983, mortgage: 12.0, personal: 15.0, auto: 12.5, business: 13.5, student: 8.5 },
  { year: 1984, mortgage: 12.4, personal: 15.5, auto: 13.0, business: 14.0, student: 9.0 },
  { year: 1985, mortgage: 11.5, personal: 14.5, auto: 12.0, business: 13.0, student: 8.5 },
  { year: 1986, mortgage: 10.1, personal: 13.0, auto: 10.5, business: 11.5, student: 7.5 },
  { year: 1987, mortgage: 9.3, personal: 12.5, auto: 10.0, business: 11.0, student: 7.0 },
  { year: 1988, mortgage: 10.3, personal: 13.5, auto: 11.0, business: 12.0, student: 7.5 },
  { year: 1989, mortgage: 10.8, personal: 14.5, auto: 12.0, business: 13.0, student: 8.0 },
  { year: 1990, mortgage: 10.0, personal: 14.0, auto: 11.5, business: 12.5, student: 7.5 },
  { year: 1991, mortgage: 9.3, personal: 13.5, auto: 10.5, business: 11.5, student: 7.0 },
  { year: 1992, mortgage: 8.4, personal: 12.5, auto: 9.5, business: 10.5, student: 6.5 },
  { year: 1993, mortgage: 7.2, personal: 11.5, auto: 8.5, business: 9.5, student: 6.0 },
  { year: 1994, mortgage: 8.4, personal: 12.0, auto: 9.0, business: 10.0, student: 6.5 },
  { year: 1995, mortgage: 7.9, personal: 11.5, auto: 9.5, business: 10.0, student: 6.8 },
  { year: 1996, mortgage: 7.6, personal: 11.0, auto: 9.3, business: 9.8, student: 6.5 },
  { year: 1997, mortgage: 7.7, personal: 11.2, auto: 9.5, business: 9.5, student: 6.3 },
  { year: 1998, mortgage: 6.9, personal: 10.5, auto: 8.8, business: 9.0, student: 6.0 },
  { year: 1999, mortgage: 7.4, personal: 10.8, auto: 8.5, business: 9.2, student: 6.2 },
  { year: 2000, mortgage: 8.1, personal: 11.5, auto: 9.3, business: 10.0, student: 6.8 },
  { year: 2001, mortgage: 6.9, personal: 10.5, auto: 8.5, business: 9.0, student: 6.0 },
  { year: 2002, mortgage: 6.5, personal: 10.0, auto: 7.8, business: 8.5, student: 5.5 },
  { year: 2003, mortgage: 5.8, personal: 9.5, auto: 7.2, business: 8.0, student: 5.0 },
  { year: 2004, mortgage: 5.7, personal: 9.2, auto: 7.0, business: 7.5, student: 4.8 },
  { year: 2005, mortgage: 5.9, personal: 9.5, auto: 7.2, business: 7.8, student: 5.0 },
  { year: 2006, mortgage: 6.4, personal: 10.0, auto: 7.8, business: 8.2, student: 5.5 },
  { year: 2007, mortgage: 6.3, personal: 10.2, auto: 7.8, business: 8.5, student: 5.8 },
  { year: 2008, mortgage: 5.9, personal: 10.0, auto: 7.5, business: 8.0, student: 5.5 },
  { year: 2009, mortgage: 4.9, personal: 9.2, auto: 6.5, business: 7.0, student: 4.8 },
  { year: 2010, mortgage: 4.7, personal: 9.0, auto: 6.2, business: 6.5, student: 4.5 },
  { year: 2011, mortgage: 4.5, personal: 10.0, auto: 6.8, business: 6.8, student: 4.2 },
  { year: 2012, mortgage: 3.7, personal: 10.5, auto: 6.2, business: 6.0, student: 3.8 },
  { year: 2013, mortgage: 3.9, personal: 10.5, auto: 5.8, business: 5.8, student: 3.5 },
  { year: 2014, mortgage: 4.2, personal: 10.5, auto: 5.5, business: 5.5, student: 3.5 },
  { year: 2015, mortgage: 3.9, personal: 10.2, auto: 5.2, business: 5.2, student: 3.5 },
  { year: 2016, mortgage: 3.6, personal: 9.8, auto: 5.0, business: 5.0, student: 3.5 },
  { year: 2017, mortgage: 4.0, personal: 9.5, auto: 5.2, business: 5.2, student: 3.8 },
  { year: 2018, mortgage: 4.5, personal: 9.5, auto: 5.5, business: 5.5, student: 4.0 },
  { year: 2019, mortgage: 3.9, personal: 9.2, auto: 5.5, business: 5.5, student: 3.8 },
  { year: 2020, mortgage: 3.0, personal: 7.5, auto: 4.5, business: 4.5, student: 3.0 },
  { year: 2021, mortgage: 3.0, personal: 7.0, auto: 4.5, business: 4.2, student: 3.0 },
  { year: 2022, mortgage: 5.5, personal: 9.5, auto: 6.5, business: 6.5, student: 4.5 },
  { year: 2023, mortgage: 6.5, personal: 11.5, auto: 8.5, business: 9.0, student: 5.5 },
  { year: 2024, mortgage: 6.8, personal: 12.0, auto: 8.5, business: 9.5, student: 5.8 },
  { year: 2025, mortgage: 6.5, personal: 11.5, auto: 8.0, business: 9.0, student: 5.5 },
  { year: 2026, mortgage: 6.2, personal: 11.0, auto: 7.8, business: 8.5, student: 5.2 },
];

export const loanTypeColors: Record<string, string> = {
  mortgage: '#10b981',
  personal: '#3b82f6',
  auto: '#f59e0b',
  business: '#8b5cf6',
  student: '#ec4899',
};

export const loanTypeLabels: Record<string, string> = {
  mortgage: 'Home Mortgage',
  personal: 'Personal Loan',
  auto: 'Auto Loan',
  business: 'Business Loan',
  student: 'Student Loan',
};
