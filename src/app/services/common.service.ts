import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecipeDTO } from 'src/app/models/recipe-dto';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private baseUrl = 'http://localhost:8080/recipe-bank';

  constructor(private http: HttpClient) {}

  // Method to get an Object
  getObject(targetPath: string): Observable<RecipeDTO[]> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',  // Specify JSON response expected
    });
    const url = `${this.baseUrl}/${targetPath}`;
    return this.http.get<RecipeDTO[]>(url, { headers });
  }

  getObjectParam(targetPath: string, recipeName: string, creationDate: string): Observable<RecipeDTO> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',  // Specify JSON response expected
    });
    const url = `${this.baseUrl}/${targetPath}?recipeName=${encodeURIComponent(recipeName)}&creationDate=${encodeURIComponent(creationDate)}`;
    return this.http.get<RecipeDTO>(url, { headers });
  }

  postObject(targetPath: string, recipe: RecipeDTO): void {
    this.http.post(`${this.baseUrl}/${targetPath}`, recipe).subscribe({
      next: () => {
        console.log('Recipe saved successfully');
      },
      error: (error) => {
        console.error('Error saving recipe:', error);
      }
    });
  }

}

