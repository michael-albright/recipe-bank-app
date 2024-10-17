import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SearchRecipesComponent } from './components/search-recipes/search-recipes.component';
import { NewRecipeComponent } from './components/new-recipe/new-recipe.component';
import { ViewRecipeComponent } from './components/view-recipe/view-recipe.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'search-recipes', component: SearchRecipesComponent },
  { path: 'new-recipe', component: NewRecipeComponent },
  { path: 'view-recipe/:recipeName/:creationDate', component: ViewRecipeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
