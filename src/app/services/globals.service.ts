import { Injectable, ElementRef } from '@angular/core';
import { VideoModel } from '../models/video.model';

@Injectable()
export class GlobalsService {

  relatedVideos: Array<VideoModel> = [];
  feedVideos: Array<VideoModel>;
  playlistVideos: Array<VideoModel> = [];
  lastSearchedVideos: Array<VideoModel>;
  historyVideos: Array<VideoModel> = [];
  searchedVideos: Array<VideoModel>;

  currentState = -1;
  currentVideo: VideoModel;
  shareLink: string;
  currentPlaylistItem: number;

  categories: any;
  currentCategory = 'all';
  categoriesBlocked = ['19', '22', '25', '27', '29'];
  channel: any;

  internal_settings: Array<any>;
  external_settings: Array<any>;

  videoItemIDvalue: any;

  isLogged = false;
  isLoading = true;
  thumbnails = true;
  listGrid = false;
  repeatMode = true;
  darkMode = true;
  isTempSessionActive = false;
  sessionValue: string;
  localStorageVersion = 4;

  regionCode = '';
  apiKey = '';
  numSearchRes = '';
  numRelatedRes = '';

  settings: any;
  player: YT.Player;
  myScrollContainer: ElementRef;

  constructor() { }

  getCurrentSessionKeys() {
    return {
      session: localStorage.getItem('session_key'),
      tempSession: this.sessionValue
    };
  }

}
