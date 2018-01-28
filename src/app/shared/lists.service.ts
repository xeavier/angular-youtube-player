import { Injectable } from '@angular/core';
import { YoutubeGetVideo } from './youtube.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SharedService {

    public feedVideos: Array<any>;
    public lastSearchedVideos: Array<any>;
    public historyVideos: Array<any> = [];
    public settings: any;
    public channel: any;
    public categories: any;
    public videoCategories: any;
    public playlist: Array<any>;

    _update: any;

    notify = {
        enabled: false,
        message: 'No message'
    };

    constructor(
        private youtube: YoutubeGetVideo,
        private http: HttpClient,
    ) {}

    getFeed(): Observable<any> {
        return new Observable(observer => {
            if (this.feedVideos) {
                observer.next(this.feedVideos);
                return observer.complete();
            }
            this.getSettings().subscribe(data => {
                this.setApiSettings();
                this.settings = data;
                this.youtube.feedVideos().subscribe(
                    result => {
                        this.feedVideos = result['items'];
                        this.youtube.getChannel(result['items'][0].snippet.channelId).subscribe(
                        resultChannel => {
                            this.channel = resultChannel;
                            observer.next(this.feedVideos);
                            observer.complete();
                        });
                    },
                    error => {
                        console.log('error on feed videos' + error);
                    }
                );
            });
        });
    }

    getChannel(query: any): Observable<any> {
        return new Observable(observer => {
            if (this.channel) {
                observer.next(this.channel);
                return observer.complete();
            } else {
                this.youtube.getChannel(query).subscribe(
                    result => {
                        this.channel = result;
                        observer.next(this.channel);
                        observer.complete();
                    },
                    error => {
                        console.log('error on get channel ' + error);
                    }
                );
            }
        });
    }

    getCategories(): Observable<any> {
        return new Observable(observer => {
            if (this.categories) {
                observer.next(this.categories);
                return observer.complete();
            } else {
                this.youtube.categories().subscribe(
                    result => {
                        this.categories = result;
                        observer.next(this.categories);
                        observer.complete();
                    },
                    error => {
                        console.log(error);
                    }
                );
            }
        });
    }

    getVideoCategories(value: number): Observable<any> {
        return new Observable(observer => {
            if (this.videoCategories) {
                observer.next(this.videoCategories);
                return observer.complete();
            } else {
                this.youtube.videoCategories(value).subscribe(
                    result => {
                        this.videoCategories = result;
                        observer.next(this.videoCategories);
                        observer.complete();
                    },
                    error => {
                        console.log(error);
                    }
                );
            }
        });
    }

    getSettings(): Observable<any> {
        return new Observable(observer => {
            if (this.settings) {
                observer.next(this.settings);
                return observer.complete();
            } else {
                if (localStorage.length <= 0) {
                    this.http.get('assets/settings.json')
                        .map(res => res)
                        .subscribe(
                        data => {
                            this.settings = data;
                            localStorage.setItem('settings', JSON.stringify(data));
                            observer.next(this.settings);
                            observer.complete();
                        },
                        error => {
                            console.log('error on get settings ' + error);
                        }
                    );
                } else {
                    this.settings = JSON.parse(localStorage.getItem('settings'));
                    observer.next(this.settings);
                    observer.complete();
                }
            }
        });
    }

    updateSettings() {
        localStorage.setItem('settings', JSON.stringify(this.settings));
        this.setLocalVersion();
    }

    getPlaylist() {
        this.playlist = JSON.parse(localStorage.getItem('playlist'));
    }

    updatePlaylist() {
        localStorage.setItem('playlist', JSON.stringify(this.playlist));
        this.setLocalVersion();
    }

    setApiSettings() {
        this.youtube.defaultApiSet(this.settings);
    }

    setLocalVersion() {
        if (localStorage.getItem('version') === null) {
            localStorage.setItem('version', '1');
        }
    }

    triggerNotify(message: string) {
        this.notify.enabled = true;
        this.notify.message = message;
        setTimeout(() => this.notify.enabled = false, 1000);
    }

    addHistoryVideo(data: any) {
        let key;
        for (key in this.historyVideos) {
            if (this.historyVideos[key].id === data.id) {
                this.historyVideos.splice(key, 1);
                if (this.historyVideos[this.historyVideos.length - 1] === data) {
                    this.historyVideos.splice(-1, 1);
                }
            }
        }
        this.historyVideos.unshift(data);
    }
}
