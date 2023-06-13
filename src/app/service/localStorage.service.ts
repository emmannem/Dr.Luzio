import { Injectable, HostListener } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    private isPageClosed = true;
    private key = 'matricula';
    @HostListener('window:beforeunload')
    onBeforeUnload() {
        this.isPageClosed = true;
        localStorage.removeItem(this.key); // Cambia 'miItem' por el nombre del ítem que deseas eliminar
    }

    constructor() {
        this.isPageClosed = false;
    }

    public getItem(): any {
        if (this.isPageClosed) {
            return null;
        }
        return localStorage.getItem(this.key);
    }

    public setItem(value: any): void {
        if (!this.isPageClosed) {
            localStorage.setItem(this.key, value);
            // console.log(localStorage.getItem('matricula'))
        }
    }

}
