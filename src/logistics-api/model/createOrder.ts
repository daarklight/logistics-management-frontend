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
 */

/**
 * Object representing Order creating
 */
export interface CreateOrder { 
    orderCustomerId?: number;
    category?: string;
    /**
     * Total order weight, tons
     */
    weight?: number;
    limitDateTime?: Date;
}