/**
 * twitter-api
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 2019-10-30T17:33:34Z
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


export interface SignupRequest { 
    /**
     * The user handle
     */
    handle?: string;
    /**
     * The user password
     */
    password?: string;
    /**
     * The user full name
     */
    name?: string;
    profile?: string;
}