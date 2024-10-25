import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';
import { RecipeDTO } from 'src/app/models/recipe-dto';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-search-recipes',
  templateUrl: './search-recipes.component.html',
  styleUrls: ['./search-recipes.component.scss']
})
export class SearchRecipesComponent implements OnInit {

  recipes: RecipeDTO[] = [];
  filteredRecipes: RecipeDTO[] = [];
  searchTerm: string = '';

  constructor(private commonService: CommonService, private router: Router, private recipeService: RecipeService, ) {}

  ngOnInit(): void {
     this.getRecipeList();
  }

  getRecipeList(): any {
    this.commonService.getObject('recipeBankController/getRecipeList').subscribe({
      next: (data) => {
        this.recipes = data;
        this.filteredRecipes = data;
      },
      error: (error) => {
        console.error('Error fetching recipes:', error);
      },
    });
  }

  onSearch(): void {
    // UI handling search term
    const term = this.searchTerm.trim().toLowerCase();
    this.filteredRecipes = this.recipes.filter(recipe =>
      recipe.recipeName.toLowerCase().includes(term)
    );
  }

  // * Search recipes using the API
      // this.commonService.getObjectParam('recipeBankController/searchRecipes', this.searchTerm).subscribe({
      //   next: (filteredRecipes) => {
      //     this.recipes = filteredRecipes;
      //   },
      //   error: (error) => {
      //     console.error('Error during search:', error);
      //   },
      // });

  // Method to emit the selected recipe name
  onSelectRecipe(recipe: RecipeDTO) {
    console.log("Recipe Name: " + recipe.recipeName)
    // Store the selected recipe in the shared service
    this.recipeService.selectRecipe(recipe);
    this.router.navigate(['/view-recipe']);
  }

}

