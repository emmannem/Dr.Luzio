import { Injectable, HostListener } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    private key = 'matricula';

    constructor() { }

    getItem() {
        return localStorage.getItem(this.key);
    }

    setItem(value: any) {
        localStorage.setItem(this.key, value);
        // console.log(localStorage.getItem('matricula'))
    }

    clear() {
        localStorage.removeItem(this.key);
    }

}
