/**
 * twitter-api
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 2019-11-25T17:30:38Z
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


export interface FollowRequest { 
    /**
     * The user that is following
     */
    userHandle?: string;
    /**
     * The user to be followed
     */
    followHandle?: string;
    authorization?: string;
}
