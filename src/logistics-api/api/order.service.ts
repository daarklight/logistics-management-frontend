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

import { CreateOrder } from '../model/createOrder';
import { Order } from '../model/order';
import { UpdateOrder } from '../model/updateOrder';
import { UpdateOrderDriverComment } from '../model/updateOrderDriverComment';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class OrderService {

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
     * Create a new Order
     * 
     * @param body Order object that needs to be added to order list
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public orderCreate(body: CreateOrder, observe?: 'body', reportProgress?: boolean): Observable<Order>;
    public orderCreate(body: CreateOrder, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Order>>;
    public orderCreate(body: CreateOrder, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Order>>;
    public orderCreate(body: CreateOrder, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling orderCreate.');
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

        return this.httpClient.request<Order>('post',`${this.basePath}/orders`,
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
     * Delete Order
     * 
     * @param orderId Order id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public orderDelete(orderId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public orderDelete(orderId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public orderDelete(orderId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public orderDelete(orderId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (orderId === null || orderId === undefined) {
            throw new Error('Required parameter orderId was null or undefined when calling orderDelete.');
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

        return this.httpClient.request<any>('delete',`${this.basePath}/orders/${encodeURIComponent(String(orderId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Find Order by assignedTruckNumber
     * 
     * @param assignedTruckNumber Assigned Truck number for Order
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public orderFindByAssignedTruckNumber(assignedTruckNumber: string, observe?: 'body', reportProgress?: boolean): Observable<Order>;
    public orderFindByAssignedTruckNumber(assignedTruckNumber: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Order>>;
    public orderFindByAssignedTruckNumber(assignedTruckNumber: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Order>>;
    public orderFindByAssignedTruckNumber(assignedTruckNumber: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (assignedTruckNumber === null || assignedTruckNumber === undefined) {
            throw new Error('Required parameter assignedTruckNumber was null or undefined when calling orderFindByAssignedTruckNumber.');
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

        return this.httpClient.request<Order>('get',`${this.basePath}/orders/truckNumber/${encodeURIComponent(String(assignedTruckNumber))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Find Orders by category
     * 
     * @param category Order category
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public orderFindByCategory(category: string, observe?: 'body', reportProgress?: boolean): Observable<Array<Order>>;
    public orderFindByCategory(category: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Order>>>;
    public orderFindByCategory(category: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Order>>>;
    public orderFindByCategory(category: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (category === null || category === undefined) {
            throw new Error('Required parameter category was null or undefined when calling orderFindByCategory.');
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

        return this.httpClient.request<Array<Order>>('get',`${this.basePath}/orders/category/${encodeURIComponent(String(category))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Find Order by Driver
     * 
     * @param personalNumber Driver&#x27;s personal number
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public orderFindByDriver(personalNumber: number, observe?: 'body', reportProgress?: boolean): Observable<Order>;
    public orderFindByDriver(personalNumber: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Order>>;
    public orderFindByDriver(personalNumber: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Order>>;
    public orderFindByDriver(personalNumber: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (personalNumber === null || personalNumber === undefined) {
            throw new Error('Required parameter personalNumber was null or undefined when calling orderFindByDriver.');
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

        return this.httpClient.request<Order>('get',`${this.basePath}/orders/byDriver/${encodeURIComponent(String(personalNumber))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Find Orders with limitDateTime earlier or equal to defined
     * 
     * @param limitDateTime Limit date time
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public orderFindByEarlierThanLimitDateTime(limitDateTime: Date, observe?: 'body', reportProgress?: boolean): Observable<Array<Order>>;
    public orderFindByEarlierThanLimitDateTime(limitDateTime: Date, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Order>>>;
    public orderFindByEarlierThanLimitDateTime(limitDateTime: Date, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Order>>>;
    public orderFindByEarlierThanLimitDateTime(limitDateTime: Date, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (limitDateTime === null || limitDateTime === undefined) {
            throw new Error('Required parameter limitDateTime was null or undefined when calling orderFindByEarlierThanLimitDateTime.');
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

        return this.httpClient.request<Array<Order>>('get',`${this.basePath}/orders/earlier/limitDateTime/${encodeURIComponent(String(limitDateTime))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Find Orders with startDateTime earlier or equal to defined
     * 
     * @param startDateTime Start date time
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public orderFindByEarlierThanStartDateTime(startDateTime: Date, observe?: 'body', reportProgress?: boolean): Observable<Array<Order>>;
    public orderFindByEarlierThanStartDateTime(startDateTime: Date, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Order>>>;
    public orderFindByEarlierThanStartDateTime(startDateTime: Date, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Order>>>;
    public orderFindByEarlierThanStartDateTime(startDateTime: Date, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (startDateTime === null || startDateTime === undefined) {
            throw new Error('Required parameter startDateTime was null or undefined when calling orderFindByEarlierThanStartDateTime.');
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

        return this.httpClient.request<Array<Order>>('get',`${this.basePath}/orders/earlier/startDateTime/${encodeURIComponent(String(startDateTime))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Find Order by id
     * 
     * @param orderId Order id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public orderFindById(orderId: number, observe?: 'body', reportProgress?: boolean): Observable<Order>;
    public orderFindById(orderId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Order>>;
    public orderFindById(orderId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Order>>;
    public orderFindById(orderId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (orderId === null || orderId === undefined) {
            throw new Error('Required parameter orderId was null or undefined when calling orderFindById.');
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

        return this.httpClient.request<Order>('get',`${this.basePath}/orders/${encodeURIComponent(String(orderId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Find Orders with limitDateTime later or equal to defined
     * 
     * @param limitDateTime Limit date time
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public orderFindByLaterThanLimitDateTime(limitDateTime: Date, observe?: 'body', reportProgress?: boolean): Observable<Array<Order>>;
    public orderFindByLaterThanLimitDateTime(limitDateTime: Date, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Order>>>;
    public orderFindByLaterThanLimitDateTime(limitDateTime: Date, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Order>>>;
    public orderFindByLaterThanLimitDateTime(limitDateTime: Date, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (limitDateTime === null || limitDateTime === undefined) {
            throw new Error('Required parameter limitDateTime was null or undefined when calling orderFindByLaterThanLimitDateTime.');
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

        return this.httpClient.request<Array<Order>>('get',`${this.basePath}/orders/later/limitDateTime/${encodeURIComponent(String(limitDateTime))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Find Orders with startDateTime later or equal to defined
     * 
     * @param startDateTime Start date time
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public orderFindByLaterThanStartDateTime(startDateTime: Date, observe?: 'body', reportProgress?: boolean): Observable<Array<Order>>;
    public orderFindByLaterThanStartDateTime(startDateTime: Date, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Order>>>;
    public orderFindByLaterThanStartDateTime(startDateTime: Date, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Order>>>;
    public orderFindByLaterThanStartDateTime(startDateTime: Date, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (startDateTime === null || startDateTime === undefined) {
            throw new Error('Required parameter startDateTime was null or undefined when calling orderFindByLaterThanStartDateTime.');
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

        return this.httpClient.request<Array<Order>>('get',`${this.basePath}/orders/later/startDateTime/${encodeURIComponent(String(startDateTime))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Find Orders by orderCustomerId
     * 
     * @param orderCustomerId Customer id of Order
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public orderFindByOrderCustomerId(orderCustomerId: number, observe?: 'body', reportProgress?: boolean): Observable<Array<Order>>;
    public orderFindByOrderCustomerId(orderCustomerId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Order>>>;
    public orderFindByOrderCustomerId(orderCustomerId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Order>>>;
    public orderFindByOrderCustomerId(orderCustomerId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (orderCustomerId === null || orderCustomerId === undefined) {
            throw new Error('Required parameter orderCustomerId was null or undefined when calling orderFindByOrderCustomerId.');
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

        return this.httpClient.request<Array<Order>>('get',`${this.basePath}/orders/byCustomer/${encodeURIComponent(String(orderCustomerId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Find Orders by status
     * 
     * @param status Order status. Possible statuses: NEW, EXPECT_DRIVERS_CONFIRMATION, CONFIRMED, DECLINED_BY_DRIVERS, ON_ROAD, COMPLETED
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public orderFindByStatus(status: string, observe?: 'body', reportProgress?: boolean): Observable<Array<Order>>;
    public orderFindByStatus(status: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Order>>>;
    public orderFindByStatus(status: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Order>>>;
    public orderFindByStatus(status: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (status === null || status === undefined) {
            throw new Error('Required parameter status was null or undefined when calling orderFindByStatus.');
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

        return this.httpClient.request<Array<Order>>('get',`${this.basePath}/orders/status/${encodeURIComponent(String(status))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update Order
     * 
     * @param body Order object that needs to be updated
     * @param orderId Order id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public orderUpdate(body: UpdateOrder, orderId: number, observe?: 'body', reportProgress?: boolean): Observable<Order>;
    public orderUpdate(body: UpdateOrder, orderId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Order>>;
    public orderUpdate(body: UpdateOrder, orderId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Order>>;
    public orderUpdate(body: UpdateOrder, orderId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling orderUpdate.');
        }

        if (orderId === null || orderId === undefined) {
            throw new Error('Required parameter orderId was null or undefined when calling orderUpdate.');
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

        return this.httpClient.request<Order>('patch',`${this.basePath}/orders/${encodeURIComponent(String(orderId))}`,
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
     * Update assigned truck number for Order
     * 
     * @param orderId Order id
     * @param number Truck number in proper format
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public orderUpdateAssignedTruckNumber(orderId: number, number: string, observe?: 'body', reportProgress?: boolean): Observable<Order>;
    public orderUpdateAssignedTruckNumber(orderId: number, number: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Order>>;
    public orderUpdateAssignedTruckNumber(orderId: number, number: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Order>>;
    public orderUpdateAssignedTruckNumber(orderId: number, number: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (orderId === null || orderId === undefined) {
            throw new Error('Required parameter orderId was null or undefined when calling orderUpdateAssignedTruckNumber.');
        }

        if (number === null || number === undefined) {
            throw new Error('Required parameter number was null or undefined when calling orderUpdateAssignedTruckNumber.');
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

        return this.httpClient.request<Order>('patch',`${this.basePath}/orders/assignedTruckNumber/${encodeURIComponent(String(orderId))}/${encodeURIComponent(String(number))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update driver comment for Order
     * 
     * @param body Order object that needs to be updated
     * @param orderId Order id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public orderUpdateDriverComment(body: UpdateOrderDriverComment, orderId: number, observe?: 'body', reportProgress?: boolean): Observable<Order>;
    public orderUpdateDriverComment(body: UpdateOrderDriverComment, orderId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Order>>;
    public orderUpdateDriverComment(body: UpdateOrderDriverComment, orderId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Order>>;
    public orderUpdateDriverComment(body: UpdateOrderDriverComment, orderId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling orderUpdateDriverComment.');
        }

        if (orderId === null || orderId === undefined) {
            throw new Error('Required parameter orderId was null or undefined when calling orderUpdateDriverComment.');
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

        return this.httpClient.request<Order>('patch',`${this.basePath}/orders/driverComment/${encodeURIComponent(String(orderId))}`,
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
     * Set current date-time as Order start date-time
     * 
     * @param orderId Order id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public orderUpdateStartDateTime(orderId: number, observe?: 'body', reportProgress?: boolean): Observable<Order>;
    public orderUpdateStartDateTime(orderId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Order>>;
    public orderUpdateStartDateTime(orderId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Order>>;
    public orderUpdateStartDateTime(orderId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (orderId === null || orderId === undefined) {
            throw new Error('Required parameter orderId was null or undefined when calling orderUpdateStartDateTime.');
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

        return this.httpClient.request<Order>('patch',`${this.basePath}/orders/setStartDateTime/${encodeURIComponent(String(orderId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update Order status
     * 
     * @param orderId Order id
     * @param status Order status
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public orderUpdateStatus(orderId: number, status: string, observe?: 'body', reportProgress?: boolean): Observable<Order>;
    public orderUpdateStatus(orderId: number, status: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Order>>;
    public orderUpdateStatus(orderId: number, status: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Order>>;
    public orderUpdateStatus(orderId: number, status: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (orderId === null || orderId === undefined) {
            throw new Error('Required parameter orderId was null or undefined when calling orderUpdateStatus.');
        }

        if (status === null || status === undefined) {
            throw new Error('Required parameter status was null or undefined when calling orderUpdateStatus.');
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

        return this.httpClient.request<Order>('patch',`${this.basePath}/orders/status/${encodeURIComponent(String(orderId))}/${encodeURIComponent(String(status))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Find all Orders
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public ordersFindAll(observe?: 'body', reportProgress?: boolean): Observable<Array<Order>>;
    public ordersFindAll(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Order>>>;
    public ordersFindAll(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Order>>>;
    public ordersFindAll(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<Array<Order>>('get',`${this.basePath}/orders`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
