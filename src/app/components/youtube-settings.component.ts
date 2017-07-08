import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import { SearchComponent } from './youtube-search.component';
import { SharedService } from '../config/shared.module';
import { Http } from '@angular/http';

@Component({
    selector: 'app-settings',
    templateUrl: 'youtube-settings.component.html',
    providers: [ SearchComponent ]
})

export class SettingsComponent implements OnInit {

    private finished = false;

    _shared: any;
    _fb: any;
    _app: any;
    _search: any;

    settingsForm: FormGroup;

    settings: Array<any>;

    constructor(
        private fb: FormBuilder,
        private http: Http,
        private shared: SharedService,
        private app: AppComponent,
        private search: SearchComponent
    ) {
        this._shared = shared;
        this._fb = fb;
        this._app = app;
        this._search = search;
    }

    ngOnInit() {
        console.log('settings');
        this.getDefaultSettings();
    }

    setForm() {
        this.settingsForm = this._fb.group({
            settings: this.mapSettings()
        });
        this.checkInputs();
    }

    get getSettings(): FormArray {
        return this.settingsForm.get('settings') as FormArray;
    };

    checkInputs() {
        this._shared.settings = this.settings;
        this.settingsForm.valueChanges.subscribe((data) => {
            Object.keys(data.settings).map(i => {
                this.settings[i].value = data.settings[i];
            });
            this._app.setSettings(this.settings, 0);
            this._search.setSettings(this.settings, 1);
        });
    }

    mapSettings() {
        const arr = this.settings.map(s => {
            return this._fb.control(s.value);
        });
        return this.fb.array(arr);
    }

    getDefaultSettings() {
        this._shared.getSettings().subscribe(data => {
            if (data) {
                this.settings = data.form_settings;
                this.finished = true;
                this.setForm();
            }
        });
    }

}
