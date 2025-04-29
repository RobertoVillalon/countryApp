import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { catchError, delay, map, throwError } from 'rxjs';
import CountryMapper from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({providedIn: 'root'})
export class CountryService {

  private readonly http = inject(HttpClient)

  searchByCapital(query: string){
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(map(CountryMapper.setCountries),
      catchError(err => {
        return throwError(() => new Error("No se pudieron obtener los paises"))
      }))
  }

  searchByCountry(query: string){
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
      .pipe(map(CountryMapper.setCountries),
      catchError(err => {
        return throwError(() => new Error("No se pudieron obtener los paises"))
      }))
  }

  searchCountryByCode(code: string){
    code = code.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`).pipe(
      map(CountryMapper.setCountries),
      map(countries => countries.at(0)),
      catchError(err => {
        return throwError(() => new Error("No se pudieron obtener los paises"))
      }))
  }
}
