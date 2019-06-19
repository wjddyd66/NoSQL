/*
Index: 특정 문서를 탐색 할 때 전부를 탐색하지 않고도 데이터를 찾을 수 있게 한다.
=> 빠르게 데이터를 조회 가능하다.
종류: 고유 인덱스, 다중 키 인덱스, 공간정보 인덱스
*/

//Data설정: user Collection에 id,score field를 가진 30개의 Document 생성
var user ={};
function adduser(){
    for(var i=0;i<30;i++){
    	user.id = i;
    	if(i>0 && i<5 )
    	user.score =3;
    	db.user.insert(user);
    }
}
adduser()

//고유 인덱스(Unique Index): 인덱스의 모든 엔트리가 고유해야 하는 경우
db.user.createIndex({id:1})
/*
sort()를 활용해서 정렬된 자료를 얻을 수 있다.
1: 오름차순
-1: 내림차순
*/
db.user.find().sort({id:1})
db.user.find().sort({id:-1})
//다중 키 인덱스(Multikey Index): 인덱스 키로 사용된 필드의 값이 배열인 경우
//id: 오름차순, score: 내림차순으로 최적화한 Index 생성
db.user.createIndex({score:1,id:1})
db.user.find().sort({score:1})

//공간 정보 인덱스: 좌표 평면으로 적용된다. 다양한 이유로 사용
//Format: db.collection.createIndex( { <location field> : "2dsphere" } )
//Data 생성
db.places.insert({
  name: '제주커피박물관 Baum',
  location: {
    type: 'Point',
    coordinates: [
      126.8990639, 33.4397954
    ]
  }
})

db.places.insert({
  name: '신산리 마을카페',
  location: {
    type: 'Point',
    coordinates: [
      126.8759347, 33.3765812
    ]
  }
})

db.legacyplaces.insert({
  name: '제주커피박물관 Baum',
  location: [ 126.8990639, 33.4397954 ]
})

db.legacyplaces.insert({
  name: '신산리 마을카페',
  location: [ 126.8759347, 33.3765812 ]
})

//공간 정보 인덱스 2차원으로 생성
//$geoWithin은 지형 모형을 선택하여 실행하겠다는 의미이다.
//$centerSphere: 구형, $box: 사각형, $center: 원형
db.legacyplaces.find({
  location: {
    $geoWithin: {
      //(x,y)=> Center값 지정후
      //반지름 정하기: radian 을 사용하여 정해지므로 6378.1로 나누었다.
      $centerSphere: [[126.876933, 33.381018], 5 / 6378.1]
    }
  }
})

//$near: 좌표를 지정한 후 가까운 거리 순으로 문서를 찾는 Option
db.places.find({
  location: {
    $nearSphere: {
      $geometry: {
        type: 'Point',
        coordinates: [ 126.941131, 33.459216 ]
      },
      $minDistance: 1000,
      $maxDistance: 12000
    }
  }
})

//$geoNear aggregation stage: 가까운 곳을 찾고 거리까지 구하는 방법
db.places.aggregate([
  {
    $geoNear: {
      spherical: true,
      limit: 10,
      maxDistance: 10000,
      near: {
        type: 'Point',
        coordinates: [126.876933, 33.381018]
      },
      distanceField: 'distance',
      key: 'location'
    }
  }
])