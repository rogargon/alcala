import { RpcHandler } from "../rpc";

jest.mock("axios");
import axios from "axios";
let axiosMock ={
    post: jest.fn()
}
axios.create=jest.fn().mockImplementation(()=>{return axiosMock})



describe('RpcHandler', () => {

    let sut:RpcHandler;

    beforeAll(() => {
        process.env.BACKEND_RPC='fakeBackend'
        sut = new RpcHandler();
    });

    test('no env var', () => {
        delete process.env.BACKEND_RPC
        try{
            let sut = new RpcHandler();
            fail('should return')
        }catch(e){
            expect(e).toEqual(Error('no env var BACKEND_RPC'))
        }
    })

    test('empty constructor', () => {
        expect(sut).not.toBeUndefined();
    });

    test('handle null body', done => {
        sut.handle({},{},(err:any,res:any)=>{
            expect(err).not.toBeNull()
            expect(err).toEqual({
                "error": {
                    "code": -32000,
                    "message": "unknown error from the peer",
                },
                "id": 0,
                "jsonrpc": "2.0",
            })
            done();
        })
    });

    test('handle error on backend', done => {
        axiosMock.post.mockRejectedValueOnce({response: {status: 500}})
            
        const event = {
            body: {"jsonrpc":"2.0","method":"net_version","params":[],"id":68} 
        }
        sut.handle(event,null,(err:any,res:any)=>{
            expect(err).not.toBeNull()
            expect(err.error).not.toBeNull()
            expect(err.error.code).toEqual(-32000)
            expect(err.error.message).toEqual('backend request error')
            done();
        })
    });

    test('happy path', done => {
        axiosMock.post.mockResolvedValueOnce({data: 'ok'})
            
        const event = {
            body: {"jsonrpc":"2.0","method":"net_version","params":[],"id":68} 
        }
        sut.handle(event,null,(err:any,res:any)=>{
            expect(err).toBeNull()
            expect(res).toEqual('ok')
            done();
        })
    });

});
