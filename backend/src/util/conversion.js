class Conversion{
    constructor(category,convertTo,convertFrom,value){
        this.category = category;
        this.convertTo=convertTo;
        this.convertFrom=convertFrom;
        this.value=value;
        this.ConversionDict = {
            'Length': {
                'picometer': 1e0,
                'nanometer': 1e-3,
                'micrometer': 1e-6,
                'millimeter': 1e-9,
                'centimeter': 1e-10,
                'decimeter': 1e-11,
                'meter': 1e-12,
                'kilometer': 1e-15,
                'inch': 3.937e-11,
                'foot': 3.281e-12,
                'yard': 1.094e-12,
                'mile': 6.214e-16,
            },
            'Volume':{
                'milliliter': 1e0,
                'liter': 1e-3,
                'cubic meter': 1e-6,
                'imperial teaspoon': 1.69e-1,
                'imperial tablespoon': 5.63e-2,
                'imperial fluid ounce': 3.52e-2,
                'imperial cup': 3.52e-3,
                'imperial pint': 1.76e-3,
                'imperial quart': 8.80e-4,
                'imperial gallon': 2.20e-4,
                'US teaspoon': 2.03e-1,
                'US tablespoon': 6.76e-2,
                'US fluid ounce': 3.38e-2,
                'US cup': 4.17e-3,
                'US pint': 2.11e-3,
                'US quart': 1.06e-3,
                'US gallon': 2.64e-4,
                'cubic inch': 6.10e-2,
                'cubic foot': 3.53e-5,
            },
            'Time':{
                'picosecond': 1e0,
                'nanosecond': 1e-3,
                'microsecond': 1e-6,
                'millisecond': 1e-9,
                'second': 1e-12,
                'minute': 1.67e-14,
                'hour': 2.78e-16,
                'day': 1.16e-17,
                'week': 1.65e-18,
                'month': 3.81e-19,
                'year': 3.17e-20,
                'decade': 3.17e-21,
            },
            'Mass':{
                'dalton': 1e0,
                'microgram': 1.66e-18,
                'milligram': 1.66e-21,
                'gram': 1.66e-24,
                'kilogram': 1.66e-27,
                'stone': 2.6149e-28,
                'Metric ton': 1.66e-30,
                'ounce': 5.86e-26,
                'pound': 3.66e-27,
                'US ton': 1.83e-30,
                'Imperial ton': 1.63e-30,
            },
        }
    }

    convert() {
        return value * this.ConversionDict[this.category][this.convertTo] / this.ConversionDict[this.category][this.convFrom];
    }
}