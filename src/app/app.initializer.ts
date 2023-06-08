import { TranslateService } from '@ngx-translate/core';

export function appInitializerFactory(translate: TranslateService) {
  return () => new Promise(resolve => {
    translate.use('ru').subscribe(() => {
      resolve(null);
    });
  });
}
