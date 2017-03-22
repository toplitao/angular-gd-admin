import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers, Jsonp } from '@angular/http';
import { Observable } from 'rxjs';
import { ODataCollectionView } from 'wijmo/wijmo.odata';
// var ODataCollectionView = require('../odata.js').ODataCollectionView;

import { AuthHandler } from '../handlers/auth.handler';
import { Config } from '../../config';
@Injectable()
export class Api {
    private baseUrl = Config.baseUrl;
    public progress: any;
    public progressObserver: any;

    constructor(private http: Http, private jsonp: Jsonp, private authHandler: AuthHandler) {
        this.progress = Observable.create((observer: any) => {
            this.progressObserver = observer;
        }).share();
    }

    public get(path: string, params = {}): Observable<any> {
        let search: URLSearchParams = new URLSearchParams();
        for (let key in params) {
            search.set(key, params[key]);
        }
        let api_url: string = this.makeApiUrl(path);
        console.log('get>>>', api_url);
        return this.http.get(api_url, { search: search, headers: this.makeHeaders() })
            .map(this.extractData)
            .catch((error) => this.handleError(error));
    }

    public post(path: string, body: any): Observable<any> {
        let api_url = this.makeApiUrl(path);
        console.log('post>>>', api_url);
        return this.http.post(api_url, body, { headers: this.makeHeaders() })
            .map(this.extractData)
            .catch((error) => this.handleError(error));
    }

    private makeUrl(baseUrl: string, params = {}) {
        let path: string = baseUrl + '?';
        for (let i in params) {
            path += i + '=' + params[i] + '&';
        }
        return path.replace(/(&|\?)$/, '');
    }

    private makeHeaders(): Headers {
        let headers = {};
        headers['Accept'] = 'application/json';
        if (this.authHandler.hasToken()) {
            headers['authorization'] = this.authHandler.getAuthorization();
        }
        return new Headers(headers);
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.log('服务器请求错误==>', errMsg);
        return Observable.of({ _status: -1, _error: errMsg });
    }

    private extractData(res: Response): any {
        try {
            let body = res.json();
            return body || {};
        } catch (e) {
            console.error('Data is not json');
            return res.text();
        }
    }

    private makeApiUrl(path: string): string {
        return this.baseUrl + path;
    }

    makeFileRequest(url: string, params: any = [], files: File[]): Observable<any> {
        return Observable.create((observer: any) => {
            let formData: FormData = new FormData(),
                xhr: XMLHttpRequest = new XMLHttpRequest();
            for (let i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i].name);
            }
            for (var key in params) {
                formData.append(key, params[key]);
            }
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            };
            xhr.upload.onprogress = (event) => {
                this.progress = Math.round(event.loaded / event.total * 100);
                this.progressObserver.next(this.progress);
            };
            xhr.open('POST', this.makeApiUrl(url), true);
            xhr.send(formData);
        });
    }

    makeFileimg(url: string, files: File[]) {
        return Observable.create((observer: any) => {
            let formData: FormData = new FormData(),
                xhr: XMLHttpRequest = new XMLHttpRequest();
            for (let i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i].name);
            }
            xhr.upload.onprogress = (event) => {
                this.progress = Math.round(event.loaded / event.total * 100);
                this.progressObserver.next(this.progress);
            };
            xhr.open('POST', url, true);
            xhr.send(formData);
        });
    }

}
