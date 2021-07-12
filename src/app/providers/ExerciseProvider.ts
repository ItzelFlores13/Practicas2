import { Storage } from '@ionic/storage';
import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';
import {Exercise} from '../models/Exercise';

@Injectable({
  providedIn: 'root'
})

export class ExerciseProvider {
  constructor(
    private storage: Storage,
    private api: ApiService,
  ) { }

  async getExerciseType(): Promise<any> {
    const base = ROUTES.exercises.exerciseType;
    const result = (await this.api.get(base));
    return result.data;
  }

  async getExercises(data): Promise<any> {
    let base = ROUTES.exercises.getExercises(data.gymId);
    base += `?page=${data.page}`;
    if (data.search !== '') {
      base += `&q=${data.search}`;
    }
    if (data.exerciseType !== '') {
      base += `&id_tipo_ejercicio=${data.exerciseType}`;
    }
    const result = (await this.api.get(base));
    const exercises = result.data.map( exercise => {
      return new Exercise(exercise);
    });
    const meta = result.meta;
    const links = result.links;
    return {
      exercises,
      meta,
      links
    };
  }

  async saveExercise(data, gymId): Promise<any> {
    const base = ROUTES.exercises.saveExercise(gymId);
    const response = await this.api.postFile(base, data);
    return response;
  }

  async addExerciseType(name): Promise<any> {
    const base = ROUTES.exercises.addExerciseType;
    const result = await this.api.post(base, {nombre: name});
    return result;
  }

  async updateExercise(data, gymId): Promise<any> {
    const base = ROUTES.exercises.updateExercise(gymId);
    const response = await this.api.postFile(base, data);    
    return response;
  }

  async addExcerciseImage(data, gymId): Promise<any> {
    const base = ROUTES.exercises.addExcerciseImage(gymId);
    const response = await this.api.postFile(base, data);    
    return response;
  }

  async deleteExcerciseImage(data, gymId): Promise<any> {
    const base = ROUTES.exercises.deleteExcerciseImage(gymId);
    const response = await this.api.postFile(base, data);    
    return response;
  }

  async deleteExcercise(gymId, exerciseId): Promise<any> {
    const base = ROUTES.exercises.deleteExcercise(gymId, exerciseId);
    const response = await this.api.delete(base);    
    return response;
  }
}
