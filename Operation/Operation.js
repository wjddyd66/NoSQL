//Operation 을 위한 연습용 Data추가
db.user.insert({"name":"황정용", "age":10})
db.user.insert({"name":"안상민", "age":10})
db.user.insert({"name":"장보성", "age":11})
db.user.insert({"name":"표종은", "age":11})
db.user.insert({"name":"천지훈", "age":12})
db.user.insert({"name":"김동혁", "age":12})
db.user.insert({"name":"황정용2", "age":13})
db.user.insert({"name":"안상민2", "age":13})
db.user.insert({"name":"장보성2", "age":14})
db.user.insert({"name":"표종은2", "age":14})
db.user.insert({"name":"천지훈2", "age":15})
db.user.insert({"name":"김동혁2", "age":15})
db.user.insert({"name":"황정용3", "age":16})
db.user.insert({"name":"안상민3", "age":16})
db.user.insert({"name":"장보성3", "age":17})
db.user.insert({"name":"표종은3", "age":17})
db.user.insert({"name":"천지훈3", "age":18})
db.user.insert({"name":"김동혁3", "age":18})

//비교 연산자 - 문서를 입력된 값과 비교하여 조회하기 위한 연산자
//$gt: 기준 값 보다 크다, $gte: 기준 값 보다 크거나 같다
db.user.find({"age":{$gt:15}})
db.user.find({"age":{$gte:15}})
//$lt: 기준 값 보다 작다, $lte: 기준값 보다 작거나 크다.
db.user.find({"age":{$lt:15}})
db.user.find({"age":{$lte:15}})
//$ne: 같지 않다
db.user.find({"age":{$ne:15}})

//판단 연산자 - 여러가지 조건을 연결하거나 존재 여부를 판단하는 연산자 이다
//$and: 여러 조건을 모두 만족
db.user.find({$and :[{"age": {$gt:10}},{"age": {$lt:15}}]})
//$or: 여러 조건 중 하나 이상 만족
db.user.find({$or :[{"age": {$gt:20}},{"age": {$lt:15}}]})
//$nor: Nor or
db.user.find({$nor :[{"age": {$gt:20}},{"age": {$lt:15}}]})
//$not: 조건을 만족 시키지 않는 것
db.user.find({age:{$not:{$lte:15}}})

/*
SubDocument
Mongo Db는 Collection내의 Document 단위로 검색
Document안에 Bson 형식인 Document존재시 SubDocument를 활용하여 검색 가능
$elemMatch를 사용한다.
*/
db.user.insert({"name":"Hwang", "age":18,"Detail":[{"email":"wjddyd66@naver.com","phone":"010-8947-2534"},{"email":"wjddyd66@naver.com2","phone":"010-8947-2534"}]})
db.user.find({"Detail":{$elemMatch:{"email":"wjddyd66@naver.com"}}})