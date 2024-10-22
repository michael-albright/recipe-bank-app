import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';
import { RecipeDTO } from 'src/app/models/recipe-dto';

@Component({
  selector: 'app-search-recipes',
  templateUrl: './search-recipes.component.html',
  styleUrls: ['./search-recipes.component.scss']
})
export class SearchRecipesComponent implements OnInit {
  // EventEmitter to emit the selected recipe name
  // @Output() recipeSelected = new EventEmitter<string>();

  recipes: RecipeDTO[] = [];
  filteredRecipes: RecipeDTO[] = [];
  searchTerm: string = '';
  recipeName: string = '';
  creationDate: string = '';
  recipeCreator: string = '';

  constructor(private commonService: CommonService, private router: Router) {}

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
    const term = this.searchTerm.trim().toLowerCase(); // Trim whitespace and convert to lowercase
    this.filteredRecipes = this.recipes.filter(recipe =>
      recipe.recipeName.toLowerCase().includes(term) // Case-insensitive search
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
  onSelectRecipe(recipeName: string) {
    this.recipes.forEach(recipe => {
      if(recipe.recipeName == recipeName) {
        this.recipeName = recipe.recipeName;
        this.creationDate = recipe.creationDate;
        console.log('s3RecipeName = ' + recipe.recipeName + '|' + recipe.creationDate);
      }
    })
    // this.recipeSelected.emit(s3RecipeName);
    this.router.navigate([ "/view-recipe", this.recipeName, this.creationDate ]);
  }

}

