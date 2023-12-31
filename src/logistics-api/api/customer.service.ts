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

import { CreateCustomer } from '../model/createCustomer';
import { Customer } from '../model/customer';
import { UpdateCustomer } from '../model/updateCustomer';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class CustomerService {

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
     * Create a new Customer
     * 
     * @param body Customer object that needs to be added to customer list
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public customerCreate(body: CreateCustomer, observe?: 'body', reportProgress?: boolean): Observable<Customer>;
    public customerCreate(body: CreateCustomer, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Customer>>;
    public customerCreate(body: CreateCustomer, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Customer>>;
    public customerCreate(body: CreateCustomer, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling customerCreate.');
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

        return this.httpClient.request<Customer>('post',`${this.basePath}/customers`,
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
     * Delete Customer
     * 
     * @param customerId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public customerDelete(customerId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public customerDelete(customerId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public customerDelete(customerId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public customerDelete(customerId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (customerId === null || customerId === undefined) {
            throw new Error('Required parameter customerId was null or undefined when calling customerDelete.');
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

        return this.httpClient.request<any>('delete',`${this.basePath}/customers/${encodeURIComponent(String(customerId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Find Customer by email
     * 
     * @param email Customer email
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public customerFindByEmail(email: string, observe?: 'body', reportProgress?: boolean): Observable<Customer>;
    public customerFindByEmail(email: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Customer>>;
    public customerFindByEmail(email: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Customer>>;
    public customerFindByEmail(email: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (email === null || email === undefined) {
            throw new Error('Required parameter email was null or undefined when calling customerFindByEmail.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (email !== undefined && email !== null) {
            queryParameters = queryParameters.set('email', <any>email);
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

        return this.httpClient.request<Customer>('get',`${this.basePath}/customers/email`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Find Customer by id
     * 
     * @param customerId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public customerFindById(customerId: number, observe?: 'body', reportProgress?: boolean): Observable<Customer>;
    public customerFindById(customerId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Customer>>;
    public customerFindById(customerId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Customer>>;
    public customerFindById(customerId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (customerId === null || customerId === undefined) {
            throw new Error('Required parameter customerId was null or undefined when calling customerFindById.');
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

        return this.httpClient.request<Customer>('get',`${this.basePath}/customers/${encodeURIComponent(String(customerId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Find Customer by phone
     * 
     * @param phone Customer phone number
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public customerFindByPhone(phone: string, observe?: 'body', reportProgress?: boolean): Observable<Customer>;
    public customerFindByPhone(phone: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Customer>>;
    public customerFindByPhone(phone: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Customer>>;
    public customerFindByPhone(phone: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (phone === null || phone === undefined) {
            throw new Error('Required parameter phone was null or undefined when calling customerFindByPhone.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (phone !== undefined && phone !== null) {
            queryParameters = queryParameters.set('phone', <any>phone);
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

        return this.httpClient.request<Customer>('get',`${this.basePath}/customers/phone`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Find Customer by username
     * 
     * @param username Customer&#x27;s username
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public customerFindByUsername(username: string, observe?: 'body', reportProgress?: boolean): Observable<Customer>;
    public customerFindByUsername(username: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Customer>>;
    public customerFindByUsername(username: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Customer>>;
    public customerFindByUsername(username: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (username === null || username === undefined) {
            throw new Error('Required parameter username was null or undefined when calling customerFindByUsername.');
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

        return this.httpClient.request<Customer>('get',`${this.basePath}/customers/byUsername/${encodeURIComponent(String(username))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update Customer
     * 
     * @param body Customer object that needs to be updated
     * @param customerId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public customerUpdate(body: UpdateCustomer, customerId: number, observe?: 'body', reportProgress?: boolean): Observable<Customer>;
    public customerUpdate(body: UpdateCustomer, customerId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Customer>>;
    public customerUpdate(body: UpdateCustomer, customerId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Customer>>;
    public customerUpdate(body: UpdateCustomer, customerId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling customerUpdate.');
        }

        if (customerId === null || customerId === undefined) {
            throw new Error('Required parameter customerId was null or undefined when calling customerUpdate.');
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

        return this.httpClient.request<Customer>('patch',`${this.basePath}/customers/${encodeURIComponent(String(customerId))}`,
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
     * Find all Customers
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public customersFindAll(observe?: 'body', reportProgress?: boolean): Observable<Array<Customer>>;
    public customersFindAll(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Customer>>>;
    public customersFindAll(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Customer>>>;
    public customersFindAll(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<Array<Customer>>('get',`${this.basePath}/customers`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
