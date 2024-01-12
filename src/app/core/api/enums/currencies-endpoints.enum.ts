export class CurrenciesEndpointsEnum {
    static readonly ACCESS_KEY = '0e92efdef6ddbcdfdbec7647da235b3f';

    static availableCurrencies(){
        return `http://data.fixer.io/api/latest?access_key=${this.ACCESS_KEY}`;
    }

    static currencyDetails(baseCurriencyCode: string){
        return `http://data.fixer.io/api/latest?access_key=${this.ACCESS_KEY}&base=${baseCurriencyCode}`;
    }

    static convertCurrency(baseCurriencyCode: string, targetCurrencyCode: string, amount: number){
        return `http://data.fixer.io/api/convert?access_key=${this.ACCESS_KEY}&from=${baseCurriencyCode}&to=${targetCurrencyCode}&amount=${amount}`;

    }

    static singleCurrencyHistoricalData(baseCurriencyCode: string, selectedDate?: string){

        return `http://data.fixer.io/api/${selectedDate}?access_key=${this.ACCESS_KEY}&base=${baseCurriencyCode}`;
    }

    static historicalData(baseCurriencyCode: string, targetCurrencyCode: string, selectedDate?: string){

        return `http://data.fixer.io/api/${selectedDate}?access_key=${this.ACCESS_KEY}&base=${baseCurriencyCode}&symbols=${targetCurrencyCode}`;
    }

}

