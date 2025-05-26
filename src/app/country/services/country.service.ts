import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { catchError, map, Observable, of, throwError, tap } from 'rxjs';
import CountryMapper from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({providedIn: 'root'})
export class CountryService {
  private readonly http = inject(HttpClient)
  private readonly queryCapitalCache = new Map<string, Country[]>()
  private readonly queryCountryCache = new Map<string, Country[]>()
  private readonly queryRegionCache = new Map<string, Country[]>()


  searchByCapital(query: string): Observable<Country[]>{
    query = query.toLowerCase();

    this.verifyCache(query, this.queryCapitalCache)

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map(CountryMapper.setCountries),
      tap(countries => this.queryCapitalCache.set(query, countries)),
      catchError(err => {
        return throwError(() => new Error("No se pudieron obtener los paises"))
      })
    )
  }

  searchByCountry(query: string): Observable<Country[]>{
    query = query.toLowerCase();

    this.verifyCache(query, this.queryCountryCache)

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map(CountryMapper.setCountries),
      tap(countries => this.queryCountryCache.set(query, countries)),
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

  searchCountryByRegion(alternative: string): Observable<Country[]>{
    const regionLowerCase = alternative.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${regionLowerCase}`)
      .pipe(map(CountryMapper.setCountries),
      tap(countries => this.queryRegionCache.set(regionLowerCase, countries)),
      catchError(err => {
        return throwError(() => new Error("No se pudieron obtener los paises"))
      }))
  }

  verifyCache(query: string, cache: Map<string, Country[]>): Observable<Country[]>{ 

    if(cache.has(query))
      return of(cache.get(query) ?? [])

    return of([])
  }
}