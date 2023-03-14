const http = require('http');
const formTag = `
<form method="GET" action="/login">
<input type="text" name="id">
<input type="submit">
</form>
`;
function greet(fromSubmitString) {
return `<h1>${fromSubmitString}</h1>`;
}
function firstPage(data) {
return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>
</head>
<body>
${data}
</body>
</html>
`;
}
const pokemon = require('pokemon')
const server = http.createServer(function(request, response){
// 최초접속
if(request.method === 'GET' && request.url === '/') {
response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
let page = firstPage(formTag);
response.write(page);
response.end();
}
// 무언가
if(request.method === 'GET' && request.url.startsWith('/login')) {
  const pokeLg = ["de", "en", "fr", "es", "ja", "ko"];
  console.log(request.url);
  const name = request.url.split('=')[1];
  const pokeNameKo = decodeURIComponent(name); //한글 안깨지도록 디코딩해줌
  let nameKo = pokemon.all('ko');
  for(let i=0; i<nameKo.length; i++) {
    if(pokeNameKo === nameKo[i]) {
      console.log(nameKo[i] + "same");
      response.write(nameKo[i]);
    }
  }
  // let pp = pokemon.getId(pokeNameKo);
  console.log(name);
  response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  /*for(let i = 0; i < pokeLg.length; i++){
    let ppNum = pokemon.getName(pp, pokeLg[i]);
    let page = firstPage(greet(ppNum))
    response.write(page);
  }*/
  // response.write(pp);
  response.end();
  }
  });
// 서버 포트 설정
server.listen(2080, function(error) {
if(error) { console.error('서버 안돌아감') } else { console.log('서버 돌아감'); }
});