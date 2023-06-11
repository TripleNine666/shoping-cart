import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule).then(() => {
  if ('serviceWorker' in navigator) {
    ServiceWorkerModule.register('./ngsw-worker.js'); // use relative path
  }
}).catch(err => console.error(err));
