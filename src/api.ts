
/**
 * This service implements functionality to make api calls through open api generated client
 * We are adding custom axios instance which helps customize the generated client with interceptors and more axios functionalities
 */
import axios from "axios";
import { AnsparenApi } from "./api/ansparen";
import { AppApi } from "./api/application";
import { AuthApi, MfaApi } from "./api/authentication";
import { CertApi } from "./api/cert";

// Create axios instance
const axiosInstance = axios.create();

const AppApiService = new AppApi(undefined, process.env.REACT_APP_API_URL, axiosInstance);
const AuthApiService = new AuthApi(undefined, process.env.REACT_APP_API_URL, axiosInstance);
const MfaApiService = new MfaApi(undefined, process.env.REACT_APP_API_URL, axiosInstance);
const AnsparenApiService = new AnsparenApi(undefined, process.env.REACT_APP_API_URL, axiosInstance);
const CertificationApiService = new CertApi(undefined, process.env.REACT_APP_API_URL, axiosInstance);
export { AppApiService, AuthApiService, MfaApiService, AnsparenApiService, CertificationApiService, axiosInstance };
