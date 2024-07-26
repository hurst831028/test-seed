
import {
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  //useLaunchParams,
  useMiniApp,
  useViewport,
  useThemeParams,
  useMainButton,
  useInitData,
  type User,
  type InitData
} from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { type FC, useEffect, useCallback} from 'react';

function getUser(initData: InitData | undefined): User | undefined {  
  return initData && initData.user ? initData.user : undefined;  
}

export const App: FC = () => {

  const { unityProvider, 
    sendMessage, 
    addEventListener, 
    removeEventListener, 
    loadingProgression, 
    isLoaded 
  } = useUnityContext({
    loaderUrl: 'build/StageBuild.loader.js',
    dataUrl: 'build/StageBuild.data.unityweb',
    frameworkUrl: 'build/StageBuild.framework.js.unityweb',
    codeUrl: 'build/StageBuild.wasm.unityweb',
  });

  //const lp = useLaunchParams();
  const initData = useInitData();  
  const miniApp = useMiniApp();
  const viewport = useViewport();
  const themeParams = useThemeParams();
  const mainButton = useMainButton();

  const canvasWidth = viewport?.width;
  const canvasHeight = viewport?.height;
  
  const user = getUser(initData);

  useEffect(() => {  
    miniApp.setBgColor('#000000');
    miniApp.setHeaderColor('#000000');
    mainButton.hide();
  }, []);

  useEffect(() => {  
    viewport?.expand();  
  }, [viewport]);

  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  const handleGameIsReady = useCallback(() => {  
    if (user) {  
      console.log('WebMessage user id:' + user.id.toString())
      sendMessage('WebMessage', 'SetUserInfo', user.id.toString());  
    } else {  
      // 处理 user 未定义的情况  
      console.log('user is nil')
    }  
  }, [isLoaded]);

  useEffect(() => {  
    addEventListener("OnGameIsReady", handleGameIsReady);  
    return () => {  
      removeEventListener("OnGameIsReady", handleGameIsReady);  
    };  
  }, [addEventListener, removeEventListener, isLoaded]);

  return (
    <AppRoot>
      {!isLoaded ? (
        <div
          style={{
            width: canvasWidth,
            height: canvasHeight,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 1)',
          }}
        >
          <img  
            src="./loading-web.png"
            alt="Loading"  
            style={{  
              width: 'auto',
              height: 'auto',
              maxWidth: '100%',
              maxHeight: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              //marginBottom: '20px',
            }}  
          />
          <p  
            style={{  
              position: 'absolute',  
              fontFamily: 'LanaPixel',  
              fontSize: '38px',  
              color: 'white',   
              //textShadow: '2px 2px 4px #000000',
            }}  
          >  
            loading...{Math.round(loadingProgression * 100)}%  
          </p> 

        </div>
      ) : null}
      <Unity
        unityProvider={unityProvider}
        devicePixelRatio={devicePixelRatio}
        style={{
          width: canvasWidth,
          height: canvasHeight,
          visibility: isLoaded ? "visible" : "hidden"
        }}
      />
    </AppRoot>
  );
};
