import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
@Injectable()
export class UtilsService {

    constructor(private http: HttpService) { }

    async getPassword(): Promise<any> {
        return this.http.get('https://passwordwolf.com/api/?length=10&upper=on&lower=on&special=onf&exclude=012345&repeat=1').pipe(
            map(response => response.data),
        );
    }
    async getAdresse(adresse: string): Promise <any> {
        let req = '';
        const stock = adresse.indexOf(' ');
        if (stock > -1) {
            const espace = '%20';
            const array = adresse.split(' ');
            req = '';
            array.forEach( el => {
                if (req === '') {
                    req += el ;
                } else {
                    req = req + espace + el;
                }
            });
            return this.http.get('https://api-adresse.data.gouv.fr/search/?q=' + req + '&type=housenumber&autocomplete=1').pipe(
                map(response => response.data),
            );

        } else {
            return;
        }
    }
}