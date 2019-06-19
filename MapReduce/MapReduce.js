//MapReduce: 대용량 데이터 베이스를 응축하기 위한 데이터 프로세싱 패러다임
//자료 준비
use mr
db.bank.insert({
    "cust_id" : "A123",
    "amount" : 500,
    "status" : "A"
})
 
db.bank.insert({
    "cust_id" : "A123",
    "amount" : 2500,
    "status" : "A"
})
 
db.bank.insert({
    "cust_id" : "B212",
    "amount" : 200,
    "status" : "A"
})
 
db.bank.insert({
    "cust_id" : "A123",
    "amount" : 300,
    "status" : "D"
})

//자료 확인:
db.bank.find()

//MapReduce
//make map
db.bank.mapReduce(
    //map은 단순한 key value 형식으로 선언하며, 이 값들을 emit을 통해 reduce로 전달한다.
    function() { emit ( this.cust_id, this.amount ) },
    //Reduce은 데이터를 감소 시키는 역활을 한다.
    //Reduce를 통해 특정 값을 뽑아 낸다.
    function( key, values ) { return Array.sum( values ) },
    {
        //query: Map에 들어갈 Collection을 필터링 할때 사용
        query : {status : "A"},
        //결과를 담을 컬랙션 명
        out : "order_totals"
    }
)