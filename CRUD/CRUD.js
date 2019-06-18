//기본적인 CURD

/*
생성하기(Insert)
1. insert: 단일 또는 다수의 문서를 입력할 때 사용
2. insertOne: 단일 문서를 입력할 때 사용
3. insertMany: 다수의 문서를 입력할 때 사용
*/
//Document 생성
Hwang = {"name":"JeongYong","description":"Programmer","openDate":new Date()}
//Programmer Collection 생성 후
//Hwang 문서 Programmer Collection에 추가
db.programmer.insert(Hwang)

/*
조회하기(find)
1. find(): 모든 문서 조회
2. findOne(): 하나의 문서 조회
3. find(query): query조건에 맞는 문서 조회
*/
db.programmer.find()
query = {"name": "JeongYong"}
db.programmer.find(query)

/*
갱신하기(Update)
update는 기존의 문서를 수정하는 것
Method의 첫번째 인자는 갱신하려는 문서를 찾고, 두번째는 치환할 새로운 문서이다.
*/
//갱신하려는 문서의 조건
query1 = {"name": "JeongYong"}
//갱신하려는 문서내용
query2 = {"name": "JeongYong2"}
//update 진행
db.programmer.update(query1,query2)
//결과 확인
db.programmer.find()

//조건을 걸어서 Update하기
db.programmer.insert(Hwang)
query3 = {"name": "JeongYong2"}
query4 = {$set: {"name": "JeongYong3"}}
db.programmer.update(query3,query4)
db.programmer.find()

//조건에 맞지 않는 문서가 발견되면 쿼리 문서와 갱신문서를 합친 새로운 문서 입력
//3번째 인자를True로 한다.
query5 = {"name": "JeongYong4"}
query6 = {$set: {"name": "JeongYong5"}}
db.programmer.update(query5,query6,true)
db.programmer.find()

//다중 문서 갱신 : 4번째 인자를 true로 세팅한다.
db.programmer.insert({"name":"JeongYong3"})
db.programmer.insert({"name":"JeongYong3"})
db.programmer.insert({"name":"JeongYong3"})
query7 = {"name": "JeongYong3"}
query8 = {$set: {"name": "JeongYong6"}}
db.programmer.update(query7,query8,false,true)
db.programmer.find()

/*
삭제하기(remove)
1. 부분삭제하기: 조건O
2. 모두 삭제하기: 조건X
*/
//부분 삭제하기
query9 = {"name": "JeongYong5"}
db.programmer.remove(query9)
db.programmer.find()
//모두 삭제하기
db.programmer.remove({})
db.programmer.find()