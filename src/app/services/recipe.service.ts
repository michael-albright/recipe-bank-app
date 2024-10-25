import { Injectable } from '@angular/core';
import { RecipeDTO } from '../models/recipe-dto';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  // BehaviorSubject to hold the currently selected recipe
  private selectedRecipeSubject = new BehaviorSubject<RecipeDTO | null>(null);
  
  // Observable for components to subscribe to
  selectedRecipe$ = this.selectedRecipeSubject.asObservable();

  // Method to update the selected recipe
  selectRecipe(recipe: RecipeDTO): void {
    this.selectedRecipeSubject.next(recipe);
  }

  // Optional method to clear the selected recipe (if needed)
  clearSelectedRecipe(): void {
    this.selectedRecipeSubject.next(null);
  }
}
