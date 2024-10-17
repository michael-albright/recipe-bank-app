import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Recipe } from 'src/app/models/recipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-recipes',
  templateUrl: './search-recipes.component.html',
  styleUrls: ['./search-recipes.component.scss']
})
export class SearchRecipesComponent implements OnInit {
  // EventEmitter to emit the selected recipe name
  // @Output() recipeSelected = new EventEmitter<string>();

  recipes: Recipe[] = [];
  searchTerm: string = '';
  recipeName: string = '';
  creationDate: string = '';

  constructor(private commonService: CommonService, private router: Router) {}

  ngOnInit(): void {
     this.getRecipeList();
  }

  getRecipeList(): any {
    this.commonService.getObject('recipeBankController/getRecipeList').subscribe({
      next: (data) => {
        this.createRecipeObject(data);
      },
      error: (error) => {
        console.error('Error fetching recipes:', error);
      },
    });
  }

  createRecipeObject(recipeList: any): any {
    this.recipes = recipeList.map((recipeString: string) => {
      const [recipeName, creationDate] = recipeString.split('|');
      return { recipeName, creationDate };
    });
  }

  onSearch(): void {
    if (this.searchTerm) {
      this.commonService.getObjectParam('recipeBankController/searchRecipes', this.searchTerm).subscribe({
        next: (filteredRecipes) => {
          this.recipes = [];
          this.createRecipeObject(filteredRecipes);
        },
        error: (error) => {
          console.error('Error during search:', error);
        },
      });
    }
  }

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

