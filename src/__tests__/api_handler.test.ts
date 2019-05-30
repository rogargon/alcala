process.env.BACKEND_RPC='http:://someurl/json-rpc'

const apiHandler = require('../api_handler');

describe('apiHandler', () => {

    beforeAll(() => {
    })

    test('rpc()', done => {
        apiHandler.rpc({},{},(err:any,res:any)=>{
            expect(err).toBeNull()
            expect(res).not.toBeNull()
            
            done();
        })
    });
});
