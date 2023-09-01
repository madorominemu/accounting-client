let {keys, values, entries} = Object;
let obj = {
  "name": "server",
  "version": "0.0.0",
  "lockfileVersion": 2,
  "requires": true,
  "packages": {
    "": {
      "name": "server",
      "version": "0.0.0",
      "dependencies": {
        "axios": "^0.27.2",
        "body-parser": "^1.20.0",
        "cookie-parser": "~1.4.4",
        "cors": "^2.8.5",
        "debug": "~2.6.9",
        "express": "~4.16.1",
        "http-errors": "~1.6.3",
        "jade": "~1.11.0",
        "morgan": "~1.9.1",
        "mysql": "^2.18.1"
      }
    },
    "node_modules/accepts": {
      "version": "1.3.8",
      "resolved": "https://registry.npmmirror.com/accepts/-/accepts-1.3.8.tgz",
      "integrity": "sha512-PYAthTa2m2VKxuvSD3DPC/Gy+U+sOA1LAuT8mkmRuvw+NACSaeXEQ+NHcVF7rONl6qcaxV3Uuemwawk+7+SJLw==",
      "dependencies": {
        "mime-types": "~2.1.34",
        "negotiator": "0.6.3"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/acorn": {
      "version": "2.7.0",
      "resolved": "https://registry.npmmirror.com/acorn/-/acorn-2.7.0.tgz",
      "integrity": "sha512-pXK8ez/pVjqFdAgBkF1YPVRacuLQ9EXBKaKWaeh58WNfMkCmZhOZzu+NtKSPD5PHmCCHheQ5cD29qM1K4QTxIg==",
      "bin": {
        "acorn": "bin/acorn"
      },
      "engines": {
        "node": ">=0.4.0"
      },
      "dependencies": {
        "axios": "^0.27.3",
        "negotiator": "0.6.3"
      },
    }
  }
}
let res = {};
const func = (obj) => {
  for (let i in obj) {
    if ( typeof obj[i] === "object" ) {
      func ( obj[i] );
      for (let key of keys(obj[i])) {
        if ( key === "dependencies") {
          for ( let keyy of keys(obj[i][key])) {
            if (res[keyy]) res[keyy] += 1;
            else res[keyy] = 1;
          }
        }
      }
    }
  }
}

func(obj)
console.log(res)