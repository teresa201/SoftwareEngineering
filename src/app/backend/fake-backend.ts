import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Scenario } from '../scenario';
import { Responses } from '../response';
import { serviceDB } from './services-db';
import { scDB } from './scenario-db';
import { rDB } from './response-db';

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions) {
    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {

        let services: String[] = JSON.parse(localStorage.getItem('services')) || serviceDB;
        let scenarios: Scenario[] = JSON.parse(localStorage.getItem('scenarios')) || scDB;
        let responses: Responses[] = JSON.parse(localStorage.getItem('responses')) || rDB;
        // wrap in timeout to simulate server api call
        setTimeout(() => {

          // API: To get all Services
            if (connection.request.url.endsWith('/api/services') && connection.request.method === RequestMethod.Get) {
                if(!serviceDB){
                  console.log("Bad");
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 400 })
                    ));
                } else {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200, body: {String: services}})
                    ));
                }
            }
        },500);

        // API: To get scenario with specific id
          if (connection.request.url.match(/\/api\/scenario\/\d+$/) && connection.request.method === RequestMethod.Get) {
          /*  if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {*/
            if(!scDB){
                console.log("bad");
                  connection.mockRespond(new Response(
                      new ResponseOptions({ status: 400 })
                  ));
              }else{
                  //find matching id in Listings Array
                  //console.log("edit");
                  let urlParts = connection.request.url.split('/');
                  let id = parseInt(urlParts[urlParts.length-1]);
                  let matchedScenario = scenarios.filter(scenario => {return scenario.osId === id;});
                  //console.log(matchedScenario);
                  let scenario = matchedScenario.length ? matchedScenario[0] : null;

              //  console.log(scenario);
                  //respond with listings that match the project ID
                  connection.mockRespond(new Response(
                      new ResponseOptions({ status: 200, body: {scenario: scenario}})
                  ));
          }
        }

        // add Response
        if (connection.request.url.endsWith('/api/addResponse') &&
          connection.request.method === RequestMethod.Post) {
            let receivedResponse= JSON.parse(connection.request.getBody());
            console.log(receivedResponse);
            responses.push(receivedResponse);
            localStorage.setItem('responses', JSON.stringify(responses));
            console.log(responses);

            connection.mockRespond(new Response(new ResponseOptions({
              status: 200,
              body: {responsez: rDB }
       })));
     return;
      }

      // API: To get response with specific id
        if (connection.request.url.match(/\/api\/response\/\d+$/) && connection.request.method === RequestMethod.Get) {
        /*  if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {*/
          if(!rDB){
              console.log("bad");
                connection.mockRespond(new Response(
                    new ResponseOptions({ status: 400 })
                ));
            }else{
                //find matching id in Listings Array
                //console.log("edit");
                let urlParts = connection.request.url.split('/');
                let id = parseInt(urlParts[urlParts.length-1]);
                console.log(responses);
                let matchedRes = responses.filter(response => {return response.responseId === id;});
                console.log(matchedRes);
                let response = matchedRes.length ? matchedRes[0] : null;

              console.log(response);
                //respond with listings that match the project ID
                connection.mockRespond(new Response(
                    new ResponseOptions({ status: 200, body: {respon: response}})
                ));
        }
      }
});

    return new Http(backend, options);
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions]
};
