import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-countries.interfaces";

export default class CountryMapper{

    static setCountry(data: RESTCountry): Country{
        return {
            cca2: data.cca2,
            flag: data.flag,
            flagSvg: data.flags.svg,
            name: data.translations['spa'].common ?? 'no name',
            capital: data.capital.join(','),
            population: data.population
        
        }
    }

    static setCountries(data: RESTCountry[]): Country[]{
        return data.map(CountryMapper.setCountry)
    }

}