export function createCorsHandler(handler:any) {
    return (event:any, context:any, callback:any ) => {
        handler.handle(event, context, (err:any , resp:any ) => {
            let response
            let extraHeaders;
            if (err == null) {
              if(resp.code==302){
                //Redirect logic
                response = {
                  statusCode: 302,
                  body: "Redirect to: "+resp.location
                }
                extraHeaders={
                  'Location': resp.location
                }
              }else{
                response = {
                  statusCode: 200,
                  body: JSON.stringify(resp),
                  headers: {}
                };
              }
            } else {
              //console.log(err);
              let code = 500;
              if (err.code) code = err.code;
              let message = err;
              if (err.message) message = err.message;
        
              response = {
                statusCode: code,
                body: JSON.stringify(message),
                headers: {}
              };
            }
        
            //CORS
            response.headers={
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
              ...extraHeaders
            };
            
            callback(null, response);
          });
    }
}


