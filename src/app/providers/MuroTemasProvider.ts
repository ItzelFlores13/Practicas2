import { Storage } from '@ionic/storage';
import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';
import { Temas } from '../models/TemasMuro';
import { NgxSpinnerService } from 'ngx-spinner';
import { Muro } from '../models/Muro';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class MuroTemasProvider {
    constructor(
        private api: ApiService,
        private spinner: NgxSpinnerService,
        private sanitizer: DomSanitizer
    ) {

    }
    public async getPostsMuros(page: number) {
        this.spinner.show();
        let base = ROUTES.muro.getPosts(page);
        let result = (await this.api.get(base));
        this.spinner.hide();
        return result;

    }
    public async getPostById(id: number) {
        this.spinner.show();
        let base = ROUTES.muro.getPost(id);
        let result = (await this.api.get(base));
        this.spinner.hide();
        return result;

    }
    public async getTemasSinpaginar() {
        this.spinner.show();
        let base = ROUTES.muro.getTemasSinPaginar;
        let result = (await this.api.get(base));
        this.spinner.hide();
        return result;

    }
    public async deletePost(id): Promise<any> {
        // this.spinner.show();
        let base = ROUTES.muro.deletePost(id);
        let result = (await this.api.deleteWithoutResponse(base));
        // this.spinner.hide();
       return result;
    }
    public async deleteTema(id): Promise<any> {
        this.spinner.show();
        let base = ROUTES.muro.deleteTema(id);
        let result = (await this.api.delete(base));
        this.spinner.hide();
        return result;
    }
    public async updateTema(id, nombre): Promise<any> {
        this.spinner.show();
        let base = ROUTES.muro.updateTema(id);
        let result = (await this.api.post(base, { nombre: nombre }));
        this.spinner.hide();
        return result;
    }
    public async getTemasCategorias(page: number) {
        this.spinner.show();
        let base = ROUTES.muro.getTemasCategoria(page);
        let result = (await this.api.get(base));
        this.spinner.hide();
        return result;
    }
    public async addPost(post: Muro) {
        
        this.spinner.show();
        let formData = new FormData();
        formData.append("title", post.title);
        formData.append("image_url",post.urlImagen);
        formData.append("content", JSON.stringify(post.content));
        formData.append("date_to_publish", post.publicationDate);
        formData.append("publish_now", (post.publicationNow ? 1 : 0).toString());
        formData.append("tags", post.etiquetas);
        if (post.tema != 0)
            formData.append("id_tema_muro", post.tema.toString());
        let base = ROUTES.muro.savePost;
        let result = (await this.api.postFile(base, formData));
        this.spinner.hide();
        return result;
    }
    public async updatePost(post: Muro,url) {
        this.spinner.show();

        let data = {
            id: post.id,
            title: post.title,
            image_url: url,
            content: JSON.stringify(post.content),
            date_to_publish: post.publicationDate,
            publish_now: (post.publicationNow ? 1 : 0).toString(),
            tags: post.etiquetas,
            id_tema_muro: post.tema,
            likes_count:post.likesCount
        }        
        
        let base = ROUTES.muro.updatePost;
        let result = (await this.api.post(base, data));
        this.spinner.hide();
        return result;
    }
    public async addTema(tema: string) {
        this.spinner.show();
        let base = ROUTES.muro.saveTema;
        let result = (await this.api.post(base, { nombre: tema }));
        this.spinner.hide();
        return result;
    }
}