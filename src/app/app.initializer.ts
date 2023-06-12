import { TranslateService } from '@ngx-translate/core';

export function appInitializerFactory(translate: TranslateService) {
  return () => new Promise(resolve => {
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      translate.use(savedLang).subscribe(() => {
        resolve(null);
      })
    } else {
      translate.use('en').subscribe(() => {
        resolve(null);
      })
    }
  });
}
