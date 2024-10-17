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
  getObject(targetPath: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/${targetPath}`);
  }
  
  // Method to get an Object
  // getStringListRcpNm(targetPath: string, recipeName: string): Observable<string[]> {
  //   return this.http.get<string[]>(`${this.baseUrl}/${targetPath}?recipeName=${recipeName}`);
  // }

  getObjectParam(targetPath: string, recipeName: string): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',  // Specify JSON response expected
    });
    const url = `${this.baseUrl}/${targetPath}?recipeName=${encodeURIComponent(recipeName)}`;
    return this.http.get<any>(url, { headers });
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

