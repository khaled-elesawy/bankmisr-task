export interface IApiCurrenciesRes {
    success: boolean;
    timestamp: number;
    base: string;
    date: string;
    rates: { [currency: string]: number };
}
