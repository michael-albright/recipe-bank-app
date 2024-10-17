import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeDTO } from 'src/app/models/recipe-dto';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss']
})

export class ViewRecipeComponent implements OnInit {

  recipeName: string = '';
  creationDate: string = '';
  recipeData = {
    "s3RecipeName": "",
    "recipeContent": ""
  }

  constructor(private route: ActivatedRoute, private commonService: CommonService) { }

  ngOnInit(): void {
    // Get the recipeName from the route parameters
    this.recipeName = this.route.snapshot.paramMap.get('recipeName') || '';
    this.creationDate = this.route.snapshot.paramMap.get('creationDate') || '';
    this.getRecipe();
  }

  getRecipe() {
    const s3RecipeName = this.recipeName + '|' + this.creationDate;
    this.commonService.getObjectParam('recipeBankController/getRecipe', s3RecipeName).subscribe((data: any) => {
      this.recipeData.s3RecipeName = data.recipeName;
      this.recipeData.recipeContent = data.recipeContent;
    });
  }

}
