const env={
    "values": [
        {
            "key": "alcalaUrl",
            "value": process.argv[2]
        },
        {
            "key": "networkId",
            "value": process.argv[3]
        }
    ]
}
console.log(JSON.stringify(env,null,3));
