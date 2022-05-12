# react-native-cocos

## Installation

add to your package.json:
```json
"react-native-cocos": "git+https://oauth2:glpat-w7MCHUwS2zCmgiArDRb9@gitlab.com/tri.vo2/react-native-cocos.git",
```

## Usage

react-native code
```jsx
import CocosView from "react-native-cocos";
// ... 

<CocosView assetsPath="<assets_path>" />
```
---
## Assset structure 
``` 
assets
 |
 |-- assets (assets game)
 |-- jsb-adapter
 |-- main.js
 |-- src

```
---

## Handler event 

react-native code

```jsx
import {cocosBridge} from 'react-native-cocos';

useEffect(() => {
    // start cocos bridge
    cocosBridge.start('COCOS_MAX_API');
    // register event handler
    cocosBridge.addEventListener('COCOS_MAX_API', handlerEvent);

return () => {
    // remove event handler
    cocosBridge.removeEventListener('COCOS_MAX_API');
};
}, []);

const handlerEvent = (messageStr: string) => {
    const event = JSON.parse(messageStr);

    //handler here
    switch (event.func) {
        case 'goBack':
            navigation.goBack();
            break;
        case 'xyz':
            cocosBridge.emit(
                'COCOS_MAX_API',
                JSON.stringify({func: 'xyz', data: 'xyz'}),
            );
    }
};
```

cocos-js
```js

// emit event from cocos to react-native
public backClickHanler() {
    const data = {
        func: "goBack",
    };

	jsb.bridge.sendToNative("COCOS_MAX_API", JSON.stringify(data));
}

// handler event from react-native
jsb.bridge.onNative = (methodName: string, message?: string | null) => {
    // ...
}
```

[Example Code](https://github.com/vtv24/react-native-cocos-example)

[Assets Example](https://vtv24.github.io/cdn/test/test.zip)
```
//button 1
eventName:  "COCOS_MAX_API"
message: "{ func: \"goBack\" }"

//button 2
eventName:  "COCOS_MAX_API"
message: "{ func: \"requestLocation\" }"
 ```


## CocosView Props

| Prop       | Required | Type                                              |
| -----      | -------- | ------------------------------------------------- |
| style      | No       | https://reactnative.dev/docs/view-style-props     |
| moduleName | No       | string                                            |
| params     | No       | Object                                            |
| assetsPath | Yes      | string                                            |

## cocosBridge

### addEventListener:
``` 
addEventListener: (eventName: string, callback: (messageStr: string) => void) => void
```

### removeEventListener:
```
removeEventListener: (eventName: string) => void
```

### start: 
```
stop: (eventName: string) => any
```
### stop:
```
stop: (eventName: string) => any
```
### emit: emit data to cocos
``` 
emit: (eventName: string, messageStr: string) => any
```
