#!/usr/bin/env node
// import d from '@expo/config-plugins';
import * as replace from 'replace-in-file';
import path from 'path';
import fs from 'fs';

const getAndroidFilesToEdit = (name: string) => [
  'settings.gradle',
  'app/_BUCK',
  'app/build.gradle',
  'app/src/main/AndroidManifest.xml',
  `app/src/debug/java/com/${name}/ReactNativeFlipper.java`,
  'app/src/main/jni/Android.mk',
  'app/src/main/jni/MainApplicationTurboModuleManagerDelegate.h',
  'app/src/main/jni/MainComponentsRegistry.h',
  `app/src/main/java/com/${name}/MainActivity.java`,
  `app/src/main/java/com/${name}/MainApplication.java`,
  `app/src/main/java/com/${name}/newarchitecture/MainApplicationReactNativeHost.java`,
  `app/src/main/java/com/${name}/newarchitecture/components/MainComponentsRegistry.java`,
  `app/src/main/java/com/${name}/newarchitecture/modules/MainApplicationTurboModuleManagerDelegate.java`,
];

const renameAndroid = async () => {
  const initialName = process.argv[3];
  const nextName = process.argv[4];

  const BASE_PATH = path.join(process.cwd(), 'android');

  await replace.replaceInFile({
    files: getAndroidFilesToEdit(initialName).map((fileName) =>
      path.join(BASE_PATH, fileName),
    ),
    from: new RegExp(initialName, 'g'),
    to: nextName,
  });

  fs.renameSync(
    path.join(BASE_PATH, 'app/src/main/java/com', initialName),
    path.join(BASE_PATH, 'app/src/main/java/com', nextName),
  );
  fs.renameSync(
    path.join(BASE_PATH, 'app/src/debug/java/com', initialName),
    path.join(BASE_PATH, 'app/src/debug/java/com', nextName),
  );
};

renameAndroid();
