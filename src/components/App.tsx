
import {
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  useLaunchParams,
  useMiniApp,
  useViewport,
  useThemeParams,
  useMainButton,
  retrieveLaunchParams,
  useUtils,
} from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { type FC, useEffect, useCallback} from 'react';

const sharedtext = "Come and play with me, let's be friends and get Airdrop tokens for free!\n\
💸  10k Coins as a first-time gift\n\
🔥  50k Coins if you have Telegram Premium"
const appUrl = "https://t.me/my_dev01_bot/miniapp?startapp="
const telegramLink = "https://t.me/SeedsofTON"
const xLink = "https://twitter.com/SeedsofTon"
const youtubeLink = "https://www.youtube.com/@seedsofton"

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

  const lp = useLaunchParams();
  const miniApp = useMiniApp();
  const viewport = useViewport();
  const themeParams = useThemeParams();
  const mainButton = useMainButton();
  const utils = useUtils();
  const { initDataRaw } = retrieveLaunchParams();

  const canvasWidth = viewport?.width;
  const canvasHeight = viewport?.height;
  
  useEffect(() => {  
    miniApp.setBgColor('#000000');
    miniApp.setHeaderColor('#000000');
    miniApp.ready()
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
    
    console.log('SetStartParam:' + lp.startParam)
    sendMessage('WebMessage', 'SetStartParam', lp.startParam ? lp.startParam : "");
    console.log('initDataRaw:' + initDataRaw);
    sendMessage('WebMessage', 'SetInitDataRaw', initDataRaw);
      
  }, [isLoaded]);

  const handleShareURL = useCallback((...parameters: any[]) => {  
    //console.log({ parameters });
    
    utils.shareURL(appUrl + parameters[0], sharedtext)
  }, [isLoaded]);

  const handleCopyURL = useCallback((...parameters: any[]) => {  
    console.log({ parameters });
    try {  
      const text = appUrl + parameters[0] + "\n" + sharedtext;  
      //console.log(text);
      navigator.clipboard.writeText(text);  
      console.log('Copy to clipboard');  
    } catch (err) {  
      console.error('Copy to clipboard fail:', err);  
    }  
    //utils.shareURL(parameters[0], "CopyURL ")
  }, [isLoaded]);

  const handleOpenSomething = useCallback((...parameters: any[]) => {  
    console.log({ parameters });
    try {  
      const handle = parameters[0]
      switch(handle)
      {
        case "tg_community":
          utils.openTelegramLink(telegramLink);
          break;
        case "xxx":
          utils.openLink(xLink);
          break;
        case "youtube":
          utils.openLink(youtubeLink);
          break;
      }
    } catch (err) {  
      
    }  
    //utils.shareURL(parameters[0], "CopyURL ")
  }, [isLoaded]);

  const handleTelegramClick = () => {  
    utils.openTelegramLink(telegramLink);  
  };  
  
  const handleXClick = () => {  
    utils.openLink(xLink);
  };  
  
  const handleYoutubeClick = () => {  
    utils.openLink(youtubeLink);  
  };

  useEffect(() => {  
    addEventListener("OnGameIsReady", handleGameIsReady);  
    addEventListener("ShareURL", handleShareURL);  
    addEventListener("CopyURL", handleCopyURL); 
    addEventListener("OpenSomething", handleOpenSomething);
    return () => {  
      removeEventListener("OnGameIsReady", handleGameIsReady);  
      removeEventListener("ShareURL", handleShareURL);  
      removeEventListener("CopyURL", handleCopyURL);  
      removeEventListener("OpenSomething", handleOpenSomething);
    };  
  }, [addEventListener, removeEventListener, isLoaded]);

  return (
    <AppRoot>
      <div
        style={{
          width: canvasWidth,
          height: canvasHeight,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
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
            <img src="./loading-web.png"
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
            
            <img src="./buttons/telegram.png"
              alt="Loading"  
              style={{  
                width: 'auto',  
                height: 'auto',  
                maxWidth: '100%',  
                maxHeight: '100%',  
                position: 'absolute',  
                bottom: '100px', // 使用bottom属性将图片对齐到容器底部  
                left: 'calc(50% - 100px)', // 调整水平位置  
                transform: 'translateX(-50%)', // 微调水平位置，使其居中  
              }}  
              onClick={handleTelegramClick}
            />

            <img src="./buttons/x.png"
              alt="Loading"  
              style={{  
                width: 'auto',  
                height: 'auto',  
                maxWidth: '100%',  
                maxHeight: '100%',  
                position: 'absolute',  
                bottom: '100px', // 使用bottom属性将图片对齐到容器底部  
                left: 'calc(50%)', // 水平居中  
                transform: 'translateX(-50%)', // 使用transform来微调水平位置  
              }}
              onClick={handleXClick}
            />

            <img src="./buttons/youtube.png"
              alt="Loading"  
              style={{  
                width: 'auto',  
                height: 'auto',  
                maxWidth: '100%',  
                maxHeight: '100%',  
                position: 'absolute',  
                bottom: '100px', // 使用bottom属性将图片对齐到容器底部  
                left: 'calc(50% + 100px)', // 水平居中  
                transform: 'translateX(-50%)', // 使用transform来微调水平位置  
              }}
              onClick={handleYoutubeClick}  
            />
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
      </div>
    </AppRoot>
  );
};
