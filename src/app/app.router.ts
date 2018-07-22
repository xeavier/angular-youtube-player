import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoryComponent } from './components/youtube-history.component';
import { AboutComponent } from './components/youtube-about.component';
import { SettingsComponent } from './components/youtube-settings.component';
import { CategoryComponent } from './components/category/category.component';

export const router: Routes = [
    { path: 'category/:id', component: CategoryComponent },
    { path: 'category', redirectTo: 'category/all' },
    { path: 'history', component: HistoryComponent },
    { path: 'about', component: AboutComponent },
    { path: 'settings', component: SettingsComponent },
    { path: '**', redirectTo: 'category/all' }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
