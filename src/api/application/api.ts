// tslint:disable
/// <reference path="./custom.d.ts" />
/**
 * Auth Service
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

const BASE_PATH = "http://localhost/api".replace(/\/+$/, "");

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
 * @interface Application
 */
export interface Application {
    /**
     * 
     * @type {string}
     * @memberof Application
     */
    jwt: string;
    /**
     * 
     * @type {string}
     * @memberof Application
     */
    appname: string;
    /**
     * 
     * @type {string}
     * @memberof Application
     */
    url: string;
    /**
     * 
     * @type {string}
     * @memberof Application
     */
    cssClasses?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof Application
     */
    allowedUsers?: Array<string>;
}

/**
 * 
 * @export
 * @interface ApplicationResponse
 */
export interface ApplicationResponse {
    /**
     * 
     * @type {string}
     * @memberof ApplicationResponse
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof ApplicationResponse
     */
    appname?: string;
    /**
     * 
     * @type {string}
     * @memberof ApplicationResponse
     */
    cssClasses?: string;
}

/**
 * 
 * @export
 * @interface ApplicationWithoutJwt
 */
export interface ApplicationWithoutJwt {
    /**
     * 
     * @type {string}
     * @memberof ApplicationWithoutJwt
     */
    appname: string;
    /**
     * 
     * @type {string}
     * @memberof ApplicationWithoutJwt
     */
    url: string;
    /**
     * 
     * @type {string}
     * @memberof ApplicationWithoutJwt
     */
    cssClasses?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof ApplicationWithoutJwt
     */
    allowedUsers?: Array<string>;
}

/**
 * 
 * @export
 * @interface UpdateApplication
 */
export interface UpdateApplication {
    /**
     * 
     * @type {string}
     * @memberof UpdateApplication
     */
    jwt: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateApplication
     */
    appname: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateApplication
     */
    cssClasses?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof UpdateApplication
     */
    allowedUsers?: Array<string>;
}

/**
 * 
 * @export
 * @interface Updated
 */
export interface Updated {
    /**
     * 
     * @type {boolean}
     * @memberof Updated
     */
    updated: boolean;
}

/**
 * 
 * @export
 * @interface Verified
 */
export interface Verified {
    /**
     * 
     * @type {string}
     * @memberof Verified
     */
    verificationMessage: string;
}


/**
 * AppApi - axios parameter creator
 * @export
 */
export const AppApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary add an application
         * @param {Application} application 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addApplication(application: Application, options: any = {}): RequestArgs {
            // verify required parameter 'application' is not null or undefined
            if (application === null || application === undefined) {
                throw new RequiredError('application','Required parameter application was null or undefined when calling addApplication.');
            }
            const localVarPath = `/app`;
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
            const needsSerialization = (<any>"Application" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(application || {}) : (application || "");

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Add User to App
         * @param {string} appname the name the app
         * @param {string} username the name of the user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addUser2App(appname: string, username: string, options: any = {}): RequestArgs {
            // verify required parameter 'appname' is not null or undefined
            if (appname === null || appname === undefined) {
                throw new RequiredError('appname','Required parameter appname was null or undefined when calling addUser2App.');
            }
            // verify required parameter 'username' is not null or undefined
            if (username === null || username === undefined) {
                throw new RequiredError('username','Required parameter username was null or undefined when calling addUser2App.');
            }
            const localVarPath = `/app/{appname}/{username}`
                .replace(`{${"appname"}}`, encodeURIComponent(String(appname)))
                .replace(`{${"username"}}`, encodeURIComponent(String(username)));
            const localVarUrlObj = url.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign({ method: 'POST' }, baseOptions, options);
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
         * @summary Get an App
         * @param {string} appname the name the app
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getApp(appname: string, options: any = {}): RequestArgs {
            // verify required parameter 'appname' is not null or undefined
            if (appname === null || appname === undefined) {
                throw new RequiredError('appname','Required parameter appname was null or undefined when calling getApp.');
            }
            const localVarPath = `/app/{appname}`
                .replace(`{${"appname"}}`, encodeURIComponent(String(appname)));
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
         * @summary Get Apps of User
         * @param {string} username the name of the user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAppOfUser(username: string, options: any = {}): RequestArgs {
            // verify required parameter 'username' is not null or undefined
            if (username === null || username === undefined) {
                throw new RequiredError('username','Required parameter username was null or undefined when calling getAppOfUser.');
            }
            const localVarPath = `/appOfUser/{username}`
                .replace(`{${"username"}}`, encodeURIComponent(String(username)));
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
         * @summary get all applications
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getApplications(options: any = {}): RequestArgs {
            const localVarPath = `/app`;
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
         * @summary update an application
         * @param {UpdateApplication} updateApplication 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateApplication(updateApplication: UpdateApplication, options: any = {}): RequestArgs {
            // verify required parameter 'updateApplication' is not null or undefined
            if (updateApplication === null || updateApplication === undefined) {
                throw new RequiredError('updateApplication','Required parameter updateApplication was null or undefined when calling updateApplication.');
            }
            const localVarPath = `/app`;
            const localVarUrlObj = url.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign({ method: 'PUT' }, baseOptions, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = (<any>"UpdateApplication" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(updateApplication || {}) : (updateApplication || "");

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Verify if user is allowed for app
         * @param {string} appname the name the app
         * @param {string} username the name of the user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        verifyUserForApp(appname: string, username: string, options: any = {}): RequestArgs {
            // verify required parameter 'appname' is not null or undefined
            if (appname === null || appname === undefined) {
                throw new RequiredError('appname','Required parameter appname was null or undefined when calling verifyUserForApp.');
            }
            // verify required parameter 'username' is not null or undefined
            if (username === null || username === undefined) {
                throw new RequiredError('username','Required parameter username was null or undefined when calling verifyUserForApp.');
            }
            const localVarPath = `/app/{appname}/{username}`
                .replace(`{${"appname"}}`, encodeURIComponent(String(appname)))
                .replace(`{${"username"}}`, encodeURIComponent(String(username)));
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
 * AppApi - functional programming interface
 * @export
 */
export const AppApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary add an application
         * @param {Application} application 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addApplication(application: Application, options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Application> {
            const localVarAxiosArgs = AppApiAxiosParamCreator(configuration).addApplication(application, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = Object.assign(localVarAxiosArgs.options, {url: basePath + localVarAxiosArgs.url})
                return axios.request(axiosRequestArgs);                
            };
        },
        /**
         * 
         * @summary Add User to App
         * @param {string} appname the name the app
         * @param {string} username the name of the user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addUser2App(appname: string, username: string, options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Updated> {
            const localVarAxiosArgs = AppApiAxiosParamCreator(configuration).addUser2App(appname, username, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = Object.assign(localVarAxiosArgs.options, {url: basePath + localVarAxiosArgs.url})
                return axios.request(axiosRequestArgs);                
            };
        },
        /**
         * 
         * @summary Get an App
         * @param {string} appname the name the app
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getApp(appname: string, options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApplicationWithoutJwt> {
            const localVarAxiosArgs = AppApiAxiosParamCreator(configuration).getApp(appname, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = Object.assign(localVarAxiosArgs.options, {url: basePath + localVarAxiosArgs.url})
                return axios.request(axiosRequestArgs);                
            };
        },
        /**
         * 
         * @summary Get Apps of User
         * @param {string} username the name of the user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAppOfUser(username: string, options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<ApplicationWithoutJwt>> {
            const localVarAxiosArgs = AppApiAxiosParamCreator(configuration).getAppOfUser(username, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = Object.assign(localVarAxiosArgs.options, {url: basePath + localVarAxiosArgs.url})
                return axios.request(axiosRequestArgs);                
            };
        },
        /**
         * 
         * @summary get all applications
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getApplications(options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<ApplicationResponse>> {
            const localVarAxiosArgs = AppApiAxiosParamCreator(configuration).getApplications(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = Object.assign(localVarAxiosArgs.options, {url: basePath + localVarAxiosArgs.url})
                return axios.request(axiosRequestArgs);                
            };
        },
        /**
         * 
         * @summary update an application
         * @param {UpdateApplication} updateApplication 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateApplication(updateApplication: UpdateApplication, options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Application> {
            const localVarAxiosArgs = AppApiAxiosParamCreator(configuration).updateApplication(updateApplication, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = Object.assign(localVarAxiosArgs.options, {url: basePath + localVarAxiosArgs.url})
                return axios.request(axiosRequestArgs);                
            };
        },
        /**
         * 
         * @summary Verify if user is allowed for app
         * @param {string} appname the name the app
         * @param {string} username the name of the user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        verifyUserForApp(appname: string, username: string, options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Verified> {
            const localVarAxiosArgs = AppApiAxiosParamCreator(configuration).verifyUserForApp(appname, username, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = Object.assign(localVarAxiosArgs.options, {url: basePath + localVarAxiosArgs.url})
                return axios.request(axiosRequestArgs);                
            };
        },
    }
};

/**
 * AppApi - factory interface
 * @export
 */
export const AppApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary add an application
         * @param {Application} application 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addApplication(application: Application, options?: any) {
            return AppApiFp(configuration).addApplication(application, options)(axios, basePath);
        },
        /**
         * 
         * @summary Add User to App
         * @param {string} appname the name the app
         * @param {string} username the name of the user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addUser2App(appname: string, username: string, options?: any) {
            return AppApiFp(configuration).addUser2App(appname, username, options)(axios, basePath);
        },
        /**
         * 
         * @summary Get an App
         * @param {string} appname the name the app
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getApp(appname: string, options?: any) {
            return AppApiFp(configuration).getApp(appname, options)(axios, basePath);
        },
        /**
         * 
         * @summary Get Apps of User
         * @param {string} username the name of the user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAppOfUser(username: string, options?: any) {
            return AppApiFp(configuration).getAppOfUser(username, options)(axios, basePath);
        },
        /**
         * 
         * @summary get all applications
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getApplications(options?: any) {
            return AppApiFp(configuration).getApplications(options)(axios, basePath);
        },
        /**
         * 
         * @summary update an application
         * @param {UpdateApplication} updateApplication 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateApplication(updateApplication: UpdateApplication, options?: any) {
            return AppApiFp(configuration).updateApplication(updateApplication, options)(axios, basePath);
        },
        /**
         * 
         * @summary Verify if user is allowed for app
         * @param {string} appname the name the app
         * @param {string} username the name of the user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        verifyUserForApp(appname: string, username: string, options?: any) {
            return AppApiFp(configuration).verifyUserForApp(appname, username, options)(axios, basePath);
        },
    };
};

/**
 * AppApi - object-oriented interface
 * @export
 * @class AppApi
 * @extends {BaseAPI}
 */
export class AppApi extends BaseAPI {
    /**
     * 
     * @summary add an application
     * @param {Application} application 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AppApi
     */
    public addApplication(application: Application, options?: any) {
        return AppApiFp(this.configuration).addApplication(application, options)(this.axios, this.basePath);
    }

    /**
     * 
     * @summary Add User to App
     * @param {string} appname the name the app
     * @param {string} username the name of the user
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AppApi
     */
    public addUser2App(appname: string, username: string, options?: any) {
        return AppApiFp(this.configuration).addUser2App(appname, username, options)(this.axios, this.basePath);
    }

    /**
     * 
     * @summary Get an App
     * @param {string} appname the name the app
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AppApi
     */
    public getApp(appname: string, options?: any) {
        return AppApiFp(this.configuration).getApp(appname, options)(this.axios, this.basePath);
    }

    /**
     * 
     * @summary Get Apps of User
     * @param {string} username the name of the user
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AppApi
     */
    public getAppOfUser(username: string, options?: any) {
        return AppApiFp(this.configuration).getAppOfUser(username, options)(this.axios, this.basePath);
    }

    /**
     * 
     * @summary get all applications
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AppApi
     */
    public getApplications(options?: any) {
        return AppApiFp(this.configuration).getApplications(options)(this.axios, this.basePath);
    }

    /**
     * 
     * @summary update an application
     * @param {UpdateApplication} updateApplication 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AppApi
     */
    public updateApplication(updateApplication: UpdateApplication, options?: any) {
        return AppApiFp(this.configuration).updateApplication(updateApplication, options)(this.axios, this.basePath);
    }

    /**
     * 
     * @summary Verify if user is allowed for app
     * @param {string} appname the name the app
     * @param {string} username the name of the user
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AppApi
     */
    public verifyUserForApp(appname: string, username: string, options?: any) {
        return AppApiFp(this.configuration).verifyUserForApp(appname, username, options)(this.axios, this.basePath);
    }

}

