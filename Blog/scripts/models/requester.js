var app = app || {};

app.requester = (function() {
    function Requester(baseUrl) {
        this._baseUrl = baseUrl;
    }

    Requester.prototype.get = function (serviceUrl) {
        var headers = getHeaders();
        var url = this._baseUrl + serviceUrl;

        return makeRequest('GET', headers, url);
    };

    Requester.prototype.post= function(serviceUrl, data) {
        var headers = getHeaders();
        var url = this._baseUrl + serviceUrl;

        return makeRequest('POST', headers, url, data);
    }

    Requester.prototype.put = function (serviceUrl, data) {
        var headers = getHeaders();
        var url = this._baseUrl + serviceUrl;

        return makeRequest('PUT', headers, url, data);
    }

    Requester.prototype.delete = function (serviceUrl) {
        var headers = getHeaders();
        var url = this._baseUrl + serviceUrl;

        return makeRequest('DELETE', headers, url);
    }

    function makeRequest(method, headers, url, data) {
        var defer = Q.defer();

        $.ajax({
            method: method,
            headers: headers,
            url: url,
            data: JSON.stringify(data),
            success: function (data) {
                defer.resolve(data);
            },
            error: function (error) {
                defer.reject(error);
            }
        });

        return defer.promise;
    }

    function getHeaders() {
        var headers = {
            'X-Parse-Application-Id': 'sKo68sSKjSy6apd7nXT6uqKzuYxxVKVGKpcFVlS7',
            'X-Parse-REST-API-Key': 'puzTpPNOVEe4T03iNQ8AuaGmAssb9rxq3VBfcF0w',
            'Content-Type' : 'application/json'
        };

        if(localStorage['logged-in']) {
            headers['X-Parse-Session-Token'] = sessionStorage['logged-in'];
        }

        return headers;
    }

    return {
        load: function (baseUrl) {
            return new Requester(baseUrl);
        }
    }
}()); 

// This should handle requests to parse.com.
// There should be requests for:
// posting a new post, getting all the posts, logging in parse.com. These for now