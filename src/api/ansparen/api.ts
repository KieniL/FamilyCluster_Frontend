// tslint:disable
/// <reference path="./custom.d.ts" />
/**
 * AnsparService
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as url from "url";
import { Configuration } from "./configuration";
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';

const BASE_PATH = "https://backend.kieni.at".replace(/\/+$/, "");

/**
 *
 * @export
 */
export const COLLECTION_FORMATS = {
    csv: ",",
    ssv: " ",
    tsv: "\t",
    pipes: "|",
};

/**
 *  
 * @export
 * @interface RequestArgs
 */
export interface RequestArgs {
    url: string;
    options: any;
}

/**
 * 
 * @export
 * @class BaseAPI
 */
export class BaseAPI {
    protected configuration: Configuration | undefined;

    constructor(configuration?: Configuration, protected basePath: string = BASE_PATH, protected axios: AxiosInstance = globalAxios) {
        if (configuration) {
            this.configuration = configuration;
            this.basePath = configuration.basePath || this.basePath;
        }
    }
};

/**
 * 
 * @export
 * @class RequiredError
 * @extends {Error}
 */
export class RequiredError extends Error {
    name: "RequiredError" = "RequiredError";
    constructor(public field: string, msg?: string) {
        super(msg);
    }
}

/**
 * 
 * @export
 * @interface AmountEntry
 */
export interface AmountEntry {
    /**
     * 
     * @type {string}
     * @memberof AmountEntry
     */
    date: string;
    /**
     * 
     * @type {number}
     * @memberof AmountEntry
     */
    amount: number;
}

/**
 * 
 * @export
 * @interface AnsparEntry
 */
export interface AnsparEntry {
    /**
     * 
     * @type {string}
     * @memberof AnsparEntry
     */
    date: string;
    /**
     * 
     * @type {string}
     * @memberof AnsparEntry
     */
    description: string;
    /**
     * 
     * @type {number}
     * @memberof AnsparEntry
     */
    value: number;
}

/**
 * 
 * @export
 * @interface CategoryResponse
 */
export interface CategoryResponse {
    /**
     * 
     * @type {string}
     * @memberof CategoryResponse
     */
    description: string;
    /**
     * 
     * @type {Array<AmountEntry>}
     * @memberof CategoryResponse
     */
    entries: Array<AmountEntry>;
}


/**
 * AnsparenApi - axios parameter creator
 * @export
 */
export const AnsparenApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary add an entry
         * @param {AnsparEntry} ansparEntry 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addEntry(ansparEntry: AnsparEntry, options: any = {}): RequestArgs {
            // verify required parameter 'ansparEntry' is not null or undefined
            if (ansparEntry === null || ansparEntry === undefined) {
                throw new RequiredError('ansparEntry','Required parameter ansparEntry was null or undefined when calling addEntry.');
            }
            const localVarPath = `/ansparen`;
            const localVarUrlObj = url.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign({ method: 'POST' }, baseOptions, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = (<any>"AnsparEntry" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(ansparEntry || {}) : (ansparEntry || "");

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary get Categories
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCategories(options: any = {}): RequestArgs {
            const localVarPath = `/ansparen`;
            const localVarUrlObj = url.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign({ method: 'GET' }, baseOptions, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary get Category
         * @param {string} description the description of a category
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCategory(description: string, options: any = {}): RequestArgs {
            // verify required parameter 'description' is not null or undefined
            if (description === null || description === undefined) {
                throw new RequiredError('description','Required parameter description was null or undefined when calling getCategory.');
            }
            const localVarPath = `/ansparen/{description}`
                .replace(`{${"description"}}`, encodeURIComponent(String(description)));
            const localVarUrlObj = url.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign({ method: 'GET' }, baseOptions, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * AnsparenApi - functional programming interface
 * @export
 */
export const AnsparenApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary add an entry
         * @param {AnsparEntry} ansparEntry 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addEntry(ansparEntry: AnsparEntry, options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<AnsparEntry> {
            const localVarAxiosArgs = AnsparenApiAxiosParamCreator(configuration).addEntry(ansparEntry, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = Object.assign(localVarAxiosArgs.options, {url: basePath + localVarAxiosArgs.url})
                return axios.request(axiosRequestArgs);                
            };
        },
        /**
         * 
         * @summary get Categories
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCategories(options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<CategoryResponse>> {
            const localVarAxiosArgs = AnsparenApiAxiosParamCreator(configuration).getCategories(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = Object.assign(localVarAxiosArgs.options, {url: basePath + localVarAxiosArgs.url})
                return axios.request(axiosRequestArgs);                
            };
        },
        /**
         * 
         * @summary get Category
         * @param {string} description the description of a category
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCategory(description: string, options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<CategoryResponse> {
            const localVarAxiosArgs = AnsparenApiAxiosParamCreator(configuration).getCategory(description, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = Object.assign(localVarAxiosArgs.options, {url: basePath + localVarAxiosArgs.url})
                return axios.request(axiosRequestArgs);                
            };
        },
    }
};

/**
 * AnsparenApi - factory interface
 * @export
 */
export const AnsparenApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary add an entry
         * @param {AnsparEntry} ansparEntry 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addEntry(ansparEntry: AnsparEntry, options?: any) {
            return AnsparenApiFp(configuration).addEntry(ansparEntry, options)(axios, basePath);
        },
        /**
         * 
         * @summary get Categories
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCategories(options?: any) {
            return AnsparenApiFp(configuration).getCategories(options)(axios, basePath);
        },
        /**
         * 
         * @summary get Category
         * @param {string} description the description of a category
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCategory(description: string, options?: any) {
            return AnsparenApiFp(configuration).getCategory(description, options)(axios, basePath);
        },
    };
};

/**
 * AnsparenApi - object-oriented interface
 * @export
 * @class AnsparenApi
 * @extends {BaseAPI}
 */
export class AnsparenApi extends BaseAPI {
    /**
     * 
     * @summary add an entry
     * @param {AnsparEntry} ansparEntry 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AnsparenApi
     */
    public addEntry(ansparEntry: AnsparEntry, options?: any) {
        return AnsparenApiFp(this.configuration).addEntry(ansparEntry, options)(this.axios, this.basePath);
    }

    /**
     * 
     * @summary get Categories
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AnsparenApi
     */
    public getCategories(options?: any) {
        return AnsparenApiFp(this.configuration).getCategories(options)(this.axios, this.basePath);
    }

    /**
     * 
     * @summary get Category
     * @param {string} description the description of a category
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AnsparenApi
     */
    public getCategory(description: string, options?: any) {
        return AnsparenApiFp(this.configuration).getCategory(description, options)(this.axios, this.basePath);
    }

}

