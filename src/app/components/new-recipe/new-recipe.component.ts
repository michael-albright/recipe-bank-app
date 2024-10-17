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
  recipeContent: string = '';

  constructor(private commonService: CommonService, private router: Router) {}

  onSaveRecipe(): void {
    if (!this.recipeName || !this.recipeContent) {
      alert('Both Recipe Name and Recipe Content are required!');
      return;
    }

    const newRecipe: RecipeDTO = {
      recipeName: this.recipeName,
      recipeContent: this.recipeContent
    };

    // Placeholder for saving the recipe (to be implemented later)
    this.commonService.postObject('recipeBankController/saveRecipe', newRecipe);
    this.router.navigate(['/search-recipes']);
  }
}
