import { Influencer } from "../influencer/influencer.model";

var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    client = new kafka.Client('localhost:2181'),
    producer = new Producer(client);
    
    
// var payloads = { topic: 'test', messages: 'hi', partition: 0 };
producer.on('ready', function (payloads:any) {
    producer.send("this is test message", function (err:any, data:any) {
        console.log(data);
    });
    console.log("data income",payloads);
});
producer.on('error', function (err:any) {})


export class KafkaProducer{
    constructor() {
        console.log("dfjkdf");
    };
    public dummy(){
        console.log('dummy');
    }
    public send(influencer: Influencer) {
        var data = {
            pk: influencer.pk,
            username: influencer.username,
            followerCount: influencer.followerCount,
            followingCount: influencer.followingCount,
            followerRatio: influencer.followerCount/influencer.followingCount,
            // can add is suspicious here only, need to uncomment the below line 
            // and need to add isSuspicious in Model
            //isSuspicious: influencer.isSuspicious
            timestamp: Date.now()
        };
        var payloads = [ {topic: 'test', messages: JSON.stringify(data), partition: 0 }] ;
        console.log("payloads", payloads);
        producer.send(payloads,function(err:any, payloads:any){
            console.log(payloads)
        });
    }
}

export const kafkaProducer = new KafkaProducer();
 