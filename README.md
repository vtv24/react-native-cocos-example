# react-native-cocos

## Installation

add to your package.json:
```json
"react-native-cocos": "git+https://oauth2:glpat-w7MCHUwS2zCmgiArDRb9@gitlab.com/tri.vo2/react-native-cocos.git",
```

## Usage

react-native code
```jsx
import { CocosView } from "react-native-cocos";
// ... 

<CocosView assetsPath="<assets_path>" />
```

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

// emit event to react-native
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

[Example](https://github.com/vtv24/react-native-cocos-example)
