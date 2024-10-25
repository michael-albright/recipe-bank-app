import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeDTO } from 'src/app/models/recipe-dto';
import { CommonService } from 'src/app/services/common.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss']
})

export class ViewRecipeComponent implements OnInit {
  // The selected recipe
  recipe: RecipeDTO | null = null;

  constructor(private commonService: CommonService, private recipeService: RecipeService) { }

  ngOnInit(): void {
    // Subscribe to the shared service to get the selected recipe
    this.recipeService.selectedRecipe$.subscribe(recipe => {
      this.recipe = recipe;
      
      if (this.recipe && !this.recipe.recipeContent) {
        console.log("Recipe Content is null, calling getRecipeContent");
        this.getRecipeContent();
      }
    });
  }

  getRecipeContent() {
    console.log("Inside getRecipeContent");
    if(this.recipe) {
      this.commonService.getObjectParam('recipeBankController/getRecipe', this.recipe.recipeName, this.recipe.creationDate).subscribe((data: any) => {
        if(this.recipe) this.recipe.recipeContent = data.recipeContent;
      });
    }
  }

}
