import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders } from "@angular/common/http";
import SessionHelper from "../core/SessionHelper";
import { Observable, throwError as obserableThrowError } from "rxjs";
export default class BaseDataService {

    private ApiUrl: string = "http://localhost:5000/api/admin";
    private session: any = SessionHelper.GetApiToken();
    private header?: HttpHeaders;

    protected PostRequest(http: HttpClient, url: string, model: any) {
        console.log(this.ApiUrl + url);
        return http.post<BaseResponse>(this.ApiUrl + url, model);
    }

    protected GetRequest(http: HttpClient, url: string) {
        return http.get<BaseResponse>(this.ApiUrl + url, { headers: this.header });
    }

    protected PutRequest(http: HttpClient, url: string, model: any) {
        return http.put<BaseResponse>(this.ApiUrl + url, model);
    }

    protected DeleteRequest(http: HttpClient, url: string, model: any) {
        return http.delete<BaseResponse>(this.ApiUrl + url, { body: model });
    }


    HandleError(error: HttpErrorResponse) {
        return obserableThrowError(error.message || "Server error");
    }
}

export interface BaseResponse {
    is_success: boolean,
    data: Object,
    message: string,
    errors: Object
}


