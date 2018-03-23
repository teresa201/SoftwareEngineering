import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import {osDB} from './os-db';

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions) {
    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {

        let operatingSystems: String[] = JSON.parse(localStorage.getItem('operatingSystems')) || osDB;
        // wrap in timeout to simulate server api call
        setTimeout(() => {

          // API: To get all OS
            if (connection.request.url.endsWith('/api/os') && connection.request.method === RequestMethod.Get) {
                if(!osDB){
                  console.log("Bad");
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 400 })
                    ));
                } else {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200, body: {String: operatingSystems}})
                    ));
                }
            }

        },500);

      });


    return new Http(backend, options);
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions]
};
