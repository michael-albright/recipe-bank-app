import { RecipeDTO } from 'src/app/models/recipe-dto';
import { CommonService } from '../../services/common.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss']
})
export class NewRecipeComponent {
  recipeName: string = '';
  recipeCreator: string = '';
  recipeContent: string = '';

  constructor(private commonService: CommonService, private router: Router) {}

  onSaveRecipe(): void {
    if (!this.recipeName || !this.recipeContent || !this.recipeCreator) {
      alert('Recipe Name, Recipe Creator, and Recipe Content are required to save a recipe!');
      return;
    }

    const newRecipe: RecipeDTO = {
      recipeName: this.recipeName,
      recipeContent: this.recipeContent,
      recipeCreator: this.recipeCreator
    };

    this.commonService.postObject('recipeBankController/saveRecipe', newRecipe);
    this.router.navigate(['/search-recipes']);
  }
}
