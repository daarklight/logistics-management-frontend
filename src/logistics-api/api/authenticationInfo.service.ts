/**
 * Logistics API
 * Logistics API provides services to find and manage entities for logistics
 *
 * OpenAPI spec version: 1.0
 * Contact: vladislavprokopenko1@gmail.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { AuthenticationInfo } from '../model/authenticationInfo';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class AuthenticationInfoService {

    protected basePath = 'http://localhost:8080';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Create a new AuthenticationInfo
     * 
     * @param body AuthenticationInfo object that needs to be added to AuthenticationInfo list
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public authenticationInfoCreate(body: AuthenticationInfo, observe?: 'body', reportProgress?: boolean): Observable<AuthenticationInfo>;
    public authenticationInfoCreate(body: AuthenticationInfo, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<AuthenticationInfo>>;
    public authenticationInfoCreate(body: AuthenticationInfo, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<AuthenticationInfo>>;
    public authenticationInfoCreate(body: AuthenticationInfo, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling authenticationInfoCreate.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<AuthenticationInfo>('post',`${this.basePath}/authenticationInfo`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete AuthenticationInfo
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public authenticationInfoDelete(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public authenticationInfoDelete(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public authenticationInfoDelete(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public authenticationInfoDelete(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling authenticationInfoDelete.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('delete',`${this.basePath}/authenticationInfo/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Find all AuthenticationInfos
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public authenticationInfoFindAll(observe?: 'body', reportProgress?: boolean): Observable<Array<AuthenticationInfo>>;
    public authenticationInfoFindAll(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<AuthenticationInfo>>>;
    public authenticationInfoFindAll(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<AuthenticationInfo>>>;
    public authenticationInfoFindAll(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<AuthenticationInfo>>('get',`${this.basePath}/authenticationInfo`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Find AuthenticationInfo by id
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public authenticationInfoFindById(id: number, observe?: 'body', reportProgress?: boolean): Observable<AuthenticationInfo>;
    public authenticationInfoFindById(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<AuthenticationInfo>>;
    public authenticationInfoFindById(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<AuthenticationInfo>>;
    public authenticationInfoFindById(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling authenticationInfoFindById.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<AuthenticationInfo>('get',`${this.basePath}/authenticationInfo/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Find AuthenticationInfo by login
     * 
     * @param login AuthenticationInfo login
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public authenticationInfoFindByLogin(login: string, observe?: 'body', reportProgress?: boolean): Observable<AuthenticationInfo>;
    public authenticationInfoFindByLogin(login: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<AuthenticationInfo>>;
    public authenticationInfoFindByLogin(login: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<AuthenticationInfo>>;
    public authenticationInfoFindByLogin(login: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (login === null || login === undefined) {
            throw new Error('Required parameter login was null or undefined when calling authenticationInfoFindByLogin.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<AuthenticationInfo>('get',`${this.basePath}/authenticationInfo/login/${encodeURIComponent(String(login))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update AuthenticationInfo
     * 
     * @param body AuthenticationInfo object that needs to be updated
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public authenticationInfoUpdate(body: AuthenticationInfo, id: number, observe?: 'body', reportProgress?: boolean): Observable<AuthenticationInfo>;
    public authenticationInfoUpdate(body: AuthenticationInfo, id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<AuthenticationInfo>>;
    public authenticationInfoUpdate(body: AuthenticationInfo, id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<AuthenticationInfo>>;
    public authenticationInfoUpdate(body: AuthenticationInfo, id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling authenticationInfoUpdate.');
        }

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling authenticationInfoUpdate.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<AuthenticationInfo>('patch',`${this.basePath}/authenticationInfo/${encodeURIComponent(String(id))}`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
