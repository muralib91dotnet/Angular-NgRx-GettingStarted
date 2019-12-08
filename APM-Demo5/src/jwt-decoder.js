var jwtDecode = require('jwt-decode');
var jwt = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiYmlsb2RlYXV2aW5jZW50QG91dGxvb2suY29tIiwiaWF0IjoxNTIyMjA2NjI4LCJpc3MiOiJtbnAuY29tIiwibmJmIjoxNTIyMjA2NjI4LCJleHAiOjE1MjIyMTAyMjh9fQ.1WRlQatauXw2HEWj9B9VL6fIVR-4nAoKuWvkS4_m86k";

const token = jwtDecode(jwt);
const d = new Date(0);
d.setUTCSeconds(token.data.exp);
console.log(d);