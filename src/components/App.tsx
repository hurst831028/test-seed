
import {
//  useLaunchParams,
  useViewport,
} from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { type FC, Fragment} from 'react';

export const App: FC = () => {

  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl: 'build/StageBuild.loader.js',
    dataUrl: 'build/StageBuild.data.unityweb',
    frameworkUrl: 'build/StageBuild.framework.js.unityweb',
    codeUrl: 'build/StageBuild.wasm.unityweb',
  });

  //const lp = useLaunchParams();
  const viewport = useViewport();

  viewport?.expand()
  
  const canvasWidth = viewport?.width;
  const canvasHeight = viewport?.height;
  
  return (
    <AppRoot>
      <Fragment>
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
              }}
            >
              <p style={{ fontFamily: 'LanaPixel', fontSize: '38px' }}>loading...{Math.round(loadingProgression * 100)}%</p>

            </div>
          ) : null}
          <Unity
            unityProvider={unityProvider}
            devicePixelRatio={devicePixelRatio}
            style={{
              width: canvasWidth,
              height: canvasHeight,
            }}
          />
        </div>
      </Fragment>
    </AppRoot>
  );
};
