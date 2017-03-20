import { ODataCollectionView as WijmoODataCollectionView } from 'wijmo/wijmo.odata';
var wjcCore = require('wijmo/wijmo');

export class ODataCollectionViewEx extends WijmoODataCollectionView {

    private _fetchDataMethod: string;

    private _params: any;

    private _originData: any;

    constructor(url: string, tableName: string, options?: any, params = {}, fetchDataMethod = 'GET') {

        if (fetchDataMethod == 'GET' || fetchDataMethod == 'get') {
            tableName = ODataCollectionViewEx.makeUrl(tableName, params);
        }
        super(url, tableName, options);
        //todo check if the methods is correct 
        this._fetchDataMethod = fetchDataMethod;
        this._params = params;
        this._originData = null;
    }

    static makeUrl(baseUrl: string, params = {}) {
        let path: string = baseUrl + '?';
        for (let i in params) {
            path += i + '=' + params[i] + '&';
        }
        return path.replace(/(&|\?)$/, '');
    }

    public get originData() {
        return this._originData;
    }

    public _getReadParams(nextLink?: string) {
        var params = Object.assign({}, this._params);
        var parentParams = super._getReadParams(nextLink);
        Object.assign(params, parentParams);
        return params;
    }

    private _toGetData1: any

    public _getData(nextLink?: string): void {
        var n = nextLink;
        var t = this;
        this._toGetData1 && clearTimeout(this._toGetData1);
        this._toGetData1 = setTimeout(function () {
            if (t._odv == null) {
                t['_getSchema']();
                return;
            }
            t._loading = !0;
            t.onLoading();
            var i = t._getReadUrl(n);
            wjcCore.httpRequest(i, {
                //method
                method: t._fetchDataMethod,
                requestHeaders: t.requestHeaders,
                data: t._getReadParams(n),
                success: function (i) {
                    var r = JSON.parse(i.response),
                        u = r.d ? r.d.results : r.value,
                        o = r.d ? r.d.__count : r['odata.count'] || r['@odata.count'],
                        e, f;
                    t._originData = r;
                    if (o != null && (t._count = parseInt(o)), n || t.inferDataTypes
                        && !t._dataTypesInferred
                        && (t._dataTypesInferred = t['_getInferredDataTypes'](u)), e = t.dataTypes ? t.dataTypes : t._dataTypesInferred, e)
                        for (f = 0; f < u.length; f++) t['_convertItem'](e, u[f]);
                    t._storeItems(u, n != null);
                    t.refresh();
                    n = r.d ? r.d.__next : r['odata.nextLink'] || r['@odata.nextLink'];
                    n ? t._getData(n) : (t._loading = !1, t.onLoaded())
                },
                error: function (n) {
                    if (t._loading = !1, t.onLoaded(), t.onError(new wjcCore.RequestErrorEventArgs(n))) throw 'HttpRequest Error: ' + n.status + ' ' + n.statusText;
                }
            });
        }, 100);
    }
}
